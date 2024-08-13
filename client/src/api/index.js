"use strict";
import api from "./apiServices";
import { GOOGLE_MAPS_APIKEY, ORS_APIKEY } from "../utils/baseUrl";
import { formatDuration } from "../utils/helperFunction";

// api for home page
const AddPost = (payload) => {
  return api.post(`api/post/addpost`, payload);
};
const homepageAPi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/post/homepage?${params}`);
};

const postByRouteNameQueryApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/post/byquery?${params}`);
};

const searchPostQueryApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/post/search?${params}`);
};

const addReviewApi = (payload) => {
  return api.post("api/post/review/add", payload);
};

const fetchPostReviewsApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/post/review/reviewbypost?${params}`);
};

/**Login API */
const LoginAPi = (payload) => api.post(`api/user/login`, payload);
const RegisterApi = (payload) => api.post(`api/user/register`, payload);

//password reset
const SendPasswordResetOtpEmailApi = (payload) =>
  api.post(`api/user/sendotp_forget_password`, payload);
const VerifyOtpEmailApi = (payload) =>
  api.post(`api/user/forget_password_verifyotp`, payload);
const ResetPasswordApi = (payload) =>
  api.post(`api/user/reset_password`, payload);

const getUserByEmailApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/user/getuserdata?${params}`);
};

const fetchAllPostsApi = async (payload) =>
  await api.post(`api/post/getall`, payload);

const fetchPostsByIdApi = async (payload) => {
  const params = new URLSearchParams(payload).toString();
  return await api.get(`api/post/byid?${params}`);
};

const AddToFavoritePostsApi = async (payload) => {
  return await api.post(`api/user/addfavourite`, payload);
};

const getSavedPosts = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/user/favourites?${params}`);
};

const sendEnquiryToPostApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.post(`/api/post/enquiry/sendenquiry`, payload);
};

const updateUserProfileApi = (payload) => {
  return api.post(`/api/user/updatePersonalData`, payload);
};

const updateUserProfilePhotoApi = (payload) => {
  return api.post("/api/user/profilePhoto", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const fetchPostDistTimeAPi = (payload) => payload;

const Apis = {
  AddPost,
  homepageAPi,
  LoginAPi,
  RegisterApi,
  AddToFavoritePostsApi,
  SendPasswordResetOtpEmailApi,
  VerifyOtpEmailApi,
  ResetPasswordApi,
  fetchPostsByIdApi,
  fetchAllPostsApi,
  getSavedPosts,
  postByRouteNameQueryApi,
  searchPostQueryApi,
  addReviewApi,
  fetchPostReviewsApi,
  sendEnquiryToPostApi,
  updateUserProfileApi,
  getUserByEmailApi,
  updateUserProfilePhotoApi,
  fetchPostDistTimeAPi,
};

export default Apis;
