import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const couterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase(state, action) {
      const { payload } = action;
      state.counter = state.counter + (payload === undefined ? 1 : payload);
    },
    decrease(state, action) {
      const { payload } = action;
      const diff = payload === undefined ? 1 : payload;
      if (state.counter - diff >= 0) {
        state.counter = state.counter - diff;
      }
    },
    increaseAsync() {},
    decreaseAsync() {},
  },
});

const { actions, reducer } = couterSlice;

export const { increase, decrease, increaseAsync, decreaseAsync } = actions;

export default reducer;
