import CountryDropdown from "@/app/components/Countries";
import StateDropdown from "@/app/components/States";
import { eventTypes, onlinePlatforms } from "@/constants/constant";
import Select from "react-select";
import {
  ICustomSelect,
  IStepFormState,
  ITouchedBoolean,
} from "@/utils/Interface";
import { IOnlineEvent, IPhysicalEvent } from "@/utils/Types";
import React, { ChangeEvent, useState } from "react";

interface Props extends IStepFormState {
  params: IPhysicalEvent | IOnlineEvent;
  touched: ITouchedBoolean;
  handleSelectChange: (value: ICustomSelect) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectFocus: (name: string) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Step4 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    handleSelectChange,
    onFocus,
    onSelectFocus,
    onBlur,
  } = props;

  const { type } = params;
  const { venue, country, state } = params as IPhysicalEvent;
  const { link, platform } = params as IOnlineEvent;

  const [selectedPlatform, setSelectedPlatform] = useState({
    label: platform,
    value: platform,
  });

  if (currentStep !== 4) {
    return null;
  }
  return (
    <div>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Event Type
      </h3>
      <ul className="grid mb-5.5 w-full gap-6 md:grid-cols-2">
        {eventTypes.map((eventType, i) => (
          <li key={i + 1}>
            <input
              type="radio"
              id={eventType.value}
              name={"type"}
              value={eventType.value}
              checked={eventType.value === type}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="hidden peer"
            />
            <label
              htmlFor={eventType.value}
              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold mb-1">
                  {eventType.value}
                </div>
                <div className="w-full text-xs">{eventType.label}</div>
              </div>
              <svg
                className="w-5 h-5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </label>
          </li>
        ))}
      </ul>

      {type === "Physical" && (
        <>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="relative">
                <label className="inputLabelClass" htmlFor="venue">
                  Event Venue
                </label>
                <input
                  className="inputClass2"
                  type="text"
                  name="venue"
                  id="venue"
                  value={venue}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <small className="form-error">
                  {touched.venue && formErrors.venue}
                </small>
              </div>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <CountryDropdown
              country={country}
              state={state}
              touched={touched}
              formErrors={formErrors}
              handleSelectChange={handleSelectChange}
              onFocus={onSelectFocus}
              onBlur={onBlur}
            />
            <StateDropdown
              country={country.value}
              state={state}
              touched={touched}
              formErrors={formErrors}
              handleSelectChange={handleSelectChange}
              onFocus={onSelectFocus}
              onBlur={onBlur}
            />
          </div>
        </>
      )}

      {type === "Online" && (
        <>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <div className="relative">
                <label className="inputLabelClass" htmlFor="platform">
                  Select Platform
                </label>
                <Select
                  options={onlinePlatforms}
                  value={selectedPlatform}
                  isSearchable={false}
                  id="platform"
                  name="platform"
                  placeholder={"Select platform"}
                  inputId="platform"
                  instanceId="platforms"
                  onChange={(e) => {
                    console.log(e);
                    setSelectedPlatform({ label: e!.value, value: e!.value });
                    handleSelectChange({ name: "platform", value: e!.value });
                  }}
                  onFocus={() => onSelectFocus("platform")}
                  onBlur={onBlur}
                />
                <small className="form-error">
                  {touched.platform && formErrors.platform}
                </small>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative">
                <label className="inputLabelClass" htmlFor="link">
                  Event Link
                </label>
                <input
                  className="inputClass2"
                  type="text"
                  name="link"
                  id="link"
                  value={link}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <small className="form-error">
                  {touched.link && formErrors.link}
                </small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Step4;
