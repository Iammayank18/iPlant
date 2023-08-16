import { MainScreenSchoolTypes } from "./type";

//fetch home page data
const fetchHomePageSchools = (data) => {
  return {
    type: MainScreenSchoolTypes.FETCH_HOMEPAGE_SCHOOLS,
    payload: data,
  };
};
const setHomePageSchools = (data) => {
  return {
    type: MainScreenSchoolTypes.SET_HOMEPAGE_SCHOOLS,
    payload: data,
  };
};

//fetch school by route query
const fetchSchoolsByRouteQuery = (data) => {
  return {
    type: MainScreenSchoolTypes.FETCH_ROUTE_QUERY_SCHOOLS,
    payload: data,
  };
};
const setSchoolsByRouteQuery = (data) => {
  return {
    type: MainScreenSchoolTypes.SET_ROUTE_QUERY_SCHOOLS,
    payload: data,
  };
};

export const MainScreenAction = {
  fetchHomePageSchools,
  setHomePageSchools,
  fetchSchoolsByRouteQuery,
  setSchoolsByRouteQuery,
};
