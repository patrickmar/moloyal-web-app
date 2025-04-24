import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import userReducer from "../features/users/userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import savingsReducer from "../features/savings/savingsSlice";
import withdrawalReducer from "../features/withdrawals/withdrawalSlice";
import paymentReducer from "../features/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    users: userReducer,
    savings: savingsReducer,
    withdrawal: withdrawalReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
