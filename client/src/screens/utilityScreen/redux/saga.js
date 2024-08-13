import { takeLatest, call, put } from "redux-saga/effects";
import { utilityTypes } from "./type";
import { UtilityAction } from "./action";

// const selectUserCityByLocation = function* selectUserCityByLocation(action) {
//   console.log(action.payload);
//   try {
//     const payload = action.payload;
//     yield put(UtilityAction.UserlocationSet(payload));
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export default function* utilitySasga() {
  // yield takeLatest(
  //   utilityTypes.USER_SELECTED_LOCATION_REQ,
  //   selectUserCityByLocation
  // );
}
