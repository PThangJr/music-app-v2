import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import singerAPI from "../../api/singerAPI";

const initData = [
  {
    _id: "",
    name: "",
    avatar: {
      public_id: "",
      secure_url: "",
    },
    profile: "",
  },
];
const initialState = {
  data: initData,
  isLoading: false,
  message: "",
  error: null,
  totalPages: 1,
};
export const fetchSingers = createAsyncThunk("/singers", async (payload) => {
  try {
    const response = await singerAPI.getSingers(payload);
    return response;
  } catch (error) {
    return error;
  }
});

const singerSlice = createSlice({
  name: "singers",
  initialState,
  extraReducers: {
    [fetchSingers.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchSingers.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },
    [fetchSingers.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default singerSlice.reducer;
