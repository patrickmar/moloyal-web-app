import { get, removeItem, store } from "@/utils/Storage";
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IVerifyOTP,
} from "@/utils/Interface";
import AuthConstants from "@/redux/config/authConstant";
import api from "@/utils/Https";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
// const user = get(AuthConstants());
// const token = user.token;

const register = async (data: IRegister) => {
  const response = await api.post("/customer/register", data);
  console.log(response.data);
  return response.data;
};

// Login user
const login = async (data: ILogin) => {
  const response = await api.post("/customer/login", data);
  if (response.data) {
    console.log(response.data);
    if (response.data.error == false) {
      const { data, expireAt, message, token } = response.data;
      const newResponse = { ...data, expireAt, message, token };
      console.log(newResponse);
      store(AuthConstants(), newResponse);
    }
  }
  return response.data;
};

// customer forgot Password
const forgotPassword = async (data: IForgotPassword) => {
  const response = await api.post("/customer/forgotpass", data);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

// reset password
const resetPassword = async (data: IResetPassword) => {
  const response = await api.post("/customer/resetpassword", data);
  if (response.data) {
    console.log(response.data.data);
  }
  return response.data;
};

// verify email or phone
const verifyIdentity = async (data: IVerifyOTP) => {
  const response = await api.post("/customer/verifycode", data);
  console.log(response.data);
  return response.data;
};

// get user profile
const profile = async () => {
  const response = await api.get("/api/users/profile");
  return response.data;
};

// Logout user
const logout = async () => {
  // const response = await api.get("/api/users/logout");
  // if (response.data) {
  // }
  removeItem(AuthConstants());
  const response = {
    error: false,
    message: "Logout Successful",
  };
  return response;
};

const authService = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyIdentity,
  profile,
  logout,
};

export default authService;
