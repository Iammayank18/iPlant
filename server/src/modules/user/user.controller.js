import express from "express";
import multer from "multer";
import userService from "./user.service.js";

// se multer to upload the image
const userRouter = express.Router();

const upload = multer();

// User Send Email Otp api
userRouter.post("/emailotp", userService.sendEmailOtp);

// Email Verify otp api
userRouter.post("/verifyotp", userService.verifyOtpEmail);

// Regiser api
userRouter.post("/register", userService.registerUser);

// User Login api
userRouter.post("/login", userService.loginUser);

// User Send otp  Forgett password api
userRouter.post("/sendotp_forget_password", userService.forgetPasswordOtp);

// forget password Verify otp api
userRouter.post("/forget_password_verifyotp", userService.verifyEmailOtp);

// Reset password Verify otp api
userRouter.post("/reset_password", userService.resetPassword);

// User get data for email based
userRouter.get("/getuserdata", userService.getOneUserByUserid);

// delete data for users
userRouter.delete("/user", userService.deleteOneUserByEmail);

// Get all data for users
userRouter.get("/users", userService.getAllUsers);

// Update Personal data for users
userRouter.post("/updatePersonalData", userService.updateUserPersonalData);

// updated avatar photo
userRouter.post(
  "/profilePhoto",
  upload.single("image"),
  userService.uploadProfilePhoto,
);

// updated password
userRouter.post("/updated_profile_password", userService.updateProfilePassword);

// favourite posts
userRouter.post("/addfavourite", userService.addToFav);

/// populate favourite data
userRouter.get("/favourites", userService.getFavourites);

export default userRouter;
