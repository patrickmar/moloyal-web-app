"use client";
import Private from "../components/Layouts/Private";
import Private2 from "../components/Layouts/Private2";
import { connect } from "react-redux";
import React, { Component } from "react";
import { fetch } from "@/redux/features/profile/profileSlice";
import { Greeting } from "../../utils/Functions";
import { BsEye, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { callToAction, data, data2, data3, trans } from "./constants";
import { NumericFormat } from "react-number-format";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import moment from "moment";
import Cta from "../components/Cards/Cta";
import Info from "../components/Cards/Info";
import { AppDispatch, RootState } from "@/redux/store/store";
import { IUser } from "@/utils/Interface";

type Props = {
  auth: any;
  dispatch: AppDispatch;
};

type State = {
  mount: boolean;
  show: boolean;
  board: any[];
  quickLinks: any[];
  quickLinks2: any[];
  transactions: any[];
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

class DashboardPage extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    console.log(this.props);
    this.state = {
      mount: false,
      show: false,
      board: data,
      quickLinks: data2,
      quickLinks2: data3,
      transactions: trans,
    };
  }

  componentDidMount() {
    this.setState({ mount: true });
  }

  render() {
    const { mount } = this.state;
    console.log(mount);
    const { user } = this.props.auth;
    console.log(user);
    const { firstName } = (user as IUser) || null;
    return (
      <>
        {mount && (
          <Private2>
            <div className="mb-5">
              <h1 className="my-2 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                <Greeting /> {firstName}
              </h1>
              <div className="grid gap-4 mt-4 md:grid-cols-2 xl:grid-cols-4">
                {this.state.board.map((item, i) => (
                  <div
                    key={i}
                    className={`${item.bg} bg-cardBg bg-blend-color-burn p-4 space-y-4 border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 sm:p-2 dark:bg-gray-800`}
                  >
                    <div className="flex items-center space-x-3 px-2 py-2">
                      {/* ${item.color} */}
                      <span
                        className={` bg-white inline-flex items-center justify-center w-12 h-12 mr-2 text-sm font-semibold text-gray-800  rounded-full dark:bg-gray-700 dark:text-gray-300`}
                      >
                        {item.icon}
                      </span>
                      <div className="space-y-0.5 font-medium text-white dark:text-white text-left">
                        <h3>{item.heading}</h3>
                        <small className="text-xs text-white dark:text-gray-400">
                          {item.subheading}
                        </small>
                      </div>
                    </div>
                    <div className="flex px-2 py-1">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white sm:text-xl dark:text-white">
                          {this.state.show ? (
                            <NumericFormat
                              value={Number(item.amount).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₦"}
                            />
                          ) : (
                            "****"
                          )}
                        </h2>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-white dark:text-white">
                        <button
                          type="button"
                          onClick={() =>
                            this.setState({ show: !this.state.show })
                          }
                        >
                          {this.state.show ? <BsEyeFill /> : <BsEyeSlashFill />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
                <div className="col-span-full xl:col-auto">
                  <Info name="Info" />
                  {callToAction.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 mb-4 space-y-6 bg-white border border-gray-100 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-4 dark:bg-gray-800"
                    >
                      <Cta
                        title={item.title}
                        text={item.text}
                        button={item.button}
                        href={item.href}
                        color={item.color}
                      />
                    </div>
                  ))}
                </div>
                <div className="col-span-2">
                  <div className="p-4 mb-4 lg:space-y-6 space bg-white border border-gray-100 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="px-4 py-2">
                      <h3 className="font-bold dark:text-white">Quick Links</h3>
                      <div className="my-5">
                        <ul className="grid grid-cols-6 gap-2">
                          {this.state.quickLinks2.map((item, i) => (
                            <li key={i}>
                              <Link
                                href={item.href}
                                className={`rounded-xl bg-grayScale-100 hover:bg-${item.color}-50 dark:bg-${item.color}-500 dark:hover:bg-${item.color}-800 p-2.5 flex flex-col items-center justify-center`}
                              >
                                <span
                                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-${item.color}-50 dark:bg-${item.color}-800 group-hover:bg-${item.color}-200 dark:group-hover:bg-${item.color}-700`}
                                >
                                  {item.icon(
                                    `w-5 h-5 text-${item.color}-600 dark:text-${item.color}-300`
                                  )}
                                </span>
                                <span
                                  className={`text-xs text-${item.color}-600 dark:text-${item.color}-300 font-medium`}
                                >
                                  {item.heading}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <div className="p-4 mb-4 space-y-6 bg-white border border-gray-100 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    



                  </div> */}

                  {/* Start block */}
                  <section className="p-4 mb-4 lg:space-y-6 space bg-white border border-gray-100 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="mx-auto max-w-screen-2xl">
                      <div className="bg-white dark:bg-gray-800 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between py-2 dark:border-gray-700">
                          <div className="w-full md:w-1/2">
                            <span className="font-semibold text-lg">
                              Last 5 Transactions
                            </span>
                          </div>
                          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Link
                              href={"/transaction-history"}
                              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-100 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              View All Transactions
                            </Link>
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                              <button
                                id="actionsDropdownButton"
                                data-dropdown-toggle="actionsDropdown"
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-100 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                              >
                                Actions
                                <MdKeyboardArrowDown className="-mr-1 ml-1.5 w-5 h-5" />
                              </button>
                              <div
                                id="actionsDropdown"
                                className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="actionsDropdownButton"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Mass Edit
                                    </a>
                                  </li>
                                </ul>
                                <div className="py-1">
                                  <a
                                    href="#"
                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                  >
                                    Delete all
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="p-4">
                                  <div className="flex items-center"></div>
                                </th>
                                <th scope="col" className="p-4">
                                  Transaction Ref.
                                </th>
                                <th scope="col" className="p-4">
                                  Type
                                </th>
                                <th scope="col" className="p-4">
                                  Amount
                                </th>
                                <th scope="col" className="p-4">
                                  Plan
                                </th>
                                <th scope="col" className="p-4">
                                  Date
                                </th>
                                <th scope="col" className="p-4">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.transactions.map((item, i) => (
                                <tr
                                  key={i}
                                  className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <td className="p-4 w-4">
                                    <div className="flex items-center">
                                      <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-${item.color}-100 dark:bg-${item.color}-800 group-hover:bg-${item.color}-200 dark:group-hover:bg-${item.color}-700`}
                                      >
                                        {item.icon(
                                          `w-5 h-5 text-${item.color}-600 dark:text-${item.color}-300`
                                        )}
                                      </span>
                                    </div>
                                  </td>
                                  <th
                                    scope="row"
                                    className=" px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    <div className="flex items-center mr-3">
                                      {item.ref}
                                    </div>
                                  </th>
                                  <td className="px-4 py-3">
                                    <span className="bg-blue-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                      {item.type}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <div
                                        className={`bg-${item.color}-700 h-4 w-4 rounded-full inline-block mr-2`}
                                      ></div>
                                      {item.amount}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Basic
                                  </td>
                                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {moment().format("YYYY-MM-DD hh:mm:ss")}
                                  </td>
                                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center space-x-4">
                                      <button
                                        type="button"
                                        className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-100 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                      >
                                        <BsEye />
                                        View
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* End block */}
                </div>
              </div>
            </div>
          </Private2>
        )}
      </>
    );
  }
}

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     signIn: () => dispatch(fetch()),
//   };
// };

export default connect(mapStateToProps)(DashboardPage);

//export default DashboardPage;
