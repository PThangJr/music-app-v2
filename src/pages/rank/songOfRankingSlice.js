import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import songsAPI from "../../api/songAPI";

const initData = [
  {
    _id: "",
    name: "",
    albums: [],
    singers: [],
    authors: [],
    categories: [],
    image: { public_id: "", secure_url: "" },
    audio: { public_id: "", secure_url: "" },
    status: "",
  },
];
const initialState = {
  data: initData,
  isLoading: false,
  message: "",
  error: null,
};
export const fetchSongOfRanking = createAsyncThunk(
  "/songs/rank",
  async (payload) => {
    try {
      const response = await songsAPI.getSongsOfRanking(payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const songSlice = createSlice({
  name: "songsByRanking",
  initialState,
  extraReducers: {
    [fetchSongOfRanking.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchSongOfRanking.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchSongOfRanking.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default songSlice.reducer;
