import { createSlice, current } from "@reduxjs/toolkit";

const displayVideoSlice = createSlice({
  name: "displayVideo",
  initialState: null,
  reducers: {
    setDisplayVideo(state, action) {
      return action.payload;
    },
    toggleDisplayVideo(state, action) {
      return !state;
    },
  },
});
export default displayVideoSlice.reducer;
export const { setDisplayVideo, toggleDisplayVideo } =
  displayVideoSlice.actions;
