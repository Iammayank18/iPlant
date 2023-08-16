import { loginTypes } from "./type";
export function loginRequest(data) {
  return {
    type: loginTypes.FETCH_AUTH_LOGIN,
    payload: data,
  };
}

function loginReqSuccess() {
  return {
    type: loginTypes.LOGIN_SUCCESS,
  };
}

function loginReqFailed(data) {
  return {
    type: loginTypes.LOGIN_FAILURE,
    payload: data,
  };
}

function setUserData(userData) {
  return {
    type: loginTypes.SET_USER_DATA,
    payload: userData,
  };
}

function removeUserData() {
  return {
    type: loginTypes.REMOVE_USER_DATA,
  };
}

// ================reginster==============
function fetchRegisterUser(userData) {
  return {
    type: loginTypes.FETCH_REGISTER_USER,
    payload: userData,
  };
}

function setRegisterUser(userData) {
  return {
    type: loginTypes.SET_REGISTER_USER,
    payload: userData,
  };
}

export const LoginActions = {
  loginRequest,
  loginReqSuccess,
  loginReqFailed,
  setUserData,
  removeUserData,
  fetchRegisterUser,
  setRegisterUser,
};
