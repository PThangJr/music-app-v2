import { createSlice } from "@reduxjs/toolkit";

const timeListenSlice = createSlice({
  name: "time-listen",
  initialState: 0,
  reducers: {
    setTimeListen(state, action) {
      if (action.payload === 0) {
        return action.payload;
      } else {
        return state + 1;
      }
    },
  },
});
export default timeListenSlice.reducer;
export const { setTimeListen } = timeListenSlice.actions;
