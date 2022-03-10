import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumAPI from "../../api/albumAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAlbumsOfAlbumGroups = createAsyncThunk(
  "/albums-of-album-groups",
  async (payload, thunkAPI) => {
    try {
      const response = albumAPI.getAlbumsOfAlbumGroups(payload);
      return response;
    } catch (error) {
      console.log("Fetch Albums has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const albumsOfAlbumGroupsSlice = createSlice({
  name: "albums-of-album-groups",
  initialState,
  extraReducers: {
    [fetchAlbumsOfAlbumGroups.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
      state.data = [];
    },
    [fetchAlbumsOfAlbumGroups.fulfilled](state, action) {
      state.data = action.payload.data;
      state.isLoading = false;
    },
    [fetchAlbumsOfAlbumGroups.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default albumsOfAlbumGroupsSlice.reducer;
