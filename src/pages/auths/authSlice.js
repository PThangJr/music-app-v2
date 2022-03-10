import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../api/authAPI";
import { toast } from "react-toastify";

const initialState = {
  user: {},
  isAuthenticate: false,
  isLoading: false,
  message: "",
  error: null,
};
export const fetchLogin = createAsyncThunk(
  "/auths/login",
  async (payload, thunkAPI) => {
    try {
      const response = await authAPI.login(payload);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchRegister = createAsyncThunk(
  "/auths/register",
  async (payload, thunkAPI) => {
    try {
      const response = await authAPI.register(payload);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    authenticate(state, action) {
      const user = JSON.parse(localStorage.getItem("user"));
      const accessToken = localStorage.getItem("accessToken");
      if (user && accessToken) {
        state.isAuthenticate = true;
        state.user = user;
      } else {
        state.isAuthenticate = false;
      }
    },
    logout(state, action) {
      state.isAuthenticate = false;
      state.user = {};
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: {
    [fetchLogin.pending](state, action) {
      state.isLoading = true;
      state.isAuthenticate = false;
    },
    [fetchLogin.fulfilled](state, action) {
      toast.success(`Đăng nhập thành công`, {
        autoClose: 1500,
      });
      state.isLoading = false;
      state.isAuthenticate = true;
      state.user = action.payload.user;
    },
    [fetchLogin.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchRegister.pending](state, action) {
      state.isLoading = true;
      state.isAuthenticate = false;
    },
    [fetchRegister.fulfilled](state, action) {
      toast.success(`Đăng ký thành công`, {
        autoClose: 1500,
      });
      state.isLoading = false;
      state.isAuthenticate = true;
      state.user = action.payload.user;
    },
    [fetchRegister.rejected](state, action) {
      state.isLoading = false;
      console.log(action.payload);
      state.errors = action.payload.data.errors;
    },
  },
});

export default authSlice.reducer;
export const { authenticate, logout } = authSlice.actions;
