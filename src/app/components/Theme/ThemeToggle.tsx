"use client";
import React, { useState, useEffect } from "react";
import { get, removeItem, store } from "../../../utils/Storage";
import { Dropdown, Tooltip } from "flowbite-react";
import { BsBrightnessHigh, BsMoon, BsMoonStars } from "react-icons/bs";

const ThemeToggle = () => {
  const storedTheme = get("theme");
  const [theme, setTheme] = useState(storedTheme ? storedTheme : "system");
  const [isMounted, setIsMounted] = useState(false);
  //const element =  typeof window !== "undefined" ? document.documentElement: null;
  const element = isMounted ? document.documentElement : null;
  const darkQuery = isMounted
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      get("theme") === "dark" ||
      (!("theme" in localStorage) && darkQuery?.matches)
    ) {
      element?.classList.add("dark");
    } else {
      element?.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      element?.classList.add("dark");
      store("theme", "dark");
    }
    if (theme === "light") {
      element?.classList.remove("dark");
      store("theme", "light");
    } else if (theme === "system") {
      store("theme", "light");
      //removeItem("theme");
    }
  }, [theme]);

  const ThemeButton = () => {
    return (
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        type="button"
        className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        {theme === "light" ? (
          <BsBrightnessHigh size={20} />
        ) : theme === "dark" ? (
          <BsMoon size={20} />
        ) : (
          <BsMoonStars size={20} />
        )}
      </button>
    );
  };
  return (
    <>
      {isMounted && (
        // <Tooltip
        //   id="tooltip"
        //   content={`Switch to ${theme === "light" ? "dark" : "light"}`}
        //   style={`${theme === "light" ? "dark" : "light"}`}
        // >
        //    <ThemeButton />
        // </Tooltip>
        <div className="flex items-center dark:text-white">
          <Dropdown
            inline
            className="dark:text-white"
            label={
              <span className="dark:text-white">
                {theme === "light" ? (
                  <BsBrightnessHigh size={20} />
                ) : theme === "dark" ? (
                  <BsMoon size={20} />
                ) : (
                  <BsMoonStars size={20} />
                )}
              </span>
            }
          >
            <Dropdown.Item as={"button"} onClick={() => setTheme("system")}>
              <BsMoonStars className={"mr-2"} /> {"Auto (System Default)"}
            </Dropdown.Item>
            <Dropdown.Item as={"button"} onClick={() => setTheme("light")}>
              <BsBrightnessHigh className={"mr-2"} /> {"Light Mode"}
            </Dropdown.Item>
            <Dropdown.Item as={"button"} onClick={() => setTheme("dark")}>
              <BsMoon className={"mr-2"} /> {"Dark Mode"}
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
