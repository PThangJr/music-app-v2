import { createSlice } from "@reduxjs/toolkit";

const initData = {
  _id: "",
  name: "",
  albums: [],
  singers: [],
  authors: [],
  categories: [],
  image: { public_id: "", secure_url: "" },
  audio: { public_id: "", secure_url: "" },
  status: "",
};
const initialState = {
  data: JSON.parse(localStorage.getItem("currentSong")) || initData,
  isLoading: false,
  message: "",
  error: null,
};

const currentSongSlice = createSlice({
  name: "current-song",
  initialState,
  reducers: {
    setCurrentSong(state, action) {
      state.data = action.payload;
      localStorage.setItem("currentSong", JSON.stringify(action.payload));
    },
  },
});
export default currentSongSlice.reducer;
export const { setCurrentSong } = currentSongSlice.actions;
