import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  isError: false,
  isSuccess: false,
  isFullLoading: false,
  data: null,
  message: "",
};

// fetch all users
export const fetchAll = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await userService.fetchAll();
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isFullLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = action.payload.success || true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      });
  },
});
export const { reset } = userSlice.actions;

export default userSlice.reducer;
