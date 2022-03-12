import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import searchAPI from '../../api/searchAPI';

const initialState = {
  songs: {
    data: [],
    totalPages: 1,
  },
  songsOfSingers: {
    data: [],
    totalPages: 1,
  },
  singers: {
    data: [],
    totalPages: 1,
  },
  albums: {
    data: [],
    totalPages: 1,
  },
  isLoading: false,
  message: '',
  error: null,
};
export const fetchSearch = createAsyncThunk('/search', async (payload, thunkAPI) => {
  try {
    const response = await searchAPI.search(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const searchSlice = createSlice({
  name: 'search',
  initialState,
  extraReducers: {
    [fetchSearch.pending](state, action) {
      state.isLoading = true;
    },
    [fetchSearch.fulfilled](state, action) {
      const { songs, songsOfSingers, albums, singers } = action.payload;
      state.isLoading = false;
      state.songs.data = songs.data;
      state.songs.totalPages = songs.totalPages;

      state.songsOfSingers.data = songsOfSingers.data;
      state.songsOfSingers.totalPages = songsOfSingers.totalPages;

      state.singers.data = singers.data;
      state.singers.totalPages = singers.totalPages;

      state.albums.data = albums.data;
      state.albums.totalPages = albums.totalPages;
    },
    [fetchSearch.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default searchSlice.reducer;
