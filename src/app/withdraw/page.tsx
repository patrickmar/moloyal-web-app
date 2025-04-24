"use client";
import Breadcrumb from "@/app/components/Breadcrumbs";
import Image from "next/image";
import React, { ChangeEvent, Component, FormEvent, ReactNode } from "react";
import Private2 from "../components/Layouts/Private2";
import { AiOutlineBank } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaRegMessage } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { validationSchema } from "@/validations/withdrawValidation";
import { IBoolean, IString } from "@/utils/Interface";
import RightBar from "../components/Rightbar";
import PaymentReview from "../components/PaymentReview";

type Props = {};
type State = {
  mount: boolean;
  params: IParams;
  formErrors: IString;
  disabled: boolean;
  touched: IBoolean;
  showReview: boolean;
  paymentValue: Array<any>;
};

interface IParams {
  accountNo: string;
  plan: string;
  amount: number;
  reason: string;
  otherReason: string;
  [key: string]: string | number;
}
const initialValues = {
  accountNo: "",
  plan: "",
  amount: 0,
  reason: "",
  otherReason: "",
};

const initialErrors = {
  accountNo: "",
  plan: "",
  amount: "",
  reason: "",
  otherReason: "",
};

const initialTouched = {
  accountNo: false,
  plan: false,
  amount: false,
  reason: false,
  otherReason: false,
};

