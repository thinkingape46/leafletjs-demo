import { put, takeLatest } from "redux-saga/effects";
import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from "../reducers/counterReducer";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* increaseCount() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseCount() {
  yield delay(1000);
  yield put(decrease());
}

function* counterSaga() {
  yield takeLatest(increaseAsync, increaseCount);
  yield takeLatest(decreaseAsync, decreaseCount);
}

export default counterSaga;
