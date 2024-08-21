import { call, put, select, takeLatest } from "redux-saga/effects";
import Apis from "../../../api";
import ProfileAction from "./action";
import ProfleTypes from "./types";

const fetchUpdateProfile = function* fetchUpdateProfile(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.updateUserProfileApi, payload);

    yield put(ProfileAction.setUpdateProfile(data || []));
  } catch (err) {
    yield put(ProfileAction.setUpdateProfile([]));
  }
};

const fetchUserProfileData = function* fetchUserProfileData(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.getUserByEmailApi, payload);
    yield put(ProfileAction.setUserProfileData(data || []));
  } catch (err) {
    yield put(ProfileAction.setUserProfileData([]));
  }
};
const fetchUserUpdateProfilePhotoReq = function* fetchUserUpdateProfilePhotoReq(
  action,
) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.updateUserProfilePhotoApi, payload);
    yield put(ProfileAction.setUserUpdateProfilePhoto(data || []));
  } catch (err) {
    yield put(
      ProfileAction.setUserUpdateProfilePhoto({
        msg: err.response.data.msg,
        statusCode: err.response.status,
        status: err.response.data.status,
      }),
    );
  }
};

export default function* profileSaga() {
  yield takeLatest(ProfleTypes.FETCH_UPDATED_PROFILE, fetchUpdateProfile);
  yield takeLatest(ProfleTypes.FETCH_USER_PROFILE_DATA, fetchUserProfileData);
  yield takeLatest(
    ProfleTypes.FETCH_UPDATED_PROFILE_PHOTO,
    fetchUserUpdateProfilePhotoReq,
  );
}