class WithdrawalPage extends Component<Props, State> {
  subscribedPlans = ["Starter", "Basic", "Premium", "Any Amount"];
  reasons = ["Pay Bills", "Offset debt", "Spend", "Shopping", "Others"];
  constructor(props: any) {
    super(props);
    this.state = {
      mount: false,
      params: initialValues,
      formErrors: initialErrors,
      touched: initialTouched,
      disabled: true,
      showReview: false,
      paymentValue: [],
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    this.setState({
      params: {
        ...this.state.params,
        [name]: type === "number" && name === "amount" ? Number(value) : value,
      },
    });
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ showReview: !this.state.showReview });
    console.log(this.state.params);
    const params = [
      {
        name: "Recipient Details",
        value: [
          {
            key: "Account Number",
            value: this.state.params.accountNo,
          },
          {
            key: "Account Name",
            value: "John Adepoju",
          },
        ],
      },
      {
        name: "Amount and Fee",
        value: [
          {
            key: "Amount",
            value: this.state.params.amount,
          },
          {
            key: "Fee",
            value: "0",
          },
        ],
      },
      {
        name: "Savings Plan",
        value: [
          {
            key: "Plan",
            value: this.state.params.plan,
          },
        ],
      },
    ];
    this.setState({ paymentValue: params });
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };

  onBlur = () => {
    this.validate();
  };

  validate = () => {
    const initialFormErrors = {};
    validationSchema
      .validate(this.state.params, { abortEarly: false })
      .then(() => {
        this.setState({ formErrors: initialFormErrors });
      })
      .catch((err: any) => {
        const errors: IString = initialFormErrors;
        err.inner.forEach((error: any) => {
          if (this.state.touched[error.path]) {
            errors[error.path] = error.message;
          }
        });
        this.setState({ formErrors: errors });
      });

    validationSchema
      .isValid(this.state.params)
      .then((valid) => this.setState({ disabled: !valid }));
  };

  onShowReview() {
    this.setState({ showReview: !this.state.showReview });
  }

  render(): ReactNode {
    const { accountNo, plan, amount, reason, otherReason } = this.state.params;
    const { mount, disabled, formErrors, touched, showReview } = this.state;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mx-auto max-w-270">
              <Breadcrumb pageName="Withdraw" />
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    {!showReview ? (
                      <>
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                            Withdraw to Account
                          </h3>
                        </div>
                        <div className="p-7">
                          <form action="/" onSubmit={this.submit}>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="inputLabelClass"
                                  htmlFor="plan"
                                >
                                  Savings Plan
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <AiOutlineBank className="w-5 h-5 text-greyIcon" />
                                  </span>
                                  <select
                                    id="plan"
                                    name="plan"
                                    value={plan}
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    className="selectClass"
                                  >
                                    <option value="">Select Plan</option>
                                    {this.subscribedPlans &&
                                      this.subscribedPlans.map((p, i) => (
                                        <option key={i} value={p}>
                                          {p}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <small className="form-error">
                                  {touched.plan && formErrors.plan}
                                </small>
                              </div>
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="inputLabelClass"
                                  htmlFor="accountNo"
                                >
                                  Recipient Account
                                </label>
                                <input
                                  className="inputClass2"
                                  type="number"
                                  name="accountNo"
                                  id="accountNo"
                                  value={accountNo}
                                  onChange={this.onChange}
                                  onFocus={this.onFocus}
                                  onBlur={this.onBlur}
                                />
                                <small className="form-error">
                                  {touched.accountNo && formErrors.accountNo}
                                </small>
                              </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="inputLabelClass"
                                  htmlFor="amount"
                                >
                                  Amount
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4.5 top-4">
                                    <TbCurrencyNaira className="w-5 h-5 text-greyIcon" />
                                  </span>
                                  <input
                                    className="w-full rounded border border-stroke bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-primary-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    value={
                                      typeof amount == "number"
                                        ? amount
                                        : Number(amount)
                                    }
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                  />
                                  <small className="form-error">
                                    {touched.amount && formErrors.amount}
                                  </small>
                                </div>
                              </div>
                              <div className="w-full sm:w-1/2">
                                <label
                                  className="inputLabelClass"
                                  htmlFor="reason"
                                >
                                  Reason
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                    <FaRegMessage className="w-5 h-5 text-greyIcon" />
                                  </span>
                                  <select
                                    id="reason"
                                    name="reason"
                                    value={reason}
                                    onChange={this.onChange}
                                    className="selectClass"
                                  >
                                    <option value="">Select Reason</option>
                                    {this.reasons &&
                                      this.reasons.map((reason, i) => (
                                        <option key={i} value={reason}>
                                          {reason}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <small className="form-error">
                                  {touched.reason && formErrors.reason}
                                </small>
                              </div>
                            </div>

                            {this.state.params.reason === "Others" && (
                              <div className="mb-5.5">
                                <label
                                  className="inputLabelClass"
                                  htmlFor="otherReason"
                                >
                                  Reason
                                </label>
                                <div className="relative">
                                  <span className="absolute left-4.5 top-4">
                                    <FiEdit className="w-5 h-5 text-greyIcon" />
                                  </span>

                                  <textarea
                                    className="w-full rounded border border-stroke bg-white py-3 pl-11.5 pr-4.5 text-black focus:border-primary-600 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary-600"
                                    name="otherReason"
                                    id="otherReason"
                                    rows={4}
                                    placeholder="Specify the reason here"
                                    value={otherReason}
                                    onChange={this.onChange}
                                    onBlur={this.onBlur}
                                  ></textarea>
                                </div>
                                <small className="form-error">
                                  {touched.otherReason &&
                                    formErrors.otherReason}
                                </small>
                              </div>
                            )}

                            <div className="flex justify-end gap-4.5 mt-5">
                              <button className="cancelButton" type="button">
                                Cancel
                              </button>
                              <button
                                disabled={disabled}
                                className={`${
                                  disabled ? "disabled" : ""
                                } submitButton`}
                                type="submit"
                              >
                                Continue
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    ) : (
                      <PaymentReview
                        type="Withdraw"
                        params={this.state.paymentValue}
                        data={this.state.params}
                        reviewOpen={showReview}
                        setShowReview={this.onShowReview.bind(this)}
                      />
                    )}
                  </div>
                </div>
                <RightBar />
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

export default WithdrawalPage;
