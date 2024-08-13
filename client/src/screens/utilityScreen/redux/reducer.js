import { utilityTypes } from "./type";
const initialState = {
  loading: false,
  error: undefined,
};
export const utilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case utilityTypes.USER_SELECTED_CITY:
      return {
        ...state,
        slectedCity: action.payload,
      };
    case utilityTypes.USER_GEO_ADDRESS:
      return {
        ...state,
        userGeoAddress: action.payload,
      };
    case utilityTypes.STORE_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    default:
      return state;
  }
};
