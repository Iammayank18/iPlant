import { loginTypes } from "./type";
const initialState = {
  loading: false,
  error: undefined,
};
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.FETCH_AUTH_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case loginTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };
    case loginTypes.SET_USER_DATA:
      return {
        ...state,
        loading: false,
        userdata: { ...action.payload },
      };

    // ===========REGISTER=======
    case loginTypes.FETCH_REGISTER_USER:
      return {
        ...state,
        registerLoader: true,
        registerReq: action.payload,
      };
    case loginTypes.SET_REGISTER_USER:
      return {
        ...state,
        registerLoader: false,
        registerReq: action.payload,
      };
    default:
      return state;
  }
};
