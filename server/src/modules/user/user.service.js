import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Sendmail from "../../mailing/mail.js";
import User from "./schema/user.schema.js";
import FavoriteModel from "./schema/favourite.schema.js";
import postsService from "../posts/posts.service.js";
import { COMMON_SERVICE } from "../../utils/common.helper.js";

async function sendEmailOtp(req, res) {
  const { email } = req.body;

  const emailverifyotp = COMMON_SERVICE.generateOtp(6);

  const user = await User.findOne({ email });
  // if (!user) {
  //     return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
  // }

  if (user && user.verified === true) {
    return COMMON_SERVICE.apiResponse(res, "user already exist", false, 500);
  }
  if (user?.email) {
    const emailverify = await User.findOneAndUpdate(
      { email: user?.email },
      { emailverifyotp },
      { new: true },
    );
    if (emailverify) {
      await Sendmail(user?.email, emailverifyotp);
      return COMMON_SERVICE.apiResponse(res, "email otp send", true, 200);
    }
  } else {
    const newuser = new User({
      email,
      emailverifyotp,
    });
    const saveUser = newuser.save();
    if (saveUser) {
      const emailverify = await User.findOneAndUpdate(
        { email },
        { emailverifyotp },
        { new: true },
      );
      if (emailverify) {
        await Sendmail(email, emailverifyotp);
        return COMMON_SERVICE.apiResponse(res, "email otp send", true, 200);
      }
    }
  }
  return true;
}

async function verifyOtpEmail(req, res) {
  const { email, otp } = req.body;
  try {
    const response = await User.findOne({ email });

    if (!response) {
      return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
    }

    if (response.emailverifyotp === otp) {
      await User.findOneAndUpdate({ email }, { verified: true }, { new: true });
      return COMMON_SERVICE.apiResponse(
        res,
        "otp verified successfully",
        true,
        200,
      );
    }
    return COMMON_SERVICE.apiResponse(res, "invalid otp", false, 400);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function registerUser(req, res) {
  // register with facebook & google

  const { email } = req.body;

  try {
    const checkUSer = await User.findOne({ email });
    if (checkUSer) {
      return COMMON_SERVICE.apiResponse(res, "user already exist", false, 500);
    }

    const update = await new User(req.body);
    const letStore = update.save();
    if (letStore) {
      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "basantkumar2022@gmail.com",
          pass: "cgyrrjiapzuoxjkw",
        },
      });
      const mailDetails = {
        from: "basantkumar2022@gmail.com",
        to: req.body.email,
        subject: "Welcom to iPlant",
        text: `Welcome to iPlant ${req.body.name}!`,
      };

      mailTransporter.sendMail(mailDetails, (err, data) => {
        if (err) {
          return COMMON_SERVICE.apiResponse(
            res,
            "failed to send mail",
            false,
            500,
          );
        }
        return COMMON_SERVICE.apiResponse(res, "email send", true, 200, data);
      });

      return COMMON_SERVICE.apiResponse(res, "user registered", true, 201);
    }
    return COMMON_SERVICE.apiResponse(res, "registration failed", false, 500);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function loginUser(req, res) {
  let token;

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return COMMON_SERVICE.apiResponse(res, "plz filled the data", false, 400);
    }
    const userlogin = await User.findOne({ email });
    if (!userlogin)
      return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);

    const dataToSend = await User.findOne({ email }).select(
      "name email verified usertype favorites post_name phoneno city state country postcode post_address post_class post_medium address country",
    );

    const isMatch = await bcrypt.compare(password, userlogin.password);

    token = await userlogin.generateAuthToken();
    if (!isMatch) {
      return COMMON_SERVICE.apiResponse(
        res,
        "invalid credientials",
        false,
        401,
      );
    }
    return COMMON_SERVICE.apiResponse(res, "login sucessFully", true, 201, {
      data: dataToSend,
      token,
    });
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function forgetPasswordOtp(req, res) {
  const { email } = req.body;

  const otp = COMMON_SERVICE.generateOtp(6);

  const Userdata = await User.findOne({ email });
  if (!Userdata) {
    return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
  }
  const updateRes = await User.findOneAndUpdate(
    { email },
    { otp },
    { new: true },
  );
  if (updateRes) {
    try {
      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "basantkumar2022@gmail.com",
          pass: "cgyrrjiapzuoxjkw",
        },
      });

      const mailDetails = {
        from: "basantkumar2022@gmail.com",
        to: Userdata.email,
        subject: "Reset Password",
        text: `Otp for iPlant is ${otp}`,
      };

      mailTransporter.sendMail(mailDetails, (err, data) => {
        if (err) {
          return COMMON_SERVICE.apiResponse(res, "failed to sent", false, 500);
        }
        return COMMON_SERVICE.apiResponse(res, "otp sent", true, 200, data);
      });
    } catch (e) {
      return COMMON_SERVICE.apiResponse(
        res,
        "something went wrong",
        false,
        500,
      );
    }
  }
  return true;
}

