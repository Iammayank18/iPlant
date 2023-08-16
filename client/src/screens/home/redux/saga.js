import { takeLatest, call, put } from "redux-saga/effects";
import { MainScreenSchoolTypes } from "./type";
import Apis from "../../../api";
import { MainScreenAction } from "./action";

const fetchHomepageSchoolReq = function* fetchHomepageSchoolReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.homepageAPi, payload);
    yield put(MainScreenAction.setHomePageSchools(data?.data?.data || []));
  } catch (err) {
    yield put(MainScreenAction.setHomePageSchools([]));
  }
};

const fetchQueryPageSchoolReq = function* fetchQueryPageSchoolReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.schoolByRouteNameQueryApi, payload);

    yield put(MainScreenAction.setSchoolsByRouteQuery(data?.data?.data || []));
  } catch (err) {
    yield put(MainScreenAction.setSchoolsByRouteQuery([]));
  }
};

export default function* MainScreenSaga() {
  yield takeLatest(
    MainScreenSchoolTypes.FETCH_HOMEPAGE_SCHOOLS,
    fetchHomepageSchoolReq
  );
  yield takeLatest(
    MainScreenSchoolTypes.FETCH_ROUTE_QUERY_SCHOOLS,
    fetchQueryPageSchoolReq
  );
}
