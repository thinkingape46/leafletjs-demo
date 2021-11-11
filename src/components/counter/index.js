import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { increase, decrease } from "../../reducers/counterReducer";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((store) => store.counter.counter);

  return (
    <>
      <button onClick={() => dispatch(increase())}>Raise Count</button>
      <button onClick={() => dispatch(decrease())}>Lower Count</button>
      <p>{counter}</p>
    </>
  );
};

export default Counter;
