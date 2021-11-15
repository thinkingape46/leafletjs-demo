import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from "../../reducers/counterReducer";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((store) => store.counter.counter);

  return (
    <>
      <button onClick={() => dispatch(increase())}>Raise Count</button>
      <button onClick={() => dispatch(decrease())}>Lower Count</button>
      <button onClick={() => dispatch(increaseAsync())}>
        Raise Count Async
      </button>
      <button onClick={() => dispatch(decreaseAsync())}>
        Lower Count Async
      </button>
      <p>{counter}</p>
    </>
  );
};

export default Counter;
