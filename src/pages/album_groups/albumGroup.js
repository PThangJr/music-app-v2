import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumGroupAPI from "../../api/albumGroup";
const initialState = {
  data: [
    {
      _id: "",
      name: "",
      slug: "",
    },
  ],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAlbumGroups = createAsyncThunk(
  "/album_groups",
  async (payload, thunkAPI) => {
    try {
      const response = await albumGroupAPI.getAlbumGroups(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const albumGroup = createSlice({
  name: "album_groups",
  initialState,
  extraReducers: {
    [fetchAlbumGroups.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.albumGroup = {};
    },
    [fetchAlbumGroups.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchAlbumGroups.rejected](state, action) {
      state.isLoading = false;
    },
  },
});

export default albumGroup.reducer;
