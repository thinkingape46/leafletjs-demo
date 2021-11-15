import { put, takeLatest } from "redux-saga/effects";
import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from "../reducers/counterReducer";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* increaseCount(action) {
  const { payload } = action;
  yield delay(1000);
  yield put(increase(payload));
}

function* decreaseCount(action) {
  const { payload } = action;
  yield delay(1000);
  yield put(decrease(payload));
}

function* counterSaga() {
  yield takeLatest(increaseAsync, increaseCount);
  yield takeLatest(decreaseAsync, decreaseCount);
}

export default counterSaga;
