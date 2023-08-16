import { MainScreenSchoolTypes } from "./type";

export const MainScreenReducer = (state = [], action) => {
  switch (action.type) {
    case MainScreenSchoolTypes.FETCH_HOMEPAGE_SCHOOLS:
      return {
        ...state,
        homepageschoolloader: true,
        homepageschool: [],
      };
    case MainScreenSchoolTypes.SET_HOMEPAGE_SCHOOLS:
      return {
        ...state,
        homepageschoolloader: false,
        homepageschool: action.payload,
      };

    case MainScreenSchoolTypes.FETCH_ROUTE_QUERY_SCHOOLS:
      return {
        ...state,
        qyerypageschoolloader: true,
        qyerypageschool: [],
      };
    case MainScreenSchoolTypes.SET_ROUTE_QUERY_SCHOOLS:
      console.log("in setttttttt");
      return {
        ...state,
        qyerypageschoolloader: false,
        qyerypageschool: action.payload,
      };

    default:
      return state;
  }
};
