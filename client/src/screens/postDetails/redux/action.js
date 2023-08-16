import { FindSchoolTypes } from "./type";

//fetch home page data
const fetchFindSchools = (data) => {
  return {
    type: FindSchoolTypes.FETCH_FIND_SCHOOLS,
    payload: data,
  };
};

const setFindSchools = (data) => {
  return {
    type: FindSchoolTypes.SET_FIND_SCHOOLS,
    payload: data,
  };
};

const fetchSavedSchool = (data) => {
  return {
    type: FindSchoolTypes.FETCH_SAVED_SCHOOLS,
    payload: data,
  };
};
const setSavedSchool = (data) => {
  return {
    type: FindSchoolTypes.SET_SAVED_SCHOOLS,
    payload: data,
  };
};

const fetchAddSaveSchool = (data) => {
  return {
    type: FindSchoolTypes.FETCH_ADDSAVED_SCHOOLS,
    payload: data,
  };
};
const setAddSaveSchool = (data) => {
  return {
    type: FindSchoolTypes.SET_ADDSAVED_SCHOOLS,
    payload: data,
  };
};

//FOR ADDING REVIEW
const fetchAddReview = (data) => {
  return {
    type: FindSchoolTypes.FETCH_ADD_REVIEW,
    payload: data,
  };
};
const setAddReview = (data) => {
  return {
    type: FindSchoolTypes.SET_ADD_REVIEW,
    payload: data,
  };
};

//FOR ADDED REVIEW
const fetchReviews = (data) => {
  return {
    type: FindSchoolTypes.FETCH_REVIEW,
    payload: data,
  };
};
const setReviews = (data) => {
  return {
    type: FindSchoolTypes.SET_REVIEW,
    payload: data,
  };
};

// fetch school by id
function FetchSchoolById(data) {
  return {
    type: FindSchoolTypes.FETCH_SCHOOL_BY_ID,
    payload: data,
  };
}

function SetSchoolById(data) {
  return {
    type: FindSchoolTypes.SET_SCHOOL_BY_ID,
    payload: data,
  };
}

function FetchSendSchoolEnquiry(data) {
  return {
    type: FindSchoolTypes.FETCH_SEND_SCHOOL_ENQUIRY,
    payload: data,
  };
}

function SetSendSchoolEnquiry(data) {
  return {
    type: FindSchoolTypes.SET_SEND_SCHOOL_ENQUIRY,
    payload: data,
  };
}

export const FindSchoolScreenAction = {
  fetchFindSchools,
  setFindSchools,
  fetchSavedSchool,
  setSavedSchool,
  fetchAddSaveSchool,
  setAddSaveSchool,

  fetchAddReview,
  setAddReview,
  fetchReviews,
  setReviews,
  FetchSchoolById,
  SetSchoolById,

  FetchSendSchoolEnquiry,
  SetSendSchoolEnquiry,
};
