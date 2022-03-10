import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryAPI from "../../api/categoryAPI";
import songsAPI from "../../api/songAPI";

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  message: "",
  error: null,
};
export const fetchCategories = createAsyncThunk(
  "/categories",
  async (payload) => {
    try {
      const response = await categoryAPI.getCategories(payload);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const songSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    [fetchCategories.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchCategories.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchCategories.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default songSlice.reducer;
