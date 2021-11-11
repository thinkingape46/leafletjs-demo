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
      state.counter = state.counter - 1;
    },
  },
});

const { actions, reducer } = couterSlice;

export const { increase, decrease } = actions;

export default reducer;
