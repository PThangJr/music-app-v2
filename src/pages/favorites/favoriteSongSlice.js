import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import songsAPI from "../../api/songAPI";
import storage from "../../utils/storage";
const favoriteSongsStorage = storage("favoriteSongs");

const initData = [];
const initialState = {
  data: favoriteSongsStorage.get() || initData,
  isLoading: false,
  message: "",
  error: null,
};
export const fetchRefreshFavoriteSongs = createAsyncThunk(
  "/songs/favorites/refresh",
  async (payload, thunkAPI) => {
    try {
      // const response = await songsAPI.getSongOfFavorites(payload);
      // return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const favoriteSongs = createSlice({
  name: "favorite-songs",
  initialState,
  reducers: {
    addFavoriteSong(state, action) {
      console.log(current(state).data);
      const newState = [...current(state).data];
      const isExist = newState.find(
        (item) => item?._id === action.payload?._id
      );
      console.log("newState", newState);
      let result = [];
      if (isExist) {
        result = newState.filter((item) => item._id !== action.payload._id);
        toast.error(
          `💜 Xoá bài hát "${action.payload.name}" khỏi Bài hát yêu thích`,
          {
            autoClose: 2000,
          }
        );
      } else {
        result = [...newState, action.payload];
        toast.success(
          `💖 Thêm bài hát "${action.payload.name}" vào Bài hát yêu thích`,
          {
            autoClose: 2000,
          }
        );
      }
      console.log(result);
      favoriteSongsStorage.set(result);
      return { ...current(state), data: result };
    },
    updateFavoriteSong(state, action) {
      const newState = { ...current(state) };
      let newData = [...newState.data];
      newData = [...current(state).data].map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        } else {
          return item;
        }
      });
      favoriteSongsStorage.set(newData);
      return { ...newState, data: newData };
    },
  },
  extraReducers: {},
});
export default favoriteSongs.reducer;
export const { addFavoriteSong, updateFavoriteSong } = favoriteSongs.actions;
