import Openrouteservice from "openrouteservice-js/lib/index.js";
import CustomSchool from "./schema/posts.schema.js";
import SchoolLocationModel from "./schema/location.schema.js";
import userService from "../user/user.service.js";
import { COMMON_SERVICE } from "../../utils/common.helper.js";
import SchoolReviewModel from "../schoolreviews/schema/reviews.schema.js";
import mongoose from "mongoose/types/index.js";

// const { ORS } = process.env;

const orsDirections = new Openrouteservice.Directions({ api_key: "5b3ce3597851110001cf6248800a19756ba344c5b2d53b1857cd1258" });
// const Matrix = new Openrouteservice.Matrix({ api_key: "5b3ce3597851110001cf6248800a19756ba344c5b2d53b1857cd1258" });
// const Isochrones = new Openrouteservice.Isochrones({ api_key: "5b3ce3597851110001cf6248800a19756ba344c5b2d53b1857cd1258" });

async function createSchool(req, res) {
    const data = req.body;

    const customdata = new CustomSchool(req.body);
    const saveSchool = await customdata.save();

    if (!saveSchool) {
        return COMMON_SERVICE.apiResponse(res, "failed to register", false, 500);
    }
    SchoolLocationModel.create({
        schoolname: data.name,
        school: saveSchool._id,
        location: {
            type: "Point",
            coordinates: data.location,
        },
        city: data.city,
        country: data.country,
        postcode: data.postcode,
        boarding: data.boarding,
        coedu: data.coedu,
        board: data.board,
        medium: data.medium,
    });
    return COMMON_SERVICE.apiResponse(res, "registered successfully", true, 200);
}

