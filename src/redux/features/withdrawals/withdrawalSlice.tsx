import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import withdrawalService from "./withdrawalService";
import { ISavings, IWithdrawal } from "@/utils/Interface";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFullLoading: false,
  message: "",
};

// create Savings
export const create = createAsyncThunk(
  "withdrawal/create",
  async (data: IWithdrawal, thunkAPI) => {
    try {
      const res = await withdrawalService.create(data);
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

// fetch Savings
export const fetch = createAsyncThunk(
  "withdrawal/fetch",
  async (_, thunkAPI) => {
    try {
      return await withdrawalService.fetch();
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

// fetch one savings
export const fetchOne = createAsyncThunk(
  "withdrawal/fetchOne",
  async (id: string, thunkAPI) => {
    try {
      return await withdrawalService.fetchOne(id);
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

export const withdrawalSlice = createSlice({
  name: "withdrawal",
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
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      })
      .addCase(fetch.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      })
      .addCase(fetchOne.pending, (state) => {
        state.isFullLoading = true;
      })
      .addCase(fetchOne.fulfilled, (state, action) => {
        state.isFullLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(fetchOne.rejected, (state, action) => {
        state.isFullLoading = false;
        state.isError = true;
        state.message = String(action.payload);
        state.data = null;
      });
  },
});
export const { reset } = withdrawalSlice.actions;

export default withdrawalSlice.reducer;
