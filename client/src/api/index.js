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

const schoolByRouteNameQueryApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/post/byquery?${params}`);
};

const searchSchoolQueryApi = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/post/search?${params}`);
};

const addReviewApi = (payload) => {
  return api.post("api/post/review/add", payload);
};

const fetchSchoolReviewsApi = (payload) => {
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

//get all schools
const fetchAllSchoolsApi = async (payload) =>
  await api.post(`api/post/getall`, payload);

//fetch schools by id
const fetchSchoolsByIdApi = async (payload) => {
  const params = new URLSearchParams(payload).toString();
  return await api.get(`api/post/byid?${params}`);
};

//save schoools
const AddToFavoriteSchoolsApi = async (payload) => {
  return await api.post(`api/user/addfavourite`, payload);
};

const getSavedSchools = (payload) => {
  const params = new URLSearchParams(payload).toString();
  return api.get(`api/user/favourites?${params}`);
};

const sendEnquiryToSchoolApi = (payload) => {
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

const Apis = {
  AddPost,
  homepageAPi,
  LoginAPi,
  RegisterApi,
  AddToFavoriteSchoolsApi,
  SendPasswordResetOtpEmailApi,
  VerifyOtpEmailApi,
  ResetPasswordApi,
  fetchSchoolsByIdApi,
  fetchAllSchoolsApi,
  getSavedSchools,
  schoolByRouteNameQueryApi,
  searchSchoolQueryApi,
  addReviewApi,
  fetchSchoolReviewsApi,
  sendEnquiryToSchoolApi,
  updateUserProfileApi,
  getUserByEmailApi,
  updateUserProfilePhotoApi,
};

export default Apis;
