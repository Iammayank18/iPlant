import { MainScreenPostTypes } from "./type";

//fetch home page data
const fetchHomePagePost = (data) => {
  return {
    type: MainScreenPostTypes.FETCH_HOMEPAGE_POST,
    payload: data,
  };
};
const setHomePagePost = (data) => {
  return {
    type: MainScreenPostTypes.SET_HOMEPAGE_POST,
    payload: data,
  };
};

//fetch post by route query
const fetchPostByRouteQuery = (data) => {
  return {
    type: MainScreenPostTypes.FETCH_ROUTE_QUERY_POST,
    payload: data,
  };
};
const setPostsByRouteQuery = (data) => {
  return {
    type: MainScreenPostTypes.SET_ROUTE_QUERY_POST,
    payload: data,
  };
};

export const MainScreenAction = {
  fetchHomePagePost,
  setHomePagePost,
  fetchPostByRouteQuery,
  setPostsByRouteQuery,
};
