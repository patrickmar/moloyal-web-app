"use client";
import React, { ChangeEvent, Component, FormEvent, FocusEvent } from "react";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { connect } from "react-redux";
import ButtonLoader from "../components/Loader/ButtonLoader";
import { IProfile, IState } from "./interface";
import Private2 from "../components/Layouts/Private2";
import { AppDispatch, RootState } from "@/redux/store/store";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";
import externalService from "@/redux/features/externals/externalService";
import { toast } from "react-toastify";
import { createBankCard, reset } from "@/redux/features/payment/paymentSlice";

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  payment: state.payment,
});

type Props = {
  auth: any;
  payment: any;
  dispatch: AppDispatch;
};

class ProfilePage extends Component<Props, IState> {
  // const { user } = this.props.auth;
  //   const { firstName, lastName, serialNo } = user;
  //user = useAuth();
  country_code = this.props.auth?.user?.country_code;
  values = {
    firstName: this.props.auth?.user?.firstName || "",
    lastName: this.props.auth?.user?.lastName || "",
    email: this.props.auth?.user?.email || "",
    phoneNo: this.props.auth?.user?.phoneno || "",
    country: this.country_code || "NG",
    city: this.props.auth?.user?.city || "",
    address: this.props.auth?.user?.address || "",
  };
  pass = { currentPassword: "", newPassword: "", newConfirmPassword: "" };
  bank = { account_number: "", account_name: "", bank_code: "", bank_name: "" };
  private imageRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      mount: false,
      account: this.values,
      pass: this.pass,
      image: "",
      countries: [],
      banks: [],
      bank: this.bank,
      imageBool: false,
      errorMessage: "",
      disabled: true,
      avatar: "/imgs/profiles/img1.jpg",
    };
    this.imageRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    console.log(this.props);
    // console.log(this.user);
  }

  componentDidMount() {
    this.setState({ mount: true });
    // this.props.fetchProfile();
    // console.log(this.props.profile);
    this.getCountries();
    this.getBanks();
  }

  componentDidUpdate(): void {
    this.handleEffects();
  }

  handlePhoneNoChange = (value: E164Number) => {
    this.setState((prevState) => ({
      ...prevState,
      phoneno: value,
    }));
  };

  onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    // this.setState({ ...touched, [name]: true });
  };

  handleChange = (event: any) => {
    const img = event.target.files[0];
    const regex = /(\.jpg|\.jpeg|\.png)$/i;
    if (!regex.exec(img.name)) {
      this.setState({
        errorMessage: "Accepted file format is (.png, .jpg, .jpeg)",
      });
    } else if (img.size > 500000) {
      this.setState({ errorMessage: "Maximum of 500KB image size is allowed" });
    } else {
      this.setState({ errorMessage: "" });
      this.setFileToBase(img);
    }
  };

  //convert image to base 64
  setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ image: reader.result as string });
      this.setState({ imageBool: true });
    };
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      account: {
        ...this.state.account,
        [e.target.name]: e.target.value,
      },
    });
  };

  onBankChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "bank_code") {
      const bankName = this.getBankName(value);
      this.setState((prevState) => ({
        bank: {
          ...prevState.bank,
          bank_name: bankName,
          [name]: value,
        },
      }));
    } else {
      this.setState((prevState) => ({
        bank: {
          ...prevState.bank,
          [name]: value,
        },
      }));
    }
  };

  getBankName(bank_code: string) {
    const bank = this.state.banks.filter((b) => b.code === bank_code);
    console.log(bank);
    return bank[0].name;
  }

  handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(({ prevState }: any) => ({
      pass: { ...prevState, [e.target.name]: e.target.value },
    }));
  };

  savePassword = () => {
    console.log(this.state.pass);
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      ...this.state.account,
      image: this.state.imageBool ? this.state.image : "",
    };
    console.log(this.state.account);
    //dispatch(update(params))
  };

  ondeleteImage = () => {
    if (this.state.image !== "") {
      this.setState({ image: "" });
    }
  };

  getCountries = async () => {
    try {
      const response = await externalService.countries();
      if (response) {
        this.setState({ countries: response });
      }
    } catch (error) {
      toast.error("Error fetching Countries");
    }
  };

  getBanks = async () => {
    try {
      const response = await externalService.banks();
      if (response) {
        this.setState({ banks: response.data });
      }
    } catch (error) {
      toast.error("Error fetching Banks");
    }
  };

  async resolveAccount(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const { bank_code } = this.state.bank;
    if (value.length == 10 && bank_code !== "") {
      try {
        const response = await externalService.resolveAccount(value, bank_code);
        if (response.status == true) {
          this.setState({
            bank: {
              ...this.state.bank,
              account_name: response.data.account_name,
            },
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Could not resolve account name. Check parameters or try again."
        );
      }
    }
  }

  saveBankDetails = () => {
    const { bank } = this.state;
    console.log(bank);
    this.props.dispatch(createBankCard(bank));
  };

  handleEffects() {
    const { data, isLoading, isError, isSuccess, message } = this.props.payment;
    console.log(data);
    console.log(isLoading);

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    this.props.dispatch(reset());
  }

  uploadPicture() {}

  render() {
    const { firstName, lastName, email, phoneNo, country, city, address } =
      this.state.account;
    const { currentPassword, newPassword, newConfirmPassword } =
      this.state.pass;
    const { mount, image, avatar, disabled, errorMessage, countries, banks } =
      this.state;
    const { bank_code, account_number, account_name } = this.state.bank;
    const {
      data,
      response,
      isLoading,
      isFullLoading,
      isError,
      isSuccess,
      message,
    } = this.props.auth;
    return (
      <>
        {mount && (
          <Private2>
            <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
              <div className="col-span-full xl:col-auto">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                    <div className="relative mb-4 rounded-full w-30 h-30">
                      <img
                        className="mb-4 rounded-full w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                        src={image !== "" ? image : avatar}
                        alt="profile"
                      />
                      <label
                        htmlFor="profile"
                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary-700 text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                      >
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                            fill=""
                          />
                        </svg>
                        <input
                          id="profile"
                          name="file"
                          type="file"
                          ref={this.imageRef}
                          className="sr-only"
                          onChange={this.handleChange}
                        />
                      </label>
                    </div>
                    <small
                      className={`${
                        errorMessage === "" ? "hidden" : ""
                      } form-error`}
                    >
                      {errorMessage}
                    </small>
                    <div>
                      {/* <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                        Profile picture
                      </h3> */}

                      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        JPG or PNG. Max size of 500KB
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={this.uploadPicture}
                          // onClick={() => this.imageRef.current?.click()}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          {/* <input
                            id="upload"
                            name="file"
                            type="file"
                            ref={this.imageRef}
                            hidden
                            onChange={this.handleChange}
                          /> */}
                          <HiOutlineCloudUpload
                            size={20}
                            className="w-4 h-4 mr-2 -ml-1"
                          />
                          Upload
                        </button>
                        <button
                          type="button"
                          onClick={this.ondeleteImage}
                          className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    Plans
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Savings Plans
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={""}
                      onChange={(e) => this.onChange}
                      className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Select plans</option>
                      <option>Basic</option>
                      <option>Super Admin</option>
                      <option>Editor</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={""}
                      onChange={(e) => this.onChange}
                      className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Product Management</option>
                      <option>Software Development</option>
                      <option>Technical Consultant</option>
                      <option>Business Management</option>
                    </select>
                  </div>
                  {/* <div>
                                <button type='button'  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Role</button>
                            </div> */}
                </div>

                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    Bank Details
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="bank"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Bank
                    </label>
                    <select
                      id="bank"
                      name="bank_code"
                      value={bank_code}
                      onChange={this.onBankChange}
                      className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Select Bank</option>
                      {banks.length > 0 &&
                        banks.map((c, i) => (
                          <option key={i} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="account_number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Account Number
                    </label>
                    <input
                      type="number"
                      value={account_number}
                      onChange={(e) => {
                        this.onBankChange(e);
                        this.resolveAccount(e);
                      }}
                      name="account_number"
                      id="account_number"
                      className="profileInputClass"
                    />
                    {account_name != "" && (
                      <div className="mt-1 mb-4 text-sm text-success-700 dark:text-success-700">
                        {account_name}
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={this.saveBankDetails}
                      className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Save Account
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    Personal Information
                  </h3>
                  <form onSubmit={this.submit}>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="firstName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={this.onChange}
                          name="firstName"
                          id="firstName"
                          className="profileInputClass"
                          placeholder="John"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="lastName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={this.onChange}
                          name="lastName"
                          id="lastName"
                          className="profileInputClass"
                          placeholder="Doe"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={this.onChange}
                          name="email"
                          id="email"
                          className="profileInputClass"
                          placeholder="example@company.com"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phoneNo"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone Number
                        </label>
                        {/* <input
                          type="text"
                          value={phoneNo}
                          onChange={this.onChange}
                          name="phoneNo"
                          id="phoneNo"
                          readOnly
                          className="profileInputClass"
                          placeholder="2348022993329"
                        /> */}
                        <PhoneInput
                          defaultCountry={country as Country}
                          name="phoneno"
                          autoComplete="off"
                          id="phoneno"
                          onFocus={this.onFocus}
                          value={phoneNo}
                          onChange={this.handlePhoneNoChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          value={address}
                          name="address"
                          id="address"
                          onChange={this.onChange}
                          className="profileInputClass"
                          placeholder="25, Okeke Street"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="city"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          name="city"
                          id="city"
                          onChange={this.onChange}
                          className="profileInputClass"
                          placeholder="e.g. Ikoyi"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={country}
                          onChange={(e) => this.onChange}
                          className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option>Select Country</option>
                          {countries.length > 0 &&
                            countries.map((c, i) => (
                              <option key={i} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-full">
                        <button
                          type="submit"
                          disabled={disabled}
                          className={`${
                            isLoading || disabled ? "disabled" : " "
                          } text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg 
                                        text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        >
                          <ButtonLoader
                            isLoading={isLoading}
                            text="Save Profile"
                            loadingText="Processing"
                          />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* password  */}

                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold dark:text-white">
                    Password Information
                  </h3>
                  <form>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="current-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Current password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={this.handlePassword}
                          name="currentPassword"
                          required
                          autoComplete={"off"}
                          id="current-password"
                          className="profileInputClass"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          New password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={this.handlePassword}
                          name="newPassword"
                          autoComplete={"off"}
                          required
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="confirm-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          value={newConfirmPassword}
                          onChange={this.handlePassword}
                          name="newConfirmPassword"
                          autoComplete={"off"}
                          required
                          id="confirm-password"
                          className="profileInputClass"
                        />
                      </div>
                      <div className="col-span-6 sm:col-full">
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={this.savePassword}
                          className={` ${
                            isLoading || disabled ? "disabled" : " "
                          } text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        >
                          <ButtonLoader
                            isLoading={isLoading}
                            text="Save Password"
                            loadingText="Loading"
                          />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
export default connect(mapStateToProps)(ProfilePage);
