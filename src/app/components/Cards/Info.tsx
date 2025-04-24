import React, { ReactNode } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  name: string;
};

const Info = (props: Props) => {
  const { name } = props;
  return (
    <div
      id="cta"
      className="p-4 mb-4 rounded-lg bg-tertiary-100 dark:bg-tertiary-100"
    >
      <div className="flex items-center mb-3">
        <span className="bg-tertiary-300 text-tertiary-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-tertiary-200 dark:text-tertiary-900">
          {name}
        </span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-tertiary-50 inline-flex justify-center items-center text-tertiary-900 rounded-lg focus:ring-2 focus:ring-tertiary-400 p-1 hover:bg-tertiary-200 h-6 w-6 dark:bg-tertiary-900 dark:text-tertiary-400 dark:hover:bg-tertiary-800"
        >
          <MdClose className="w-5 h-5" />
        </button>
      </div>
      <p className="mb-3 text-sm text-tertiary-700 dark:text-tertiary-700">
        You are currently saving with our agent at{" "}
        <span className="font-bold">
          Alimosho local government, Lagos, Nigeria.
        </span>
      </p>
    </div>
  );
};

export default Info;
