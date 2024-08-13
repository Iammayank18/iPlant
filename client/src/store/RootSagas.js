import { takeEvery, all, fork, SelectEffect, select } from "redux-saga/effects";
import MainSagas from "../screens/redux/saga";
import loginSaga from "../screens/auth/redux/saga";
import MainScreenSaga from "../screens/home/redux/saga";
import utilitySasga from "../screens/utilityScreen/redux/saga";
import FindPostScreenSaga from "../screens/postDetails/redux/saga";
import profileSaga from "../screens/profile/redux/saga";
import postSaga from "../screens/addpost/redux/saga";
function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();
    // console.debug('action', action);
    // console.debug('state after', state);
  });
}

export default function* root() {
  const allForks = [
    fork(MainSagas),
    fork(loginSaga),
    fork(MainScreenSaga),
    fork(utilitySasga),
    fork(FindPostScreenSaga),
    fork(profileSaga),
    fork(postSaga),
  ];
  if (process.env.NODE_ENV === "development") {
    allForks.unshift(fork(watchAndLog));
  }
  yield all(allForks);
}
