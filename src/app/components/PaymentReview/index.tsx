import Image from "next/image";
import React, { ChangeEvent, Fragment, useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { NumericFormat } from "react-number-format";
import Select from "react-select";

type Props = {
  type: string;
  params: IParams[];
  data: object;
  points?: string;
  reviewOpen: boolean;
  setShowReview: (open: boolean) => void;
  //setShowReview: React.Dispatch<React.SetStateAction<any>>;
};

interface IParams {
  name: string;
  value: Value[];
}

interface Value {
  key: string;
  value: string;
}

const PaymentReview = (props: Props) => {
  const paymentOptions = [
    {
      value: "Savings",
      label: "Savings balance",
      amount: 300000,
      color: "blue-400",
    },
    {
      value: "Wallet",
      label: "Wallet Balance",
      amount: 100000,
      color: "red-400",
    },
    { value: "Loyalty", label: "Loyalty", amount: 50000, color: "green-400" },
  ];
  const { params, data, type, reviewOpen, setShowReview } = props;
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);

  const handlePayment = () => {
    console.log(data);
  };

  const handleChange = (option: any) => {
    setPaymentMethod(option);
  };
  return (
    <div>
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-center text-black dark:text-white">
          Review Payment
        </h3>
      </div>
      <div className="p-7">
        {params.map((item: any, i: number) => (
          <div key={i} className="mb-3">
            <div className="mb-2">
              <span className="text-sm font-semibold dark:text-white">
                {item.name}
              </span>
            </div>
            {item.value.map((it: any, id: number) => (
              <Fragment key={id}>
                <div className="p-4 bg-gray-100 rounded-md justify-between items-center flex mb-1 dark:border dark:border-gray-600 dark:bg-form-input">
                  <span className="text-sm font-light dark:text-white">
                    {it.key}
                  </span>
                  <span className="text-sm font-semibold dark:text-white">
                    {!isNaN(it.value) &&
                    it.key !== "Mobile Number" &&
                    it.key !== "Account Number" &&
                    it.key !== "Meter Number" ? (
                      <NumericFormat
                        value={Number(it.value).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₦"}
                      />
                    ) : (
                      it.value
                    )}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        ))}
        <div className="mb-3">
          <div className="mb-2">
            <span className="text-sm font-semibold dark:text-white">
              {"Pay With"}
            </span>
          </div>

          <div className="">
            <div className="relative z-20 bg-gray-100 rounded-md items-center mb-1 dark:bg-form-input">
              <Select
                classNamePrefix="react-select"
                isSearchable={false}
                className=""
                value={paymentMethod}
                id="paymentOption"
                name="paymentOption"
                onChange={handleChange}
                options={paymentOptions}
                formatOptionLabel={(item: any) => (
                  <div className="justify-between items-center flex">
                    <div className="flex gap-2 items-center">
                      {item.color !== "" && (
                        <div className="">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-${item.color} dark:bg-${item.color} `}
                          >
                            <TbCurrencyNaira className="w-5 h-5 text-white" />
                          </span>
                        </div>
                      )}
                      <span className="dark:text-white">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold dark:text-white">
                      {item.amount}
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4.5 mt-5">
          <button
            className="cancelButton"
            type="button"
            onClick={() => setShowReview(!reviewOpen)}
          >
            Back
          </button>
          <button
            className={`submitButton`}
            type="submit"
            onClick={handlePayment}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaymentReview;
