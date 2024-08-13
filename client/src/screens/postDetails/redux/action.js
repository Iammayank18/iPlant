import { FindPostTypes } from "./type";

//fetch home page data
const fetchFindPosts = (data) => {
  return {
    type: FindPostTypes.FETCH_FIND_POSTS,
    payload: data,
  };
};

const setFindPosts = (data) => {
  return {
    type: FindPostTypes.SET_FIND_POSTS,
    payload: data,
  };
};

const fetchSavedPost = (data) => {
  return {
    type: FindPostTypes.FETCH_SAVED_POSTS,
    payload: data,
  };
};
const setSavedPost = (data) => {
  return {
    type: FindPostTypes.SET_SAVED_POSTS,
    payload: data,
  };
};

const fetchAddSavePost = (data) => {
  return {
    type: FindPostTypes.FETCH_ADDSAVED_POSTS,
    payload: data,
  };
};
const setAddSavePost = (data) => {
  return {
    type: FindPostTypes.SET_ADDSAVED_POSTS,
    payload: data,
  };
};

//FOR ADDING REVIEW
const fetchAddReview = (data) => {
  return {
    type: FindPostTypes.FETCH_ADD_REVIEW,
    payload: data,
  };
};
const setAddReview = (data) => {
  return {
    type: FindPostTypes.SET_ADD_REVIEW,
    payload: data,
  };
};

//FOR ADDED REVIEW
const fetchReviews = (data) => {
  return {
    type: FindPostTypes.FETCH_REVIEW,
    payload: data,
  };
};
const setReviews = (data) => {
  return {
    type: FindPostTypes.SET_REVIEW,
    payload: data,
  };
};

// fetch POST by id
function FetchPostById(data) {
  return {
    type: FindPostTypes.FETCH_POSTS_BY_ID,
    payload: data,
  };
}

function SetPostById(data) {
  return {
    type: FindPostTypes.SET_POSTS_BY_ID,
    payload: data,
  };
}

function FetchSendPostEnquiry(data) {
  return {
    type: FindPostTypes.FETCH_SEND_POSTS_ENQUIRY,
    payload: data,
  };
}

function SetSendPostEnquiry(data) {
  return {
    type: FindPostTypes.SET_SEND_POSTS_ENQUIRY,
    payload: data,
  };
}

export const FindPostScreenAction = {
  fetchFindPosts,
  setFindPosts,
  fetchSavedPost,
  setSavedPost,
  fetchAddSavePost,
  setAddSavePost,

  fetchAddReview,
  setAddReview,
  fetchReviews,
  setReviews,
  FetchPostById,
  SetPostById,

  FetchSendPostEnquiry,
  SetSendPostEnquiry,
};
