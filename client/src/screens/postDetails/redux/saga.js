import { takeLatest, call, put } from "redux-saga/effects";
import { FindPostTypes } from "./type";
import Apis from "../../../api";
import { FindPostScreenAction } from "./action";

const fetchFindPostReq = function* fetchFindPostReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.searchPostQueryApi, payload);
    yield put(FindPostScreenAction.setFindPosts(data?.data?.data || []));
  } catch (err) {
    yield put(FindPostScreenAction.setFindPosts([]));
  }
};

const fetchSavedPostReq = function* fetchSavedPostReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.getSavedPosts, payload);
    yield put(FindPostScreenAction.setSavedPost(data?.data || []));
  } catch (err) {
    yield put(FindPostScreenAction.setSavedPost([]));
  }
};

const fetchaddSavedPostReq = function* fetchaddSavedPostReq(action) {
  try {
    const payload = action.payload;
    const data = yield call(Apis.AddToFavoritePostsApi, payload);
    yield put(FindPostScreenAction.setAddSavePost(data?.data || []));
  } catch (err) {
    yield put(FindPostScreenAction.setAddSavePost(err?.response?.data));
  }
};

const fetchAddReviewReq = function* fetchAddReviewReq(action) {
  try {
    const payload = action.payload;
    const data = yield call(Apis.addReviewApi, payload);
    yield put(FindPostScreenAction.setAddReview(data?.data || []));
  } catch (err) {
    yield put(
      FindPostScreenAction.setAddReview({
        ...err?.response?.data,
        code: err.response.status,
      }),
    );
  }
};

const fetchPostReviewsReq = function* fetchPostReviewsReq(action) {
  try {
    const payload = action.payload;
    const data = yield call(Apis.fetchPostReviewsApi, payload);
    yield put(FindPostScreenAction.setReviews(data?.data || []));
  } catch (err) {
    yield put(
      FindPostScreenAction.setReviews({
        ...err?.response?.data,
        code: err.response.status,
      }),
    );
  }
};

const FetchPostById = function* FetchPostById(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.fetchPostsByIdApi, payload);
    yield put(FindPostScreenAction.SetPostById(data?.data || []));
  } catch (err) {
    yield put(FindPostScreenAction.SetPostById([]));
  }
};

const SendEnquiryToPost = function* SendEnquiryToPost(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.sendEnquiryToPostApi, payload);

    yield put(FindPostScreenAction.SetSendPostEnquiry(data?.data || []));
  } catch (err) {
    yield put(
      FindPostScreenAction.SetSendPostEnquiry({
        ...err?.response?.data,
        code: err.response.status,
      }),
    );
  }
};

export default function* FindPostScreenSaga() {
  yield takeLatest(FindPostTypes.FETCH_FIND_POSTS, fetchFindPostReq);
  yield takeLatest(FindPostTypes.FETCH_SAVED_POSTS, fetchSavedPostReq);
  yield takeLatest(FindPostTypes.FETCH_ADD_REVIEW, fetchAddReviewReq);
  yield takeLatest(FindPostTypes.FETCH_REVIEW, fetchPostReviewsReq);
  yield takeLatest(FindPostTypes.FETCH_POSTS_BY_ID, FetchPostById);
  yield takeLatest(FindPostTypes.FETCH_SEND_POSTS_ENQUIRY, SendEnquiryToPost);
  yield takeLatest(FindPostTypes.FETCH_ADDSAVED_POSTS, fetchaddSavedPostReq);
}
