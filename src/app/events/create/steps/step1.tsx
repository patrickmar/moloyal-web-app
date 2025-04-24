import React, { ChangeEvent } from "react";
import {
  IBoolean,
  IReactSelect,
  IStepFormState,
  IString,
  ITouchedBoolean,
} from "@/utils/Interface";
import { BiCalendar } from "react-icons/bi";
import { eventCategories, eventMode, eventTags } from "@/constants/constant";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

interface Props extends IStepFormState {
  params: Iparams;
  touched: ITouchedBoolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onMultiSelectChange: (param: { name: string; value: any }) => void;
  onFocus: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

type Iparams = {
  title: string;
  description: string;
  category: string;
  mode: string;
  tags: string[];
};

const Step1 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    onMultiSelectChange,
    onFocus,
    onBlur,
  } = props;
  const { title, tags, mode, description, category } = params;

  const handleCreate = (inputValue: any) => {
    // This function is called when a user creates a new option
    const newOption = {
      label: inputValue,
      value: inputValue,
    };
  };
  if (currentStep !== 1) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="title">
              Event Title
            </label>
            <input
              className="inputClass2"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.title && formErrors.title}
            </small>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="category">
            Event Category
          </label>
          <div className="relative z-20">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <BiCalendar className="w-5 h-5 text-greyIcon" />
            </span>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="selectClass"
            >
              <option value="">Select Category</option>
              {eventCategories &&
                eventCategories
                  .sort((a, b) => a.localeCompare(b))
                  .map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
            </select>
          </div>
          <small className="form-error">
            {touched.category && formErrors.category}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="tags">
              Event Tags {"(Optional)"}
            </label>
            <CreatableSelect
              // defaultValue={tags}
              isMulti
              name="tags"
              options={eventTags}
              className="basic-multi-select text-sm"
              classNamePrefix="react-select"
              //value={tags}
              //onCreateOption={handleCreate}
              onChange={(e) => onMultiSelectChange({ name: "tags", value: e })}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label className="inputLabelClass" htmlFor="mode">
            Event Mode
          </label>
          <div className="relative z-20">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <HiOutlineCurrencyDollar className="w-5 h-5 text-greyIcon" />
            </span>
            <select
              id="mode"
              name="mode"
              value={mode}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className="selectClass"
            >
              {eventMode &&
                eventMode
                  .sort((a, b) => a.localeCompare(b))
                  .map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
            </select>
          </div>
          <small className="form-error">
            {touched.mode && formErrors.mode}
          </small>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label className="inputLabelClass" htmlFor="description">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              rows={6}
              name="description"
              placeholder="Type event description here..."
              className="inputClass2"
              value={description}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.description && formErrors.description}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
