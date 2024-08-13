import { takeLatest, call, put } from "redux-saga/effects";
import { MainScreenPostTypes } from "./type";
import Apis from "../../../api";
import { MainScreenAction } from "./action";

const fetchHomepagePostReq = function* fetchHomepagePostReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.homepageAPi, payload);
    yield put(MainScreenAction.setHomePagePost(data?.data?.data || []));
  } catch (err) {
    yield put(MainScreenAction.setHomePagePost([]));
  }
};

const fetchQueryPagePostReq = function* fetchQueryPagePostReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.postByRouteNameQueryApi, payload);

    yield put(MainScreenAction.setPostsByRouteQuery(data?.data?.data || []));
  } catch (err) {
    yield put(MainScreenAction.setPostsByRouteQuery([]));
  }
};

export default function* MainScreenSaga() {
  yield takeLatest(
    MainScreenPostTypes.FETCH_HOMEPAGE_POST,
    fetchHomepagePostReq,
  );
  yield takeLatest(
    MainScreenPostTypes.FETCH_ROUTE_QUERY_POST,
    fetchQueryPagePostReq,
  );
}
