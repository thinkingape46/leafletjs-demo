import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const couterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase(state) {
      state.counter = state.counter + 1;
    },
    decrease(state) {
      if (state.counter > 0) {
        state.counter = state.counter - 1;
      }
    },
    increaseAsync() {},
    decreaseAsync() {},
  },
});

const { actions, reducer } = couterSlice;

export const { increase, decrease, increaseAsync, decreaseAsync } = actions;

export default reducer;
