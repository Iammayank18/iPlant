import { postTypes } from "./types";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case postTypes.FETCH_ADD_POST:
      return {
        ...state,
        addpost: [],
        addpostLoader: true,
      };

    case postTypes.SET_ADD_POST:
      return {
        ...state,
        addpost: action.payload,
        addpostLoader: false,
      };

    default:
      return state;
  }
};

export default postReducer;
