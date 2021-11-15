import { all, spawn, call } from "redux-saga/effects";
import counterSaga from "./counterSaga";

function* rootSaga() {
  const sagas = [counterSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

export default rootSaga;
