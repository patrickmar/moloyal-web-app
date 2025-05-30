"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store/store";
import PropTypes from "prop-types";

type IProperty = {
  userData: object;
  openSidebar: boolean;
  onSidebarOpen(): any;
  onSidebarClose(): any;
};

const Header = (props: IProperty) => {
  const { userData, openSidebar, onSidebarOpen, onSidebarClose } = props;
  const dispatch = useDispatch<AppDispatch>();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <nav className="md:ml-64 fixed z-50 md:w-[calc(100vw-276px)] w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"></nav>
  );
};

Header.propTypes = {
  onSidebarOpen: PropTypes.func,
  onSidebarClose: PropTypes.func,
  openSidebar: PropTypes.bool.isRequired,
  userData: PropTypes.object,
};

export default Header;
