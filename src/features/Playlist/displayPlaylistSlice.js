import { createSlice } from "@reduxjs/toolkit";

const displayPlaylistSlice = createSlice({
  name: "displayPlaylist",
  initialState: null,
  reducers: {
    setDisplayPlaylist(state, action) {
      return action.payload;
    },
  },
});
export default displayPlaylistSlice.reducer;
export const { setDisplayPlaylist } = displayPlaylistSlice.actions;
