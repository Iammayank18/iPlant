import { postTypes } from "./types";
const fetchAddPost = (data) => {
  return {
    type: postTypes.FETCH_ADD_POST,
    payload: data,
  };
};
const setAddPost = (data) => {
  return {
    type: postTypes.SET_ADD_POST,
    payload: data,
  };
};

export const postAction = {
  fetchAddPost,
  setAddPost,
};
