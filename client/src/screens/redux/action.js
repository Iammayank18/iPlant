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

function FetchPostDIsTime(data) {
  return {
    type: ActionTypes.FETCH_POST_DIS_TIME,
    payload: data,
  };
}

function SetPostDistime(data) {
  return {
    type: ActionTypes.SET_POST_DIS_TIME,
    payload: data,
  };
}

//fetch all posts
function FetchALlPost(data) {
  return {
    type: ActionTypes.FETCH_ALL_POSTS,
    payload: data,
  };
}
function SetAllPosts(data) {
  return {
    type: ActionTypes.SET_ALL_POSTS,
    payload: data,
  };
}
//fetch FAV UNFAV
function FetchPostFav(data) {
  return {
    type: ActionTypes.FETCH_POST_FAVORITE,
    payload: data,
  };
}
function SetFavPost(data) {
  return {
    type: ActionTypes.SET_POST_FAVORITE,
    payload: data,
  };
}

// get saved post
function FetchSavedPost(data) {
  return {
    type: ActionTypes.FETCH_SAVED_POSTS,
    payload: data,
  };
}
function SetSavedPosts(data) {
  return {
    type: ActionTypes.SET_SAVED_POSTS,
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
  FetchPostDIsTime,
  SetPostDistime,

  FetchALlPost,
  SetAllPosts,
  FetchPostFav,
  SetFavPost,
  FetchSavedPost,
  SetSavedPosts,
};

export default MainAction;
