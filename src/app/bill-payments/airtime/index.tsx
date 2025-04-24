import React, {
  ChangeEvent,
  Component,
  FormEvent,
  MouseEventHandler,
} from "react";
import { connect } from "react-redux";
import Image from "next/image";
import { TbCurrencyNaira } from "react-icons/tb";
import Select from "react-select";
import { IBoolean, IString } from "@/utils/Interface";
import parsePhoneNumberFromString from "libphonenumber-js";
import { airtimeValidationSchema } from "@/validations/billPaymentValidation";
import PaymentReview from "@/app/components/PaymentReview";

interface IAirtimeProps {
  options: any[];
  showReview: boolean;
  setShowReview: (open: boolean) => void;
}

interface IState {
  selectedNetwork: IString;
  params: IParams;
  formErrors: IString;
  touched: IBoolean;
  disabled: boolean;
  PaymentValue: Array<any>;
}

interface IParams {
  phoneNo: string;
  network: string;
  amount: number;
  [key: string]: string | number;
}

class Airtime extends Component<IAirtimeProps, IState> {
  initialValues = { phoneNo: "", network: "", amount: 0 };
  initialNetwork = { icon: "", label: "", value: "" };
  initialTouched = { phoneNo: false, network: false, amount: false };
  constructor(props: IAirtimeProps) {
    super(props);
    this.state = {
      selectedNetwork: this.initialNetwork,
      params: this.initialValues,
      formErrors: {},
      touched: this.initialTouched,
      disabled: true,
      PaymentValue: [],
    };
  }

  componentDidUpdate(
    prevProps: Readonly<IAirtimeProps>,
    prevState: Readonly<IState>
  ): void {
    if (prevState.params !== this.state.params) {
      this.validate();
    }
  }

  validate = () => {
    const initialFormErrors = {};
    airtimeValidationSchema
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

    airtimeValidationSchema
      .isValid(this.state.params)
      .then((valid) => this.setState({ disabled: !valid }));
  };

  handleChange = (selectedNetwork: any) => {
    this.setState({ selectedNetwork }, () => {
      this.onBlur();
    });
    this.setState({
      params: { ...this.state.params, network: selectedNetwork.value },
    });
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      params: {
        ...this.state.params,
        [e.target.name]: e.target.value,
      },
    });
  };

  submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.params);
    console.log(
      JSON.stringify(
        parsePhoneNumberFromString(this.state.params.phoneNo, "NG"),
        null,
        2
      )
    );
    this.props.setShowReview(!this.props.showReview);
    const params = [
      {
        name: "Airtime Details",
        value: [
          {
            key: "Mobile Number",
            value: this.state.params.phoneNo,
          },
          {
            key: "Service Provider",
            value: this.state.params.network,
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
    ];
    this.setState({ PaymentValue: params });
  };

  onFocus = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    const { id } = e.target;
    this.setState({
      touched: { ...this.state.touched, [name === "" ? id : name]: true },
    });
  };

  onBlur = () => {
    this.validate();
  };

  public render() {
    const { selectedNetwork, formErrors, touched, disabled } = this.state;
    const { phoneNo, amount, network } = this.state.params;
    const { showReview } = this.props;
    return (
      <>
        {!showReview ? (
          <div className="p-7">
            <form action="/" onSubmit={this.submit}>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label className="inputLabelClass" htmlFor="network">
                    Service Provider
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <Select
                      classNamePrefix="react-select"
                      isSearchable={false}
                      value={selectedNetwork}
                      id="network"
                      name="network"
                      placeholder={"Select Provider"}
                      inputId="network"
                      instanceId="airtime"
                      onChange={this.handleChange}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      options={this.props.options}
                      formatOptionLabel={(item: any) => (
                        <div className="flex gap-1">
                          {item.icon !== "" && (
                            <div className="">
                              <Image
                                src={item.icon}
                                width={30}
                                height={30}
                                alt="network"
                              />
                            </div>
                          )}
                          <span className="dark:text-white">{item.label}</span>
                        </div>
                      )}
                    />
                    <small className="form-error">
                      {touched.network && formErrors.network}
                    </small>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="inputLabelClass" htmlFor="phoneNo">
                    Recipient Phone Number
                  </label>
                  <input
                    className="inputClass2"
                    type="number"
                    name="phoneNo"
                    id="phoneNo"
                    value={phoneNo}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                  />
                  <small className="form-error">
                    {touched.phoneNo && formErrors.phoneNo}
                  </small>
                </div>
              </div>

              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label className="inputLabelClass" htmlFor="amount">
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
                      value={amount}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                    />
                    <small className="form-error">
                      {touched.amount && formErrors.amount}
                    </small>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4.5 mt-5">
                <button className="cancelButton" type="button">
                  Cancel
                </button>
                <button
                  disabled={disabled}
                  className={`${disabled ? "disabled" : ""} submitButton`}
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <PaymentReview
              type="airtime"
              params={this.state.PaymentValue}
              data={this.state.params}
              reviewOpen={showReview}
              setShowReview={this.props.setShowReview}
            />
          </div>
        )}
      </>
    );
  }
}

const mapState2Props = (state: any) => {
  return {};
};

// export default connect(mapState2Props)(Airtime);

export default Airtime;
