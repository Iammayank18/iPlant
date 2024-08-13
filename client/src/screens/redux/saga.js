import { call, put, select, takeLatest } from "redux-saga/effects";
import Apis from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionTypes from "./types";
import MainAction from "./action";

const fetchLoginReq = function* fetchLoginReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.LoginAPi, payload);

    if (
      data.err == "invalid credientials" ||
      data.msg == "invalid credientials"
    ) {
      yield put(MainAction.SetAuthLogin(data || []));
      yield put(MainAction.setIsLoggedIn(false));
    } else {
      yield put(MainAction.SetAuthLogin(data || []));
      yield put(MainAction.setIsLoggedIn(true));
      (async () => {
        await AsyncStorage.setItem("isLoggedin", "true");
        await AsyncStorage.setItem("authToken", data.data.token);
      })();
    }
  } catch (err) {
    yield put(MainAction.SetAuthLogin([]));
  }
};

const fetchRegisterReq = function* fetchRegisterReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.RegisterApi, payload);
    yield put(MainAction.SetAuthRegister(data || []));
  } catch (err) {
    yield put(MainAction.SetAuthRegister([]));
  }
};

//email otp reset password
const fetchEmailOtp = function* fetchEmailOtp(action) {
  try {
    const apiAayload = action.payload;
    const { data } = yield call(Apis.SendPasswordResetOtpEmailApi, apiAayload);
    yield put(MainAction.SetSendResetPasswordEmailOtp(data || []));
  } catch (err) {
    yield put(MainAction.SetSendResetPasswordEmailOtp([]));
  }
};

const fetchEmailOtpVerify = function* fetchEmailOtpVerify(action) {
  try {
    const ApiPayload = action.payload;
    const { data } = yield call(Apis.VerifyOtpEmailApi, ApiPayload);
    yield put(MainAction.SetVerifyResetPasswordEmailOtp(data || []));
  } catch (err) {
    yield put(MainAction.SetVerifyResetPasswordEmailOtp([]));
  }
};

const fetchEmailOtpReset = function* fetchEmailOtpReset(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.ResetPasswordApi, payload);
    yield put(MainAction.SetResetPassword(data || []));
  } catch (err) {
    yield put(MainAction.SetResetPassword([]));
  }
};

const fetchPostDistTime = function* fetchPostDistTime(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.fetchPostDistTimeAPi, payload);
    yield put(MainAction.SetPostDistime(data || []));
  } catch (err) {
    yield put(MainAction.SetPostDistime([]));
  }
};

const fetchAllPosts = function* fetchAllPosts(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.fetchAllPostsApi, payload);
    yield put(MainAction.SetAllPosts(data?.data || []));
  } catch (err) {
    yield put(MainAction.SetAllPosts([]));
  }
};

const fetchFavoritePost = function* fetchFavoritePost(action) {
  try {
    // Extract payload and root state
    const { payload } = action;
    const { apiPayload, page } = payload;
    const { data } = yield call(Apis.AddToFavoritePostsApi, apiPayload);
    yield put(MainAction.SetFavPost(data || []));
    if (page == "main") {
      const rootState = yield select();
      let allPostsList = [...rootState.mainreducer.allPosts];
      let postIndex = allPostsList.findIndex(
        (post) => post._id === apiPayload.post,
      );

      if (postIndex !== -1) {
        allPostsList[postIndex].isFavorite = apiPayload.isFavorite;
      }
      // Set the updated list of all post
      yield put(MainAction.SetAllPosts(allPostsList));
    }
    if (page == "save") {
      const rootState = yield select();
      const FavPostList = [...rootState.mainreducer.favouritePosts];

      let newList = [];
      let postIndex = FavPostList.findIndex(
        (post) => post.post._id === apiPayload.post,
      );

      if (postIndex !== -1) {
        newList = FavPostList.filter((item, id) => id !== postIndex);
      }

      yield put(MainAction.SetSavedPosts(newList));
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    yield put(MainAction.SetFavPost([]));
  }
};

const fetchSavedPost = function* fetchSavedPost(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.getSavedPosts, payload);
    yield put(MainAction.SetSavedPosts(data?.data || []));
  } catch (err) {
    yield put(MainAction.SetSavedPosts([]));
  }
};

export default function* sagas() {
  yield takeLatest(ActionTypes.FETCH_AUTH_LOGIN, fetchLoginReq);
  yield takeLatest(ActionTypes.FETCH_AUTH_REGISTER, fetchRegisterReq);
  yield takeLatest(ActionTypes.FETCH_FORGETT_PASSWORD_EMAIL_OTP, fetchEmailOtp);
  yield takeLatest(
    ActionTypes.FETCH_VERIFY_RESET_PASSWORD_OTP,
    fetchEmailOtpVerify,
  );
  yield takeLatest(ActionTypes.FETCH_RESET_PASSWORD, fetchEmailOtpReset);
  yield takeLatest(ActionTypes.FETCH_POST_DIS_TIME, fetchPostDistTime);
  yield takeLatest(ActionTypes.FETCH_ALL_POSTS, fetchAllPosts);
  yield takeLatest(ActionTypes.FETCH_POST_FAVORITE, fetchFavoritePost);
  yield takeLatest(ActionTypes.FETCH_SAVED_POSTS, fetchSavedPost);
}
