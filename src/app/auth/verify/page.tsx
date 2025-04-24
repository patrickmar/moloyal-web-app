"use client";
import React, {
  ChangeEvent,
  Component,
  FormEvent,
  FormEventHandler,
} from "react";
import OtpInput from "react-otp-input";
import Countdown, { CountdownApi } from "react-countdown";
import Public from "@/app/components/Layouts/Public";
import ButtonLoader from "@/app/components/Loader/ButtonLoader";
import { connect } from "react-redux";
import { reset, verifyOTP } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/redux/store/store";
import { withRouter } from "@/app/components/WithRouter";

type Props = {
  auth: any;
  dispatch: AppDispatch;
  searchParams: any;
  router: any;
};

interface IState {
  numInputs: number;
  otp: string;
  identity: string | null;
  complete: boolean;
  date: number;
  disabled: boolean;
  mount: boolean;
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

class VerifyEmailPage extends Component<Props, IState> {
  countdownApi: CountdownApi | null = null;
  countdownInterval = 0;

  constructor(props: any) {
    super(props);
    console.log(this.props);
    this.state = {
      numInputs: 6,
      mount: false,
      identity: this.props?.searchParams?.identity
        ? this.props?.searchParams?.identity
        : "",
      otp: "",
      complete: false,
      disabled: true,
      date: Date.now() + Number(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER), // 30 mins
    };
  }

  onSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(this.state);
    const { otp, identity } = this.state;
    this.props.dispatch(verifyOTP({ code: otp, email: identity! }));
  };

  handleChange = (otp: any) => {
    this.setState({ otp });
  };

  resendOTP = (e: FormEvent) => {
    e.preventDefault();
    console.log("resend");
    this.stop();
  };

  componentDidMount() {
    this.start();
    this.setState({ mount: true });
  }

  componentWillUnmount(): void {
    this.clearInterval();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<IState>
  ): void {
    if (prevState.otp !== this.state.otp) {
      if (this.state.otp.length == this.state.numInputs) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    }
    this.handleEffects();
  }

  handleEffects() {
    const { isError, isSuccess, message, response } = this.props.auth;

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    if (response == 1) {
      const { identity } = this.state;
      this.props.router.push(`/auth/login?identity=${identity}`);
      //redirect(`/auth/login?identity=${identity}`);
    }

    this.props.dispatch(reset());
  }

  start(): void {
    this.countdownInterval = window.setInterval(() => {
      if (this.state.date <= 0) {
        return this.clearInterval();
      }
      this.setState(({ date }) => ({ date: date - 1000 }));
    }, 1000);
  }

  clearInterval(): void {
    window.clearInterval(this.countdownInterval);
  }

  handleStartClick = (): void => {
    this.countdownApi && this.countdownApi.start();
  };

  handlePauseClick = (): void => {
    this.countdownApi && this.countdownApi.pause();
  };

  handleResetClick = (): void => {
    this.setState({
      date: Date.now() + Number(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER),
    });
  };

  handleUpdate = (): void => {
    this.forceUpdate();
  };

  onComplete = (): void => {
    this.setState({ complete: true });
  };

  setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  isPaused(): boolean {
    return !!(this.countdownApi && this.countdownApi.isPaused());
  }

  isCompleted(): boolean {
    return !!(this.countdownApi && this.countdownApi.isCompleted());
  }

  stop(): void {
    this.countdownApi?.stop();
  }

  render() {
    const { isLoading } = this.props.auth;
    const { disabled, date, otp, numInputs, mount } = this.state;
    return (
      <>
        {mount && (
          <Public>
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify your email
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={this.onSubmit}
            >
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                >
                  {
                    "We've sent an OTP to your registered email address to complete this process."
                  }
                </label>

                <OtpInput
                  value={otp}
                  renderInput={(props) => <input {...props} />}
                  onChange={(e) => this.handleChange(e)}
                  numInputs={numInputs}
                  inputType={"password"}
                  shouldAutoFocus={true}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 0.5rem 0.5rem 0",
                    fontSize: "2rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                  }}
                  containerStyle={{
                    justifyContent: "center",
                  }}

                  //separator={<span> &nbsp;&nbsp;&nbsp; </span>}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Code Expires in{" "}
                    {date > 0 && (
                      <Countdown
                        daysInHours={true}
                        key={date}
                        ref={this.setRef}
                        date={date}
                        onMount={this.handleUpdate}
                        onStart={this.handleUpdate}
                        onComplete={this.onComplete}
                        autoStart={true}
                      />
                    )}
                  </span>
                </div>
                {this.isCompleted() && (
                  <>
                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      {"Didn't receive the OTP?  "}
                    </span>
                    <button
                      type="button"
                      className="text-xs text-gray-500 dark:text-gray-300"
                      onClick={(e) => this.resendOTP(e)}
                    >
                      Resend
                    </button>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={disabled}
                className={`${
                  isLoading || disabled ? "disabled" : " "
                } authSubmitButton`}
              >
                <ButtonLoader
                  isLoading={isLoading}
                  text="Verify"
                  loadingText="Loading"
                />
              </button>
            </form>
          </Public>
        )}
        {/* <Countdown
                    key={this.state.date}
                    ref={this.setRef}
                    date={this.state.date}
                    onMount={this.handleUpdate}
                    onStart={this.handleUpdate}
                    onPause={this.handleUpdate}
                    onComplete={this.handleUpdate}
                    autoStart={true}
                /> */}
        {/* <div>
                    <button
                        type="button"
                        onClick={this.handleStartClick}
                        disabled={!this.isPaused() || this.isCompleted()}
                    >
                        Start
                    </button>{' '}
                    <button
                        type="button"
                        onClick={this.handlePauseClick}
                        disabled={this.isPaused() || this.isCompleted()}
                    >
                        Pause
                    </button>{' '}
                    <button type="button" onClick={this.handleResetClick}>
                        Reset
                    </button>
                </div> */}
      </>
    );
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage)

// export default VerifyEmailPage;
const ConnectedVerifyEmailPage = connect(mapStateToProps)(
  withRouter(VerifyEmailPage)
);
export default ConnectedVerifyEmailPage;
