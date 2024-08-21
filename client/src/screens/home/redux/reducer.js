import { MainScreenPostTypes } from "./type";

export const MainScreenReducer = (state = [], action) => {
  switch (action.type) {
    case MainScreenPostTypes.FETCH_HOMEPAGE_POST:
      return {
        ...state,
        homepagepostloader: true,
        homepagepost: [],
      };
    case MainScreenPostTypes.SET_HOMEPAGE_POST:
      return {
        ...state,
        homepagepostloader: false,
        homepagepost: action.payload,
      };

    case MainScreenPostTypes.FETCH_ROUTE_QUERY_POST:
      return {
        ...state,
        qyerypagepostloader: true,
        qyerypagepost: [],
      };
    case MainScreenPostTypes.SET_ROUTE_QUERY_POST:
      return {
        ...state,
        qyerypagepostloader: false,
        qyerypagepost: action.payload,
      };

    default:
      return state;
  }
};
