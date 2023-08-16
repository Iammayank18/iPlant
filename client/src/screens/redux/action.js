import ActionTypes from "./types";

/////login======
function FetchAuthLogin(data) {
  return {
    type: ActionTypes.FETCH_AUTH_LOGIN,
    payload: data,
  };
}
function SetAuthLogin(data) {
  return {
    type: ActionTypes.SET_AUTH_LOGIN,
    payload: data,
  };
}

//Register======
function FetchAuthRegister(data) {
  return {
    type: ActionTypes.FETCH_AUTH_REGISTER,
    payload: data,
  };
}
function SetAuthRegister(data) {
  return {
    type: ActionTypes.SET_AUTH_REGISTER,
    payload: data,
  };
}

function setOriginCoordinates(data) {
  return {
    type: ActionTypes.SET_ORIGIN_COORDINATES,
    payload: data,
  };
}

function setIsLoggedIn(data) {
  return {
    type: ActionTypes.SET_IS_LOGGED_IN,
    payload: data,
  };
}

//forgett password
function FetchSendResetPasswordEmailOtp(data) {
  return {
    type: ActionTypes.FETCH_FORGETT_PASSWORD_EMAIL_OTP,
    payload: data,
  };
}
function SetSendResetPasswordEmailOtp(data) {
  return {
    type: ActionTypes.SET_FORGETT_PASSWORD_EMAIL_OTP,
    payload: data,
  };
}

function FetchVerifyResetPasswordEmailOtp(data) {
  return {
    type: ActionTypes.FETCH_VERIFY_RESET_PASSWORD_OTP,
    payload: data,
  };
}
function SetVerifyResetPasswordEmailOtp(data) {
  return {
    type: ActionTypes.SET_VERIFY_RESET_PASSWORD_OTP,
    payload: data,
  };
}
function FetchResetPassword(data) {
  return {
    type: ActionTypes.FETCH_RESET_PASSWORD,
    payload: data,
  };
}
function SetResetPassword(data) {
  return {
    type: ActionTypes.SET_RESET_PASSWORD,
    payload: data,
  };
}

function FetchSchoolDIsTime(data) {
  return {
    type: ActionTypes.FETCH_SCHOOL_DIS_TIME,
    payload: data,
  };
}

function SetSchoolDIsTime(data) {
  return {
    type: ActionTypes.SET_SCHOOL_DIS_TIME,
    payload: data,
  };
}

//get schools by id

//fetch all schools
function FetchALlSchool(data) {
  return {
    type: ActionTypes.FETCH_ALL_SCHOOLS,
    payload: data,
  };
}
function SetAllSchools(data) {
  return {
    type: ActionTypes.SET_ALL_SCHOOLS,
    payload: data,
  };
}
//fetch FAV UNFAV
function FetchSchoolFav(data) {
  return {
    type: ActionTypes.FETCH_SCHOOL_FAVORITE,
    payload: data,
  };
}
function SetSchoolFav(data) {
  return {
    type: ActionTypes.SET_SCHOOL_FAVORITE,
    payload: data,
  };
}

// get saved schools
function FetchSavedSchool(data) {
  return {
    type: ActionTypes.FETCH_SAVED_SCHOOLS,
    payload: data,
  };
}
function SetSavedSchool(data) {
  return {
    type: ActionTypes.SET_SAVED_SCHOOLS,
    payload: data,
  };
}

const MainAction = {
  FetchAuthLogin,
  SetAuthLogin,
  FetchAuthRegister,
  SetAuthRegister,
  setOriginCoordinates,
  setIsLoggedIn,
  FetchSendResetPasswordEmailOtp,
  SetSendResetPasswordEmailOtp,
  FetchVerifyResetPasswordEmailOtp,
  SetVerifyResetPasswordEmailOtp,
  FetchResetPassword,
  SetResetPassword,
  FetchSchoolDIsTime,
  SetSchoolDIsTime,

  FetchALlSchool,
  SetAllSchools,
  FetchSchoolFav,
  SetSchoolFav,
  FetchSavedSchool,
  SetSavedSchool,
};

export default MainAction;
