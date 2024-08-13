import { utilityTypes } from "./type";

export function selectUserCity(data) {
  return {
    type: utilityTypes.USER_SELECTED_CITY,
    payload: data,
  };
}

export function storeUserGeoAddress(data) {
  return {
    type: utilityTypes.USER_GEO_ADDRESS,
    payload: data,
  };
}

export function storeFilterData(data) {
  return {
    type: utilityTypes.STORE_FILTER_DATA,
    payload: data,
  };
}

export const UtilityAction = {
  selectUserCity,
  storeFilterData,
  storeUserGeoAddress,
};
