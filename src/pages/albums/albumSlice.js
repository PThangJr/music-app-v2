import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import albumAPI from "../../api/albumAPI";
const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  albumGroup: {},
};
export const fetchAlbums = createAsyncThunk("/albums", async (payload) => {
  try {
    const response = await albumAPI.getAlbums(payload);
    return response;
  } catch (error) {
    return error;
  }
});
const albumSlice = createSlice({
  name: "albums",
  initialState,
  extraReducers: {
    [fetchAlbums.pending](state, action) {
      state.isLoading = true;
      state.data = [];
    },
    [fetchAlbums.fulfilled](state, action) {
      const { data, totalPages, totalItems, count } = action.payload;
      state.isLoading = false;
      state.data = data;
      state.totalPages = totalPages;
      state.totalItems = totalItems;
      state.count = count;
      if (action.payload.albumGroup) {
        state.albumGroup = action.payload.albumGroup;
      }
    },
    [fetchAlbums.rejected](state, action) {
      state.isLoading = false;
    },
  },
});

export default albumSlice.reducer;