async function verifyEmailOtp(req, res) {
  const { email, otp } = req.body;
  const user = User.findOne({ email });

  try {
    const response = await user;
    if (!response) {
      return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
    }

    if (response.otp === otp) {
      await User.findOneAndUpdate({ email }, { verified: true }, { new: true });
      return COMMON_SERVICE.apiResponse(
        res,
        "otp verified successfully",
        true,
        200,
      );
    }
    return COMMON_SERVICE.apiResponse(res, "invalid otp", false, 400);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function resetPassword(req, res) {
  const { email, password } = req.body;
  try {
    const response = await User.findOne({ email });
    if (!response) {
      return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
    }

    if (response.email === email) {
      const filter = { email };
      const updateData = {
        password,
      };
      const update = await User.updateOne(filter, updateData);
      if (update) {
        return COMMON_SERVICE.apiResponse(
          res,
          "password updated successfully",
          true,
          200,
        );
      }
      return COMMON_SERVICE.apiResponse(res, "failed to update", false, 500);
    }
    return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function getOneUserByEmail(email) {
  const response = await User.findOne({ email }).lean(true);
  try {
    if (!response) {
      // return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
      return {
        status: false,
        message: "no user found",
      };
    }
    // return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, response);
    return {
      status: true,
      message: "users fetched",
      data: response,
    };
  } catch (e) {
    // return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function getOneUserByUserid(req, res) {
  try {
    const response = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.query.id),
        },
      },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "user",
          as: "reviewsData",
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "_id",
          foreignField: "user",
          as: "postsData",
        },
      },
      {
        $lookup: {
          from: "favouriteposts",
          localField: "_id",
          foreignField: "user",
          as: "favData",
        },
      },
      {
        $addFields: {
          mainData: "$$ROOT",
        },
      },
      {
        $project: {
          likes: {
            $size: "$favData",
          },
          comments: {
            $size: "$reviewsData",
          },
          totalPlants: {
            $size: "$postsData",
          },
          points: { $multiply: [500, { $size: "$favData" }] },
          namess: "$mainData",
          name: "$mainData.name",
          age: "$mainData.age",
          profile_picture: "$mainData.profile_picture",
          username: "$mainData.username",
          dob: "$mainData.dob",
          phone: "$mainData.phoneno",
          email: "$mainData.email",
          verified: "$mainData.verified",
          state: "$mainData.state",
          city: "$mainData.city",
          country: "$mainData.country",
          postcode: "$mainData.postcode",
          address: "$mainData.address",
        },
      },
    ]);

    if (response.length <= 0) {
      return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);
    }
    return COMMON_SERVICE.apiResponse(res, "fetched", true, 200, response[0]);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function deleteOneUserByEmail(email) {
  try {
    const deleteUser = await User.findOneAndDelete(email);
    if (!deleteUser) {
      // return COMMON_SERVICE.apiResponse(res, "failed to delete", false, 500);
      return {
        status: false,
        message: "no user found",
      };
    }
    // return COMMON_SERVICE.apiResponse(res, "user deleted", true, 200);
    return {
      status: true,
      message: "user deleted",
      data: deleteUser,
    };
  } catch (e) {
    // return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function getAllUsers() {
  try {
    const user = await User.find({});
    if (!user) {
      return {
        status: false,
        message: "no user found",
      };
    }
    return {
      status: true,
      message: "users fetched",
      data: user,
    };
  } catch (e) {
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

async function updateUserPersonalData(req, res) {
  const { _id } = req.body;
  const updatePersonalData = await User.findOneAndUpdate({ _id }, req.body, {
    new: true,
  });

  try {
    if (updatePersonalData) {
      return COMMON_SERVICE.apiResponse(
        res,
        "user updatedata successfully",
        true,
        200,
      );
    }
    return COMMON_SERVICE.apiResponse(res, "failed update data", false, 500);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went worng", false, 500);
  }
}

async function uploadProfilePhoto(req, res) {
  try {
    const fileName = `${req.body._id}.${req.file.mimetype.split("/")[1]}`;
    const maxSize = 5 * 1024 * 1024;
    if (maxSize < req.file.size) {
      return COMMON_SERVICE.apiResponse(
        res,
        "file size must be less then 5 mb",
        false,
        500,
      );
    }
    const imageBuffer = Buffer.from(req.file.buffer, "base64");
    await COMMON_SERVICE.uploadImageToS3(imageBuffer, fileName);
    const imageUrl = `https://iplant-bucket.s3.amazonaws.com/${fileName}`;
    const updateUserProfilePhoto = await User.findOneAndUpdate(
      { _id: req.body._id },
      { profile_picture: imageUrl },
      { new: true },
    );

    if (!updateUserProfilePhoto) {
      return COMMON_SERVICE.apiResponse(res, "failed to upload", false, 500);
    }
    return COMMON_SERVICE.apiResponse(
      res,
      "photo updated successfully",
      true,
      200,
      imageUrl,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "failed to upload", false, 500);
  }
}

async function updateProfilePassword(req, res) {
  const { email, new_password, old_password } = req.body;
  if (!email || !new_password || !old_password) {
    return COMMON_SERVICE.apiResponse(
      res,
      "please fill all required data",
      false,
      400,
    );
  }

  const getEmail = await User.findOne({ email });
  if (!getEmail)
    return COMMON_SERVICE.apiResponse(res, "user not found", false, 404);

  try {
    if (old_password === new_password) {
      return COMMON_SERVICE.apiResponse(
        res,
        "old password and new password must be different",
        false,
        400,
      );
    }
    const isMatch = await bcrypt.compare(old_password, getEmail.password);
    if (isMatch) {
      const datasave = await User.findOneAndUpdate(
        { email },
        { password: new_password },
        { new: true },
      );
      if (datasave) {
        return COMMON_SERVICE.apiResponse(
          res,
          "password updated successfully",
          true,
          200,
        );
      }
      return COMMON_SERVICE.apiResponse(res, "failed to update", true, 200);
    }
    return COMMON_SERVICE.apiResponse(
      res,
      "old password is incorrect",
      false,
      400,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went worng", false, 500);
  }
}

async function addToFav(req, res) {
  try {
    const { post, user, isFavorite, location } = req.body;

    const datatostore = {
      user: mongoose.Types.ObjectId(user),
      post: mongoose.Types.ObjectId(post),
      location: mongoose.Types.ObjectId(location),
    };
    const storeFavPost = await postsService.getOneLocationPostByIdForFavUnFav({
      id: location,
    });

    if (!storeFavPost.status) {
      return COMMON_SERVICE.apiResponse(res, "post not found", false, 404);
    }

    const getOneFav = await FavoriteModel.findOne({
      post,
      user,
    });

    if (getOneFav) {
      // return COMMON_SERVICE.apiResponse(res, "already added", false, 400, getOneFav);
      if (isFavorite === false) {
        const deleteRes = await FavoriteModel.deleteOne({
          user: mongoose.Types.ObjectId(user),
          post: mongoose.Types.ObjectId(post),
          location: mongoose.Types.ObjectId(location),
        });

        if (deleteRes) {
          return COMMON_SERVICE.apiResponse(
            res,
            "remove from favorite",
            false,
            200,
          );
        }
        return COMMON_SERVICE.apiResponse(res, "failed to removed", true, 500);
      }
    }

    const newFavorite = await new FavoriteModel(datatostore).save();

    if (!newFavorite) {
      return COMMON_SERVICE.apiResponse(res, "failed to add", false, 500);
    }
    return COMMON_SERVICE.apiResponse(
      res,
      "added to favourite",
      true,
      200,
      newFavorite,
    );
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function getFavourites(req, res) {
  const { uid } = req.query;

  if (!uid) {
    return COMMON_SERVICE.apiResponse(res, "please add uid", false, 400);
  }
  try {
    const fav = await FavoriteModel.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(uid),
        },
      },
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
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "locationData",
        },
      },
      {
        $unwind: {
          path: "$locationData",
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
          localField: "location",
          foreignField: "location",
          as: "favs",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "location",
          foreignField: "location",
          as: "reviewsData",
        },
      },
      {
        $project: {
          postId: "$locationData._id",
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
          location: "$locationData.location",
        },
      },
    ]);

    if (fav.length <= 0) {
      return COMMON_SERVICE.apiResponse(res, "favourite not found", false, 404);
    }
    return COMMON_SERVICE.apiResponse(res, "found ", true, 200, fav);
  } catch (e) {
    return COMMON_SERVICE.apiResponse(res, "something went wrong", false, 500);
  }
}

async function getOneFave(data) {
  const { user, location } = data;

  try {
    const favData = await FavoriteModel.findOne({ user, location })
      .populate(["user", "post"])
      .lean(true);

    if (!favData) {
      return {
        status: false,
        message: "no data found",
      };
    }
    return {
      status: true,
      message: "data fetched",
      data: favData,
    };
  } catch (e) {
    return {
      status: false,
      message: "something went wrong",
    };
  }
}

const userService = {
  sendEmailOtp,
  verifyOtpEmail,
  registerUser,
  loginUser,
  forgetPasswordOtp,
  verifyEmailOtp,
  resetPassword,
  getOneUserByEmail,
  deleteOneUserByEmail,
  getAllUsers,
  updateUserPersonalData,
  uploadProfilePhoto,
  updateProfilePassword,
  addToFav,
  getFavourites,
  getOneFave,
  getOneUserByUserid,
};
export default userService;
