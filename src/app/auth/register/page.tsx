"use client";
import Public from "@/app/components/Layouts/Public";
import { strengthColor, strengthIndicator } from "@/utils/PasswordStrength";
import Link from "next/link";
import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IBoolean, IRegister, IString } from "@/utils/Interface";
import ButtonLoader from "@/app/components/Loader/ButtonLoader";
import { AppDispatch, useAppSelector } from "@/redux/store/store";
import { redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { register, reset } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";
import { validationSchema } from "./validation";

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneno: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };
  const [formData, setFormData] = useState<IRegister>(initialValues);
  const [errors, setErrors] = useState<IRegister>(initialValues);
  const [type, setType] = useState<IString>({
    type1: "password",
    type2: "password",
  });
  const [level, setLevel] = useState({
    label: "",
    color: "",
    bgColor: "",
    percent: 0,
  });
  const [touched, setTouched] = useState<IBoolean>({
    firstName: false,
    lastName: false,
    email: false,
    phoneno: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });
  const [disabled, setDisabled] = useState(true);
  const {
    firstName,
    lastName,
    email,
    phoneno,
    password,
    confirmPassword,
    terms,
  } = formData;
  const { type1, type2 } = type;
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const setPassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const changePasswordType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.currentTarget;
    setType((prevState) => ({
      ...prevState,
      [button.name]: type[button.name] === "password" ? "text" : "password",
    }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "terms" ? e.target.checked : e.target.value,
    }));
  };

  const handleChange = (value: E164Number) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneno: value,
    }));
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(formData);
    if (!terms) {
      toast.error("Please accept the terms and conditions");
    } else if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      const userData = {
        firstname: firstName,
        lastname: lastName,
        firstName,
        lastName,
        email,
        phoneno,
        password,
        confirmPassword,
        terms,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    setPassword("");
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      router.replace(`/auth/verify?identity=${email}`, {
        scroll: false,
      });
      //router.push('/auth/verify', { scroll: false })
      //redirect("/auth/verify");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const validate = () => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors(initialValues);
      })
      .catch((err: any) => {
        const errs: IRegister = initialValues;
        err.inner.forEach((error: any) => {
          if (touched[error.path]) errs[error.path] = error.message;
        });
        setErrors(errs);
      });

    validationSchema.isValid(formData).then((valid) => setDisabled(!valid));
  };

  const onBlur = () => {
    validate();
  };

  return (
    <Public>
      <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create an account
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              id="firstName"
              onFocus={onFocus}
              value={firstName}
              onChange={onChange}
              onBlur={onBlur}
              className="inputClass"
            />
            {/* <small className="form-error">{errors && errors.firstName}</small> */}
            <small className="form-error">
              {touched.firstName && errors.firstName}
            </small>
          </div>
          <div className="w-full">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              autoComplete="off"
              id="lastName"
              onFocus={onFocus}
              value={lastName}
              onChange={onChange}
              onBlur={onBlur}
              className="inputClass"
            />
            <small className="form-error">
              {touched.lastName && errors.lastName}
            </small>
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              onFocus={onFocus}
              value={email}
              onChange={onChange}
              onBlur={onBlur}
              className="inputClass"
            />
            <small className="form-error">
              {touched.email && errors.email}
            </small>
          </div>

          <div className="w-full">
            <label
              htmlFor="phoneno"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <PhoneInput
              defaultCountry="NG"
              name="phoneno"
              autoComplete="off"
              id="phoneno"
              onFocus={onFocus}
              value={phoneno}
              onChange={handleChange}
            />
            {/* <input type="text" name="phoneno" autoComplete='off' id="phoneno" onFocus={onFocus} value={phoneno} onChange={onChange} onBlur={onBlur} className="inputClass" /> */}
            <small className="form-error">
              {touched.phoneno && errors.phoneno}
            </small>
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={type1}
                autoComplete="new-password"
                onFocus={onFocus}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  onChange(e);
                  setPassword(e.target.value);
                }}
                className="inputClass"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <button type="button" name="type1" onClick={changePasswordType}>
                  {type1 === "password" ? (
                    <FaEyeSlash className="dark:text-white" />
                  ) : (
                    <FaEye className="dark:text-white" />
                  )}
                </button>
              </div>
            </div>
            {password.length > 0 && (
              <div>
                <div className="flex justify-between my-1">
                  <span
                    className={`${level?.color} text-sm font-medium  dark:text-white`}
                  >
                    {level?.label}
                  </span>
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {level?.percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`${level?.bgColor} w-[${level?.percent}%] h-2.5 rounded-full`}
                  ></div>
                </div>
              </div>
            )}
            <small className="form-error">
              {touched.password && errors.password}
            </small>
          </div>
          <div className="">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={type2}
                autoComplete="new-password"
                name="confirmPassword"
                id="confirm-password"
                onFocus={onFocus}
                value={confirmPassword}
                onChange={onChange}
                onBlur={onBlur}
                className="inputClass"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <button type="button" name="type2" onClick={changePasswordType}>
                  {type2 === "password" ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <small className="form-error">
              {touched.confirmPassword && errors.confirmPassword}
            </small>
          </div>
          {/* <div> */}
          <div className="flex items-start sm:col-span-2">
            <div className="flex items-center h-5">
              <input
                name="terms"
                checked={terms}
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                id="terms"
                type="checkbox"
                className="checkboxClass"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="/terms"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>
          <small className="text-xs text-red-600 dark:text-red-600">
            {touched.terms && errors.terms}
          </small>
          {/* </div> */}
          <button
            type="submit"
            disabled={disabled}
            className={`${
              isLoading || disabled ? "disabled" : " "
            } sm:col-span-2 authSubmitButton`}
          >
            <ButtonLoader
              isLoading={isLoading}
              text="Register"
              loadingText="Loading"
            />
          </button>
          <p className="sm:col-span-2 text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </Public>
  );
};

export default Register;
