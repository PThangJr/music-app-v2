import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import songsAPI from '../../api/songAPI';
import storage from '../../utils/storage';
import { updateFavoriteSong } from '../favorites/favoriteSongSlice';

const initialState = {
  data: [],
  isLoading: false,
  message: '',
  error: null,
  album: {},
};
const currentSongStorage = storage('currentSong');
export const fetchSongs = createAsyncThunk('/songs', async (payload, thunkAPI) => {
  try {
    const response = await songsAPI.getSongs(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateSong = createAsyncThunk('/songs/:id/update', async (payload, thunkAPI) => {
  try {
    const response = await songsAPI.updateSong(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateViewsOfSong = createAsyncThunk('/songs/:id/views/update', async (payload, thunkAPI) => {
  try {
    const response = await songsAPI.updateViewsOfSong(payload);
    thunkAPI.dispatch(updateFavoriteSong(response.data));

    // thunkAPI.dispatch(setCurrentSong(response.data));
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const songSlice = createSlice({
  name: 'songs',
  initialState,
  extraReducers: {
    [fetchSongs.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.album = {};
    },
    [fetchSongs.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      if (action.payload.album) {
        state.album = action.payload.album;
      }
    },
    [fetchSongs.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchUpdateSong.pending](state, action) {
      state.isLoading = true;
    },
    [fetchUpdateSong.fulfilled](state, action) {
      state.isLoading = false;
      console.log(action.payload);
    },
    [fetchUpdateSong.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchUpdateViewsOfSong.pending](state, action) {
      // state.isLoading = true;
    },
    [fetchUpdateViewsOfSong.fulfilled](state, action) {
      const newState = { ...current(state) };
      const newData = [...newState.data].map((item) => {
        const result = { ...item };
        if (item._id === action.payload.data._id) {
          result.views = action.payload.data.views;
        }
        return result;
      });
      // const dataUpViews = newData.find(d => d._id === action.payload._id);
      // state.isLoading = false;
      currentSongStorage.set(action.payload.data);
      return {
        ...newState,
        data: newData,
      };
    },
    [fetchUpdateViewsOfSong.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default songSlice.reducer;
