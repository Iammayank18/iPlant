import { takeLatest, call, put } from "redux-saga/effects";
import { FindSchoolTypes } from "./type";
import Apis from "../../../api";
import { FindSchoolScreenAction } from "./action";

const fetchFindSchoolReq = function* fetchFindSchoolReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.searchSchoolQueryApi, payload);
    yield put(FindSchoolScreenAction.setFindSchools(data?.data?.data || []));
  } catch (err) {
    yield put(FindSchoolScreenAction.setFindSchools([]));
  }
};

const fetchSavedSchoolReq = function* fetchSavedSchoolReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.getSavedSchools, payload);
    yield put(FindSchoolScreenAction.setSavedSchool(data?.data || []));
  } catch (err) {
    yield put(FindSchoolScreenAction.setSavedSchool([]));
  }
};

const fetchAddSavedSchoolReq = function* fetchAddSavedSchoolReq(action) {
  try {
    const payload = action.payload;
    const data = yield call(Apis.AddToFavoriteSchoolsApi, payload);
    yield put(FindSchoolScreenAction.setAddSaveSchool(data?.data || []));
  } catch (err) {
    yield put(FindSchoolScreenAction.setAddSaveSchool(err?.response?.data));
  }
};

const fetchAddReviewReq = function* fetchAddReviewReq(action) {
  try {
    const payload = action.payload;
    const data = yield call(Apis.addReviewApi, payload);
    yield put(FindSchoolScreenAction.setAddReview(data?.data || []));
  } catch (err) {
    // console.log(err.response);
    // console.log(err.response.data);
    // console.log(err.response.status);
    // console.log(err.response.headers);

    yield put(
      FindSchoolScreenAction.setAddReview({
        ...err?.response?.data,
        code: err.response.status,
      })
    );
  }
};

const fetchSchoolReviewsReq = function* fetchSchoolReviewsReq(action) {
  try {
    const payload = action.payload;
    const data = yield call(Apis.fetchSchoolReviewsApi, payload);
    yield put(FindSchoolScreenAction.setReviews(data?.data || []));
  } catch (err) {
    // console.log(err.response);
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);

    yield put(
      FindSchoolScreenAction.setReviews({
        ...err?.response?.data,
        code: err.response.status,
      })
    );
  }
};

//  fetch aschools by id============
const fetchSchoolById = function* fetchSchoolById(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.fetchSchoolsByIdApi, payload);
    yield put(FindSchoolScreenAction.SetSchoolById(data?.data || []));
  } catch (err) {
    yield put(FindSchoolScreenAction.SetSchoolById([]));
  }
};

//  send enquiry to school============
const SendEnquiryToSchool = function* SendEnquiryToSchool(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.sendEnquiryToSchoolApi, payload);

    yield put(FindSchoolScreenAction.SetSendSchoolEnquiry(data?.data || []));
  } catch (err) {
    yield put(
      FindSchoolScreenAction.SetSendSchoolEnquiry({
        ...err?.response?.data,
        code: err.response.status,
      })
    );
  }
};

export default function* FindSchoolScreenSaga() {
  yield takeLatest(FindSchoolTypes.FETCH_FIND_SCHOOLS, fetchFindSchoolReq);
  yield takeLatest(FindSchoolTypes.FETCH_SAVED_SCHOOLS, fetchSavedSchoolReq);
  yield takeLatest(FindSchoolTypes.FETCH_ADD_REVIEW, fetchAddReviewReq);
  yield takeLatest(FindSchoolTypes.FETCH_REVIEW, fetchSchoolReviewsReq);
  yield takeLatest(FindSchoolTypes.FETCH_SCHOOL_BY_ID, fetchSchoolById);
  yield takeLatest(
    FindSchoolTypes.FETCH_SEND_SCHOOL_ENQUIRY,
    SendEnquiryToSchool
  );
  yield takeLatest(
    FindSchoolTypes.FETCH_ADDSAVED_SCHOOLS,
    fetchAddSavedSchoolReq
  );
}
