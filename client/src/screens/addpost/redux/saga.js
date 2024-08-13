import { postTypes } from "./types";
import { postAction } from "./action";
import { takeLatest, call, put } from "redux-saga/effects";
import Apis from "../../../api";
const fetchAddPostRed = function* fetchAddPostRed(action) {
  try {
    const payload = action.payload;

    const { data } = yield call(Apis.AddPost, payload);
    yield put(postAction.setAddPost(data || []));
  } catch (err) {
    yield put(
      postAction.setAddPost({
        ...err.response.data,
        statusCode: err.response.status,
      }),
    );
  }
};

export default function* postSaga() {
  yield takeLatest(postTypes.FETCH_ADD_POST, fetchAddPostRed);
}