async function filterSchools(req, res) {
    const { lat, lng } = req.body;
    const response = await CustomSchool.aggregate([
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

async function deleteAllSchool(req, res) {
    const response = await CustomSchool.deleteMany({});
    const response2 = await SchoolLocationModel.deleteMany({});
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

async function getOneSchoolById(data) {
    const { location, lng, lat, user } = data;
    console.log(data);
    let distWithTime = {};

    const pipeline = [
        {
            $match: {
                _id: mongoose.Types.ObjectId(location),
            },
        },
        {
            $lookup: {
                from: "schools",
                localField: "school",
                foreignField: "_id",
                as: "schoolData",
            },
        },
        {
            $unwind: {
                path: "$schoolData",
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
                from: "favoriteschools",
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
                school: "$locationdata.schoolData",
                location: "$locationdata.location",
                fav: "$locationdata.favData",
                avgRating: "$avgrating",
                enquiry: "$locationdata.enquired",
            },
        },
    ];
    const response = await SchoolLocationModel.aggregate(pipeline);

    const ns = response[0];
    // console.log(ns);
    const {
        location: { coordinates },
    } = ns;

    if (lat !== "undefined" && lng !== "undefined") {
        distWithTime = await calculateTravelDistance({ long: +lng, lat: +lat }, { long: coordinates[1], lat: coordinates[0] });
    }

    console.log({
        isFav: ns?.fav?.length > 0 && ns?.fav[0]?.user?.equals(user) ? true : false,
        isEnquired: ns?.enquiry?.length > 0 && ns?.enquiry[0]?.user?.equals(user) ? true : false,
    });
    const newItem = {
        ...ns,
        distance: distWithTime && Math.ceil(distWithTime.distance),
        duration: distWithTime && Math.ceil(distWithTime.duration / 60),
        isFav: ns?.fav?.length > 0 && ns?.fav[0]?.user?.equals(user) ? true : false,
        isEnquired: ns?.enquiry?.length > 0 && ns?.enquiry[0]?.user?.equals(user) ? true : false,
    };

    try {
        if (!newItem) {
            return {
                status: false,
                message: "no school found",
            };
        }

        return {
            status: true,
            message: "schools fetched",
            data: newItem,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

async function getOneLocationSchoolByIdForFavUnFav(data) {
    const { id } = data;
    const response = await SchoolLocationModel.findById(id).populate("school").lean(true);

    try {
        if (!response) {
            return {
                status: false,
                message: "no school found",
            };
        }

        return {
            status: true,
            message: "schools fetched",
            data: response,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

async function searchSchool(query) {
    console.log(query);

    const {
        keyword,
        distance,
        board,
        coedu,
        district,
        rating,
        city,
        type: boardingType,
        street,
        region,
        country,
        postalCode,
        subregion,
        medium,
        timezone,
        streetNumber,
        name: area,
        isoCountryCode,
        latitude,
        longitude,
    } = query;

    try {
        // const { distance, medium, board, keyword, longitude, latitude } = query;

        const filter = {};
        let keywordQuery = {};
        const geoSpatial = {};

        if (medium) {
            filter.medium = { $regex: medium, $options: "i" };
        }

        if (board) {
            filter.board = { $regex: board, $options: "i" };
        }

        if (boardingType) {
            filter.boarding = { $regex: boardingType, $options: "i" };
        }
        if (coedu) {
            filter.coedu = { $regex: coedu, $options: "i" };
        }

        // Construct the search keyword query
        if (keyword) {
            keywordQuery = {
                $or: [
                    { postcode: { $regex: keyword, $options: "i" } },
                    { schoolname: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for school name
                    { city: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search for city
                ],
            };
        }

        // Combine the filter and keyword queries
        // const combinedQuery = { ...filter, ...keywordQuery };
        Object.assign(filter, keywordQuery);

        // const schools = await SchoolLocationModel.find(combinedQuery).populate("school").lean(true);
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
                    from: "schools",
                    localField: "school",
                    foreignField: "_id",
                    as: "schoolData",
                },
            },
            {
                $unwind: {
                    path: "$schoolData",
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
                    school: "$locationdata.schoolData",
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
                    maxDistance: parseInt(distance) * 1000,
                    //   query: { category: "Parks" },
                    // includeLocs: "dist.location",
                    spherical: true,
                },
            });
        }

        const schools = await SchoolLocationModel.aggregate(pipeLins);

        if (schools.length <= 0) {
            return {
                status: false,
                message: "no school found",
            };
        }
        return {
            status: true,
            message: "schools fetched",
            data: schools,
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

// Getting schools for home page

async function GetschoolForHomePage(query) {
    const { city, latitude, longitude } = query;
    console.log(query);
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

    try {
        const aggresponse = await SchoolLocationModel.aggregate([
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
                    from: "schools",
                    localField: "school",
                    foreignField: "_id",
                    as: "schooldata",
                },
            },
            {
                $unwind: {
                    path: "$schooldata",
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "location",
                    as: "result",
                },
            },
            {
                $unwind: {
                    path: "$result",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    avgrating: {
                        $avg: "$result.rating",
                    },
                    // schooldata: { $first: "$schooldata" },
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
                    // school: 0,
                    location: "$locationdata.location",
                    school: "$locationdata.schooldata",
                    avgrating: "$avgrating",
                    featured: {
                        $cond: {
                            if: {
                                $eq: ["$locationdata.featured", true],
                            },
                            then: true,
                            else: false,
                        },
                    },
                    city: "$locationdata.city",
                    state: "$locationdata.state",
                    postcode: "$locationdata.postcode",
                },
            },
        ]);

        if (aggresponse) {
            return {
                status: true,
                message: "schools fetched",
                data: aggresponse,
            };
        }

        return {
            status: true,
            message: "schools fetched",
            data: aggresponse,
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

// get schools by route query

async function getSchoolsByRouteQuery(query) {
    const { key, city, lat, lng } = query;

    let filter = {};
    let geoQuery = {};
    if (city !== "undefined") {
        filter.city = { $regex: city, $options: "i" };
    }
    let school;

    try {
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

        console.log(geoQuery);
        if (key === "toprated") {
            school = await SchoolLocationModel.aggregate([
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
                        from: "schools",
                        localField: "school",
                        foreignField: "_id",
                        as: "schooldata",
                    },
                },
                {
                    $unwind: {
                        path: "$schooldata",
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "location",
                        as: "result",
                    },
                },
                {
                    $unwind: {
                        path: "$result",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        avgrating: {
                            $avg: "$result.rating",
                        },
                        // schooldata: { $first: "$schooldata" },
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
                        // school: 0,
                        //  'location.result':0,
                        school: "$locationdata.schooldata",
                        avgrating: "$avgrating",
                        featured: {
                            $cond: {
                                if: {
                                    $eq: ["$locationdata.featured", true],
                                },
                                then: true,
                                else: false,
                            },
                        },
                        city: "$locationdata.city",
                        state: "$locationdata.state",
                        postcode: "$locationdata.postcode",
                    },
                },
            ]);
        }
        if (key === "recent") {
            school = await SchoolLocationModel.aggregate([
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
                    $sort: {
                        createdAt: -1,
                    },
                },

                {
                    $lookup: {
                        from: "schools",
                        localField: "school",
                        foreignField: "_id",
                        as: "schooldata",
                    },
                },
                {
                    $unwind: {
                        path: "$schooldata",
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "location",
                        as: "result",
                    },
                },
                {
                    $unwind: {
                        path: "$result",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        avgrating: {
                            $avg: "$result.rating",
                        },
                        // schooldata: { $first: "$schooldata" },
                        locationdata: {
                            $first: "$$ROOT",
                        },
                    },
                },
                {
                    $sort: {
                        "locationdata.featured": -1,
                    },
                },
                {
                    $project: {
                        // school: 0,
                        //  'location.result':0,
                        school: "$locationdata.schooldata",
                        avgrating: "$avgrating",
                        featured: {
                            $cond: {
                                if: {
                                    $eq: ["$locationdata.featured", true],
                                },
                                then: true,
                                else: false,
                            },
                        },
                        city: "$locationdata.city",
                        state: "$locationdata.state",
                        postcode: "$locationdata.postcode",
                    },
                },
            ]);
        }

        if (key === "nearby") {
            try {
                const current = await SchoolLocationModel.aggregate([
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
                            from: "schools",
                            localField: "school",
                            foreignField: "_id",
                            as: "schooldata",
                        },
                    },
                    {
                        $unwind: {
                            path: "$schooldata",
                        },
                    },
                    {
                        $lookup: {
                            from: "reviews",
                            localField: "_id",
                            foreignField: "location",
                            as: "result",
                        },
                    },
                    {
                        $unwind: {
                            path: "$result",
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $group: {
                            _id: "$_id",
                            avgrating: {
                                $avg: "$result.rating",
                            },
                            // schooldata: { $first: "$schooldata" },
                            locationdata: {
                                $first: "$$ROOT",
                            },
                        },
                    },
                    {
                        $project: {
                            // school: 0,
                            //  'location.result':0,
                            school: "$locationdata.schooldata",
                            avgrating: "$avgrating",
                            featured: {
                                $cond: {
                                    if: {
                                        $eq: ["$locationdata.featured", true],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                            city: "$locationdata.city",
                            state: "$locationdata.state",
                            postcode: "$locationdata.postcode",
                            location: "$locationdata.location",
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
                school = newArrr;
                // school = newArrr.sort((a, b) => a.distance - b.distance);
            } catch (e) {
                console.log(e);
            }
        }

        console.log(school);
        if (!school) {
            return {
                status: false,
                message: "not found",
            };
        }
        return {
            status: true,
            message: "schools fetched",
            data: school,
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

async function getAllSchool() {
    const data = await SchoolLocationModel.find({}).populate("school").lean(true);

    try {
        if (!data) {
            return {
                status: false,
                message: "no school found",
            };
        }

        return {
            status: true,
            message: "schools fetched",
            data,
        };
    } catch (e) {
        return {
            status: false,
            message: "something went wrong",
        };
    }
}

const schoolsService = {
    filterSchools,
    getOneSchoolById,
    createSchool,
    deleteAllSchool,
    calculateTravelDistance,
    searchSchool,
    GetschoolForHomePage,
    getSchoolsByRouteQuery,
    getAllSchool,
    getOneLocationSchoolByIdForFavUnFav,
};
export default schoolsService;
