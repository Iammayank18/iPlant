/* eslint-disable new-cap */
import Openrouteservice from "openrouteservice-js";

import mongoose from "mongoose";
import PostLocationModel from "./schema/location.schema.js";
import postModel from "./schema/posts.schema.js";
import { COMMON_SERVICE } from "../../utils/common.helper.js";

const orsDirections = new Openrouteservice.Directions({
  api_key: process.env.ORS_API_KEY,
});

async function createPost(req, res) {
  try {
    const fileName = `${req.body._id}_${Math.random(Math.floor()) * 100000}.${
      req.file.mimetype.split("/")[1]
    }`;
    // const maxSize = 5 * 1024 * 1024;
    // if (maxSize < req.file.size) {
    //   return COMMON_SERVICE.apiResponse(
    //     res,
    //     "file size must be less then 5 mb",
    //     false,
    //     500,
    //   );
    // }
    const imageBuffer = Buffer.from(req.file.buffer, "base64");
    const response = await COMMON_SERVICE.uploadImageToS3(
      imageBuffer,
      fileName,
    );

    if (response) {
      const imageUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileName}`;

      const data = req.body;
      const customdata = new postModel({
        user: data.user,
        city: data.city,
        country: data.country,
        postcode: data.postalCode,
        feature_image: imageUrl,
        title: data.title,
        story: data.story,
      });
      const savePost = await customdata.save();

      if (savePost) {
        PostLocationModel.create({
          post: savePost._id,
          user: data.user,
          location: {
            type: "Point",
            coordinates: req.body.coordinates.split("/").map(Number),
          },
          city: data.city,
          country: data.country,
          postcode: data.postcode,
        });
        return COMMON_SERVICE.apiResponse(res, "post Uploaded", true, 200);
      }
    }
    return COMMON_SERVICE.apiResponse(res, "failed to add post", false, 500);

    // return COMMON_SERVICE.apiResponse(res, "photo updated successfully", true, 200, imageUrl);
  } catch (e) {
    console.log(e);
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function filterPost(req, res) {
  const { lat, lng } = req.body;
  const response = await postModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
        distanceField: "distance",
        spherical: true,
      },
    },
    {
      $sort: { distance: 1 },
    },
  ]);
  if (response) {
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, response);
  }
  return COMMON_SERVICE.apiResponse(res, "not found", false, 404);
}

async function deleteAllPost(req, res) {
  const response = await postModel.deleteMany({});
  const response2 = await PostLocationModel.deleteMany({});
  if (response || response2) {
    return COMMON_SERVICE.apiResponse(res, "all deleted", true, 200);
  }
  return COMMON_SERVICE.apiResponse(res, "failed to delete", true, 500);
}

async function calculateTravelDistance(origin, destination) {
  const origins = [origin.long, origin.lat];
  const destinations = [destination.long, destination.lat];
  const distTIme = await orsDirections.calculate({
    coordinates: [origins, destinations],
    profile: "driving-car",
    attributes: ["avgspeed"],
    units: "km",
    format: "json",
  });

  return distTIme.routes[0].summary;
}

async function getOnePostById(data) {
  console.log("post by id", data);

  try {
    let distWithTime = {};
    const { location, lng, lat, user } = data;
    const pipeline = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(location),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postData",
        },
      },
      {
        $unwind: {
          path: "$postData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "location",
          as: "reviewsData",
        },
      },
      {
        $unwind: {
          path: "$reviewsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "favouriteposts",
          localField: "_id",
          foreignField: "location",
          as: "favData",
        },
      },
      {
        $lookup: {
          from: "enquiries",
          localField: "_id",
          foreignField: "location",
          as: "enquired",
        },
      },
      {
        $group: {
          _id: "$_id",
          avgrating: {
            $avg: "$reviewsData.rating",
          },
          locationdata: {
            $first: "$$ROOT",
          },
        },
      },
      {
        $project: {
          post: "$locationdata.postData",
          location: "$locationdata.location",
          fav: "$locationdata.favData",
          avgRating: "$avgrating",
          enquiry: "$locationdata.enquired",
        },
      },
    ];
    const response = await PostLocationModel.aggregate(pipeline);

    const ns = response[0];
    console.log("here====>", ns);
    const {
      location: { coordinates },
    } = ns;

    if (lat !== "undefined" && lng !== "undefined") {
      distWithTime = await calculateTravelDistance(
        { long: +lng, lat: +lat },
        { long: coordinates[1], lat: coordinates[0] },
      );
    }

    const newItem = {
      ...ns,
      distance: distWithTime && Math.ceil(distWithTime.distance),
      duration: distWithTime && Math.ceil(distWithTime.duration / 60),
      isFav: !!(ns?.fav?.length > 0 && ns?.fav[0]?.user?.equals(user)),
      isEnquired: !!(
        ns?.enquiry?.length > 0 && ns?.enquiry[0]?.user?.equals(user)
      ),
    };
    if (!newItem) {
      return {
        status: false,
        message: "no post found",
      };
    }

    return {
      status: true,
      message: "posts fetched",
      data: newItem,
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function getOneLocationPostByIdForFavUnFav(data) {
  try {
    const { id } = data;
    const response = await PostLocationModel.findById(id)
      .populate("post")
      .lean(true);

    if (!response) {
      return {
        status: false,
        message: "no post found",
      };
    }

    return {
      status: true,
      message: "posts fetched",
      data: response,
    };
  } catch (e) {
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function searchPost(query) {
  try {
    const { keyword, distance, latitude, longitude } = query;

    const filter = {};
    let keywordQuery = {};
    const geoSpatial = {};

    // Construct the search keyword query
    if (keyword) {
      keywordQuery = {
        $or: [
          { postcode: { $regex: keyword, $options: "i" } },
          { city: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for city
        ],
      };
    }

    // Combine the filter and keyword queries
    // const combinedQuery = { ...filter, ...keywordQuery };
    Object.assign(filter, keywordQuery);

    const pipeLins = [
      { $match: filter },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "location",
          as: "rev",
        },
      },
      {
        $unwind: {
          path: "$rev",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$rev",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postData",
        },
      },
      {
        $unwind: {
          path: "$postData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          avgrating: {
            $avg: "$rev.rating",
          },
          locationdata: {
            $first: "$$ROOT",
          },
        },
      },
      {
        $sort: {
          avgrating: -1,
        },
      },
      {
        $project: {
          post: "$locationdata.postData",
          location: "$locationdata.location",
          avgrating: "$avgrating",
        },
      },
    ];

    if (distance && longitude && latitude) {
      pipeLins.unshift({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          distanceField: "dist.calculated",
          maxDistance: parseInt(distance, 10) * 1000,
          //   query: { category: "Parks" },
          // includeLocs: "dist.location",
          spherical: true,
        },
      });
    }

    const posts = await PostLocationModel.aggregate(pipeLins);

    if (posts.length <= 0) {
      return {
        status: false,
        message: "no post found",
      };
    }
    return {
      status: true,
      message: "posts fetched",
      data: posts,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function GetPostForHomePage(query) {
  console.log(query);
  try {
    const { city, latitude, longitude } = query;
    const filter = { featured: true };
    const arr = Object.keys(query);
    let geoQuery = {};
    for (let index = 0; index < arr.length; index += 1) {
      const element = arr[index];

      if (element === "latitude" || element === "longitude") {
        filter[element] = parseFloat(query[element]);
      } else {
        filter[element] = { $regex: query[element], $options: "i" };
      }
    }

    if (latitude && longitude) {
      geoQuery = {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          distanceField: "distance",
          spherical: true,
          sort: { distance: 1 },
        },
      };
    }

    const aggresponse = await PostLocationModel.aggregate([
      ...(Object.keys(geoQuery).length > 0 ? [geoQuery] : []),
      ...(city
        ? [
            {
              $match: {
                city: filter.city,
              },
            },
          ]
        : []),

      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postData",
        },
      },
      {
        $unwind: {
          path: "$postData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
        },
      },
      {
        $lookup: {
          from: "favouriteposts",
          localField: "_id",
          foreignField: "location",
          as: "favs",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "location",
          as: "reviewsData",
        },
      },
      {
        $addFields: {
          mainData: "$$ROOT",
        },
      },
      {
        $project: {
          postId: "$_id",
          likes: {
            $size: "$favs",
          },
          comments: {
            $size: "$reviewsData",
          },
          feature_image: "$postData.feature_image",
          title: "$postData.title",
          story: "$postData.story",
          user: {
            name: "$userData.name",
            profile_picture: "$userData.profile_picture",
            username: "$userData.username",
            email: "$userData.email",
            city: "$userData.city",
            state: "$userData.state",
            country: "$userData.country",
            postcode: "$userData.postcode",
          },
          city: "$postData.city",
          area: "$postData.area",
          state: "$postData.state",
          country: "$postData.country",
          location: "$mainData.location",
        },
      },
    ]);

    if (aggresponse.length > 0) {
      return {
        status: true,
        message: "posts fetched",
        data: aggresponse,
      };
    }

    return {
      status: false,
      message: "no post found",
    };
  } catch (e) {
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

// get posts by route query

async function getPostsByRouteQuery(query) {
  try {
    const { key, city, lat, lng } = query;

    const filter = {};
    let geoQuery = {};
    if (city !== "undefined") {
      filter.city = { $regex: city, $options: "i" };
    }
    let post;
    if (lat && lng) {
      geoQuery = {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          distanceField: "distance",
          spherical: true,
          sort: { distance: 1 },
        },
      };
    }

    // console.log(geoQuery);
    if (key === "toprated") {
      post = await PostLocationModel.aggregate([
        ...(city
          ? [
              {
                $match: {
                  city: filter.city,
                },
              },
            ]
          : []),
        {
          $sort: { distance: 1 },
        },

        {
          $lookup: {
            from: "posts",
            localField: "post",
            foreignField: "_id",
            as: "postdata",
          },
        },
        {
          $unwind: {
            path: "$postdata",
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "location",
            as: "favs",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "location",
            as: "reviewsData",
          },
        },
        {
          $project: {
            likes: {
              $size: "$favs",
            },
            comments: {
              $size: "$reviewsData",
            },
            title: "$postdata.title",
            story: "$postdata.story",
            feature_image: "$postdata.feature_image",
            title: "$postdata.title",
            story: "$postdata.story",
            user: "$userData",
            city: "$postdata.city",
            area: "$postdata.area",
            state: "$postdata.state",
            country: "$postdata.country",
            location: "$location",
          },
        },
      ]);
    }
    if (key === "recent") {
      post = await PostLocationModel.aggregate([
        ...(city
          ? [
              {
                $match: {
                  city: filter.city,
                },
              },
            ]
          : []),
        {
          $sort: { distance: 1 },
        },

        {
          $lookup: {
            from: "posts",
            localField: "post",
            foreignField: "_id",
            as: "postdata",
          },
        },
        {
          $unwind: {
            path: "$postdata",
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "location",
            as: "favs",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "location",
            as: "reviewsData",
          },
        },
        {
          $project: {
            likes: {
              $size: "$favs",
            },
            comments: {
              $size: "$reviewsData",
            },
            title: "$postdata.title",
            story: "$postdata.story",
            feature_image: "$postdata.feature_image",
            title: "$postdata.title",
            story: "$postdata.story",
            user: "$userData",
            city: "$postdata.city",
            area: "$postdata.area",
            state: "$postdata.state",
            country: "$postdata.country",
            location: "$location",
          },
        },
      ]);
    }

    if (key === "nearby") {
      try {
        const current = await PostLocationModel.aggregate([
          ...(Object.keys(geoQuery).length > 0 ? [geoQuery] : []),
          ...(city
            ? [
                {
                  $match: {
                    city: filter.city,
                  },
                },
              ]
            : []),
          {
            $sort: { distance: 1 },
          },

          {
            $lookup: {
              from: "posts",
              localField: "post",
              foreignField: "_id",
              as: "postdata",
            },
          },
          {
            $unwind: {
              path: "$postdata",
            },
          },

          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "userData",
            },
          },
          {
            $unwind: {
              path: "$userData",
            },
          },
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "location",
              as: "favs",
            },
          },
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "location",
              as: "reviewsData",
            },
          },
          {
            $project: {
              likes: {
                $size: "$favs",
              },
              comments: {
                $size: "$reviewsData",
              },
              title: "$postdata.title",
              story: "$postdata.story",
              feature_image: "$postdata.feature_image",
              title: "$postdata.title",
              story: "$postdata.story",
              user: "$userData",
              city: "$postdata.city",
              area: "$postdata.area",
              state: "$postdata.state",
              country: "$postdata.country",
              location: "$location",
            },
          },
        ]);

        const batches = [];
        const batchSize = 10;
        for (let i = 0; i < current.length; i += batchSize) {
          batches.push(current.slice(i, i + batchSize));
        }

        let newArrr = [];
        for (const batch of batches) {
          const batchResults = await Promise.all(
            batch.map(async (item) => {
              const {
                location: { coordinates },
              } = item;
              const distWithTime = await calculateTravelDistance(
                { long: +lng, lat: +lat },
                { long: coordinates[1], lat: coordinates[0] },
              );
              // Create a new object with the additional properties

              const newItem = {
                ...item,
                distance: Math.ceil(distWithTime.distance),
                duration: Math.ceil(distWithTime.duration / 60),
              };
              console.log(newItem);
              return newItem;
            }),
            1,
          );
          newArrr = newArrr.concat(batchResults);
        }
        post = newArrr;
      } catch (e) {
        console.log(e);
      }
    }

    if (!post) {
      return {
        status: false,
        message: "not found",
      };
    }
    return {
      status: true,
      message: "post fetched",
      data: post,
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function getAllPost() {
  const data = await PostLocationModel.find({}).populate("post").lean(true);

  try {
    if (!data) {
      return {
        status: false,
        message: "no post found",
      };
    }

    return {
      status: true,
      message: "post fetched",
      data,
    };
  } catch (e) {
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

const postsService = {
  filterPost,
  getOnePostById,
  createPost,
  deleteAllPost,
  calculateTravelDistance,
  searchPost,
  GetPostForHomePage,
  getPostsByRouteQuery,
  getAllPost,
  getOneLocationPostByIdForFavUnFav,
};
export default postsService;
