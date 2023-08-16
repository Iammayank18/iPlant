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

const fetchSchoolDistTime = function* fetchSchoolDistTime(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.fetchSchoolDistTimeAPi, payload);
    yield put(MainAction.SetSchoolDIsTime(data || []));
  } catch (err) {
    yield put(MainAction.SetSchoolDIsTime([]));
  }
};

/// FETCH ALL SCHOOLS
const fetchAllSchools = function* fetchAllSchools(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.fetchAllSchoolsApi, payload);
    yield put(MainAction.SetAllSchools(data?.data || []));
  } catch (err) {
    yield put(MainAction.SetAllSchools([]));
  }
};

/// FETCH fav unfav
const fetchFavoriteSchool = function* fetchFavoriteSchool(action) {
  try {
    // Extract payload and root state
    const { payload } = action;
    const { apiPayload, page } = payload;
    const { data } = yield call(Apis.AddToFavoriteSchoolsApi, apiPayload);
    yield put(MainAction.SetSchoolFav(data || []));
    if (page == "main") {
      const rootState = yield select();
      let allSchoolsList = [...rootState.mainreducer.allSchools];
      let schoolIndex = allSchoolsList.findIndex(
        (school) => school._id === apiPayload.school
      );

      if (schoolIndex !== -1) {
        allSchoolsList[schoolIndex].isFavorite = apiPayload.isFavorite;
      }
      // Set the updated list of all schools
      yield put(MainAction.SetAllSchools(allSchoolsList));
    }
    if (page == "save") {
      const rootState = yield select();
      const FavSchoolsList = [...rootState.mainreducer.favouriteSchools];

      let newList = [];
      let schoolIndex = FavSchoolsList.findIndex(
        (school) => school.school._id === apiPayload.school
      );

      if (schoolIndex !== -1) {
        newList = FavSchoolsList.filter((item, id) => id !== schoolIndex);
      }

      yield put(MainAction.SetSavedSchool(newList));
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    yield put(MainAction.SetSchoolFav([]));
  }
};
/// FETCH ALL saved schools
const fetchSavedSchool = function* fetchSavedSchool(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.getSavedSchools, payload);
    yield put(MainAction.SetSavedSchool(data?.data || []));
  } catch (err) {
    yield put(MainAction.SetSavedSchool([]));
  }
};

export default function* sagas() {
  yield takeLatest(ActionTypes.FETCH_AUTH_LOGIN, fetchLoginReq);
  yield takeLatest(ActionTypes.FETCH_AUTH_REGISTER, fetchRegisterReq);
  yield takeLatest(ActionTypes.FETCH_FORGETT_PASSWORD_EMAIL_OTP, fetchEmailOtp);
  yield takeLatest(
    ActionTypes.FETCH_VERIFY_RESET_PASSWORD_OTP,
    fetchEmailOtpVerify
  );
  yield takeLatest(ActionTypes.FETCH_RESET_PASSWORD, fetchEmailOtpReset);
  yield takeLatest(ActionTypes.FETCH_SCHOOL_DIS_TIME, fetchSchoolDistTime);
  yield takeLatest(ActionTypes.FETCH_ALL_SCHOOLS, fetchAllSchools);
  yield takeLatest(ActionTypes.FETCH_SCHOOL_FAVORITE, fetchFavoriteSchool);
  yield takeLatest(ActionTypes.FETCH_SAVED_SCHOOLS, fetchSavedSchool);
}
