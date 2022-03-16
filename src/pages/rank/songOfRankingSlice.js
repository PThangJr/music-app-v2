import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import songsAPI from '../../api/songAPI';

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  isLoadingMore: false,
  message: '',
  error: null,
  totalPages: 1,
};
export const fetchSongOfRanking = createAsyncThunk('/songs/rank', async (payload, thunkAPI) => {
  try {
    const response = await songsAPI.getSongsOfRanking(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchMoreSongsOfRanking = createAsyncThunk('/songs/rank/more', async (payload, thunkAPI) => {
  try {
    const response = await songsAPI.getSongsOfRanking(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const songSlice = createSlice({
  name: 'songsByRanking',
  initialState,
  extraReducers: {
    [fetchSongOfRanking.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
      state.totalPages = 1;
    },
    [fetchSongOfRanking.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
    },
    [fetchSongOfRanking.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchMoreSongsOfRanking.pending](state, action) {
      state.isLoadingMore = true;
    },
    [fetchMoreSongsOfRanking.fulfilled](state, action) {
      state.data = state.data.concat(action.payload.data);
      state.isLoadingMore = false;
      state.totalPages = action.payload.totalPages;
    },
    [fetchMoreSongsOfRanking.rejected](state, action) {
      state.isLoadingMore = false;
      state.isLoading = false;
    },
  },
});
export default songSlice.reducer;
