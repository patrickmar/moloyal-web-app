import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "./profileService";
import { ICustomer } from "@/app/Profile/interface";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFullLoading: false,
  data: null,
  message: "",
};

// profile user
export const fetch = createAsyncThunk("profile/fetch", async (_, thunkAPI) => {
  try {
    const res = await profileService.fetch();
    return res;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update Profile
export const update = createAsyncThunk(
  "profile/update",
  async (data: ICustomer, thunkAPI) => {
    try {
      const res = await profileService.update(data);
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

// update customer profile Profile
export const updatePicture = createAsyncThunk(
  "profile/updatePicture",
  async (data: { file: File }, thunkAPI) => {
    try {
      const res = await profileService.updatePicture(data);
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isFullLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = action.payload.success || true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success || true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      })
      .addCase(updatePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.success || true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(updatePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      });
  },
});
export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
