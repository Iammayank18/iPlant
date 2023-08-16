import ActionTypes from "./types";

const MainReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_AUTH_LOGIN:
      return {
        ...state,
        Login: action.payload,
        LoginLoader: true,
      };

    case ActionTypes.SET_AUTH_LOGIN:
      return {
        ...state,
        Login: action.payload,
        LoginLoader: false,
      };

    case ActionTypes.FETCH_AUTH_REGISTER:
      return {
        ...state,
        Register: [],
        RegisterLoader: true,
      };

    case ActionTypes.SET_AUTH_REGISTER:
      return {
        ...state,
        Register: action.payload,
        RegisterLoader: false,
      };

    case ActionTypes.SET_ORIGIN_COORDINATES:
      return {
        ...state,
        OriginCoordinates: action.payload,
        // OriginCoordinatesLoader: false,
      };
    case ActionTypes.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
        // OriginCoordinatesLoader: false,
      };
    case ActionTypes.FETCH_FORGETT_PASSWORD_EMAIL_OTP:
      return {
        ...state,
        sent_otp_data: action.payload,
        sent_otp_data_loader: true,
      };
    case ActionTypes.SET_FORGETT_PASSWORD_EMAIL_OTP:
      return {
        ...state,
        sent_otp_data: action.payload,
        sent_otp_data_loader: false,
      };

    case ActionTypes.FETCH_VERIFY_RESET_PASSWORD_OTP:
      return {
        ...state,
        verify_otp_data: action.payload,
        verify_otp_data_loader: true,
      };
    case ActionTypes.SET_VERIFY_RESET_PASSWORD_OTP:
      return {
        ...state,
        verify_otp_data: action.payload,
        verify_otp_data_loader: false,
      };

    case ActionTypes.FETCH_RESET_PASSWORD:
      return {
        ...state,
        reset_password: action.payload,
        reset_password_loader: true,
      };
    case ActionTypes.SET_RESET_PASSWORD:
      return {
        ...state,
        reset_password: action.payload,
        reset_password_loader: false,
      };

    case ActionTypes.FETCH_SCHOOL_DIS_TIME:
      return {
        ...state,
        schoolDistTime: action.payload,
        schoolDistTimeLoader: true,
      };
    case ActionTypes.SET_SCHOOL_DIS_TIME:
      return {
        ...state,
        schoolDistTime: action.payload,
        schoolDistTimeLoader: false,
      };

    // fetch all
    case ActionTypes.FETCH_ALL_SCHOOLS:
      return {
        ...state,
        allSchools: [],
        allSchoolsLoader: true,
      };
    case ActionTypes.SET_ALL_SCHOOLS:
      return {
        ...state,
        allSchools: action.payload,
        allSchoolsLoader: false,
      };

    // fetch fav unfav
    case ActionTypes.FETCH_SCHOOL_FAVORITE:
      return {
        ...state,
        favourite: [],
        favourtieLoader: true,
      };
    case ActionTypes.SET_SCHOOL_FAVORITE:
      return {
        ...state,
        favourite: action.payload,
        favourtieLoader: false,
      };
    // fetch SAVED SCHOOLS
    case ActionTypes.FETCH_SAVED_SCHOOLS:
      return {
        ...state,
        favouriteSchools: [],
        favouriteSchoolsLoader: true,
      };
    case ActionTypes.SET_SAVED_SCHOOLS:
      return {
        ...state,
        favouriteSchools: action.payload,
        favouriteSchoolsLoader: false,
      };

    default:
      return state;
  }
};

export default MainReducer;
