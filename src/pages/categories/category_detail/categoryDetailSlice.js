import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryAPI from '../../../api/categoryAPI';

const initialState = {
  data: {},
  isLoading: false,
  message: '',
  error: null,
};
export const fetchCategoryBySlug = createAsyncThunk('/category/:slug', async (payload, thunkAPI) => {
  try {
    const response = await categoryAPI.getCategoryBySlug(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const categoryDetailSlice = createSlice({
  name: 'singer-detail',
  initialState,
  extraReducers: {
    [fetchCategoryBySlug.pending](state, action) {
      state.isLoading = true;
      state.data = {};
    },
    [fetchCategoryBySlug.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchCategoryBySlug.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default categoryDetailSlice.reducer;
