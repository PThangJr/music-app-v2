import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import singerAPI from "../../../api/singerAPI";

const initData = {
  _id: "",
  name: "",
  avatar: {
    public_id: "",
    secure_url: "",
  },
  profile: "",
};
const initialState = {
  data: initData,
  isLoading: false,
  message: "",
  error: null,
};
export const fetchSingerBySlug = createAsyncThunk(
  "/singers/:slug",
  async (payload) => {
    try {
      const response = await singerAPI.getSingerBySlug(payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const singerDetail = createSlice({
  name: "singer-detail",
  initialState,
  extraReducers: {
    [fetchSingerBySlug.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchSingerBySlug.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchSingerBySlug.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default singerDetail.reducer;
