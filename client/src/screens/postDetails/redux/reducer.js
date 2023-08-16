import { FindSchoolTypes } from "./type";

export const FindSchoolScreenReducer = (state = [], action) => {
  switch (action.type) {
    case FindSchoolTypes.FETCH_FIND_SCHOOLS:
      return {
        ...state,
        searchLoader: true,
        searchSchoolData: [],
      };
    case FindSchoolTypes.SET_FIND_SCHOOLS:
      return {
        ...state,
        searchLoader: false,
        searchSchoolData: action.payload,
      };

    // for saved school
    case FindSchoolTypes.FETCH_SAVED_SCHOOLS:
      return {
        ...state,
        savedSchoolLoader: true,
        savedSchool: [],
      };
    case FindSchoolTypes.SET_SAVED_SCHOOLS:
      return {
        ...state,
        savedSchoolLoader: false,
        savedSchool: action.payload,
      };

    // for add to fav  school
    case FindSchoolTypes.FETCH_ADDSAVED_SCHOOLS:
      return {
        ...state,
        addSavedSchoolLoader: true,
        addSavedSchool: [],
      };
    case FindSchoolTypes.SET_ADDSAVED_SCHOOLS:
      return {
        ...state,
        addSavedSchoolLoader: false,
        addSavedSchool: action.payload,
      };

    //open close review modal
    case FindSchoolTypes.OPEN_REVIEW_MODAL:
      return {
        ...state,
        reviewModal: true,
      };
    case FindSchoolTypes.CLOSE_REVIEW_MODAL:
      return {
        ...state,
        reviewModal: false,
      };

    // add review
    case FindSchoolTypes.FETCH_ADD_REVIEW:
      return {
        ...state,
        addreviewdata: [],
        addreviewloader: true,
      };
    case FindSchoolTypes.SET_ADD_REVIEW:
      return {
        ...state,
        addreviewdata: action.payload,
        addreviewloader: false,
      };

    // FEtch reviews review
    case FindSchoolTypes.FETCH_REVIEW:
      return {
        ...state,
        reviewdata: [],
        reviewloader: true,
      };
    case FindSchoolTypes.SET_REVIEW:
      return {
        ...state,
        reviewdata: action.payload,
        reviewloader: false,
      };

    case FindSchoolTypes.FETCH_SCHOOL_BY_ID:
      return {
        ...state,
        schoolsById: [],
        schoolByIdLoader: true,
      };
    case FindSchoolTypes.SET_SCHOOL_BY_ID:
      return {
        ...state,
        schoolsById: action.payload,
        schoolByIdLoader: false,
      };

    case FindSchoolTypes.FETCH_SEND_SCHOOL_ENQUIRY:
      return {
        ...state,
        schoolsEnquiry: [],
        schoolsEnquiryLoader: true,
      };
    case FindSchoolTypes.SET_SEND_SCHOOL_ENQUIRY:
      return {
        ...state,
        schoolsEnquiry: action.payload,
        schoolsEnquiryLoader: false,
      };

    default:
      return state;
  }
};
