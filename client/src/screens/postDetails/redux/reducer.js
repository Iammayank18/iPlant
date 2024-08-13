import { FindPostTypes } from "./type";

export const FindPostScreenReducer = (state = [], action) => {
  switch (action.type) {
    case FindPostTypes.FETCH_FIND_POSTS:
      return {
        ...state,
        searchLoader: true,
        searchPostData: [],
      };
    case FindPostTypes.SET_FIND_POSTS:
      return {
        ...state,
        searchLoader: false,
        searchPostData: action.payload,
      };

    // for saved post
    case FindPostTypes.FETCH_SAVED_POSTS:
      return {
        ...state,
        savedPostLoader: true,
        savedPost: [],
      };
    case FindPostTypes.SET_SAVED_POSTS:
      return {
        ...state,
        savedPostLoader: false,
        savedPost: action.payload,
      };

    // for add to fav  post
    case FindPostTypes.FETCH_ADDSAVED_POSTS:
      return {
        ...state,
        addSavedPostLoader: true,
        addSavedPost: [],
      };
    case FindPostTypes.SET_ADDSAVED_POSTS:
      return {
        ...state,
        addSavedPostLoader: false,
        addSavedPost: action.payload,
      };

    //open close review modal
    case FindPostTypes.OPEN_REVIEW_MODAL:
      return {
        ...state,
        reviewModal: true,
      };
    case FindPostTypes.CLOSE_REVIEW_MODAL:
      return {
        ...state,
        reviewModal: false,
      };

    // add review
    case FindPostTypes.FETCH_ADD_REVIEW:
      return {
        ...state,
        addreviewdata: [],
        addreviewloader: true,
      };
    case FindPostTypes.SET_ADD_REVIEW:
      return {
        ...state,
        addreviewdata: action.payload,
        addreviewloader: false,
      };

    // FEtch reviews review
    case FindPostTypes.FETCH_REVIEW:
      return {
        ...state,
        reviewdata: [],
        reviewloader: true,
      };
    case FindPostTypes.SET_REVIEW:
      return {
        ...state,
        reviewdata: action.payload,
        reviewloader: false,
      };

    case FindPostTypes.FETCH_POSTS_BY_ID:
      return {
        ...state,
        postsById: [],
        postByIdLoader: true,
      };
    case FindPostTypes.SET_POSTS_BY_ID:
      return {
        ...state,
        postsById: action.payload,
        postByIdLoader: false,
      };

    case FindPostTypes.FETCH_SEND_POSTS_ENQUIRY:
      return {
        ...state,
        postsEnquiry: [],
        postsEnquiryLoader: true,
      };
    case FindPostTypes.SET_SEND_POSTS_ENQUIRY:
      return {
        ...state,
        postsEnquiry: action.payload,
        postsEnquiryLoader: false,
      };

    default:
      return state;
  }
};
