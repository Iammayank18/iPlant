import { takeLatest, call, put } from "redux-saga/effects";
import { loginTypes } from "./type";
import Apis from "../../../api";
import { LoginActions } from "./action";
const login = function* login(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.LoginAPi, payload);
    if (data.status === false) {
      return yield put(LoginActions.loginReqFailed(data));
    }

    yield put(LoginActions.loginReqSuccess());
    yield put(
      LoginActions.setUserData({
        user: data.data.data,
        jwtToken: data.data.token,
      })
    );
  } catch (error) {
    console.log("error", error.response.data);
    return yield put(LoginActions.loginReqFailed(error));
  }
};

const registerApiReq = function* registerApiReq(action) {
  try {
    const payload = action.payload;
    const { data } = yield call(Apis.RegisterApi, payload);
    yield put(LoginActions.setRegisterUser(data));
  } catch (error) {
    console.log("error", error.response.data);
    yield put(LoginActions.setRegisterUser(error.response.data));
  }
};

export default function* loginSaga() {
  yield takeLatest(loginTypes.FETCH_AUTH_LOGIN, login);
  yield takeLatest(loginTypes.FETCH_REGISTER_USER, registerApiReq);
}
