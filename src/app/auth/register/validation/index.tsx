import { isValidPhoneNumber } from "libphonenumber-js";
import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, "Please enter a valid first name")
    .max(30, "First name can not be more than 30 characters")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .required("Please enter your first name"),
  lastName: yup
    .string()
    .trim()
    .min(2, "Please enter a valid last name")
    .max(30, "Last name can not be more than 30 characters")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .required("Please enter your last name"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .min(5, "Email must be more than 5 characters")
    .max(30, "Email is Maximum of 30 characters")
    .required("Email is required."),
  phoneno: yup
    .string()
    .trim()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/,
      "Please enter a valid phone number."
    )
    .min(10, "Phone number should not be less than 10 digits")
    .max(16, "Phone number should not be more than 16 digits")
    .required("Please specify your phone number")
    .typeError("Phone no must be valid")
    .test((value, { path, createError }) => {
      if (!isValidPhoneNumber(String(value), "NG")) {
        return createError({ path, message: "Invalid phone number" });
      }
      return true;
    }),
  password: yup
    .string()
    .required("Please specify your password")
    .min(8, "Must have at least minimum length of 8")
    .max(16, "Characters can not be more than 16")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(/[a-z]+/, "Must have at least one lowercase character")
    .matches(/[A-Z]+/, "Must have at least one uppercase character")
    .matches(
      /[!#@$%^&*)(+=}{/:;><?'"|`~._-]/,
      "Must have at least one special character"
    )
    .matches(/\d+/, "Must have at least one number"),
  confirmPassword: yup
    .string()
    .min(8, "Must have at least minimum length of 8")
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords does not match"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});
