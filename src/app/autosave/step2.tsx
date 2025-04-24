import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BsCalendarEvent, BsCheckCircleFill } from "react-icons/bs";
import RadioInputCard from "../components/Cards/RadioInputCard";
import { sourceOptions } from "./constants";
import moment from "moment";
import { IBoolean, IDateFocus, IDateProps, IString } from "@/utils/Interface";
import { ordinalNumbers } from "@/utils/Functions";
// import "react-datepicker/dist/react-datepicker.css";

type Props = {
  currentStep: number;
  params: Iparams;
  formErrors: IString;
  touched: IBoolean;
  disabled: IBoolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDateChange: (value: IDateProps) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateFocus: (props: IDateFocus) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

type Iparams = {
  fundSource: string;
  time: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  timeline: string;
  frequency: string;
};

const Step2 = (props: Props) => {
  const {
    currentStep,
    params,
    formErrors,
    touched,
    disabled,
    handleChange,
    handleDateChange,
    onFocus,
    onDateFocus,
    onBlur,
  } = props;
  const { fundSource, time, startDate, endDate, timeline, frequency } = params;
  const weekdays = moment.weekdays();
  const monthdays = Array.apply(null, Array(28)).map((x, i) => i + 1);

  if (currentStep !== 2) {
    return null;
  }
  return (
    <>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <label className="inputLabelClass" htmlFor="startsDate">
            Set Primary Source of Funds
          </label>

          <ul className="grid w-full gap-6 md:grid-cols-3">
            {sourceOptions.map((item: any, i: number) => (
              <li key={i}>
                <RadioInputCard
                  key={i}
                  item={item}
                  id={"fundSource" + i}
                  name={"fundSource"}
                  value={fundSource}
                  handleChange={handleChange}
                  handleFocus={onFocus}
                  handleBlur={onBlur}
                />
              </li>
            ))}
          </ul>
          <small className="form-error">
            {touched.fundSource && formErrors.fundSource}
          </small>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="startDate">
              Start Date
            </label>
            <DatePicker
              className="inputClass2"
              id="startDate"
              selectsStart
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="d MMMM, yyyy"
              nextMonthButtonLabel={
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              }
              previousMonthButtonLabel={
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              }
              popperClassName="react-datepicker-left"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "startDate" })
              }
              onFocus={(e) => onDateFocus({ e, name: "startDate" })}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.startDate && formErrors.startDate}
            </small>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="endDate">
              End Date
            </label>
            <DatePicker
              className="inputClass2"
              selectsEnd
              id="endDate"
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate !== null ? startDate : new Date()}
              dateFormat="d MMMM, yyyy"
              nextMonthButtonLabel={
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              }
              previousMonthButtonLabel={
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              }
              popperClassName="react-datepicker-right"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "endDate" })
              }
              onFocus={(e) => onDateFocus({ e, name: "endDate" })}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.endDate && formErrors.endDate}
            </small>
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="time">
              Preferred Time
            </label>
            <DatePicker
              className="inputClass2"
              selected={time}
              id="time"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "time" })
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              onFocus={(e) => onDateFocus({ e, name: "time" })}
              onBlur={onBlur}
            />
            <small className="form-error">
              {touched.time && formErrors.time}
            </small>
          </div>
        </div>
        {(frequency === "Weekly" || frequency === "Monthly") && (
          <div className="w-full sm:w-1/2">
            <label className="inputLabelClass" htmlFor="timeline">
              Day of the {frequency.replaceAll("ly", "")}
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                <BsCalendarEvent className="w-5 h-5 text-greyIcon" />
              </span>
              <select
                id="timeline"
                name="timeline"
                value={timeline}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className="selectClass"
              >
                <option value="">
                  Day of the {frequency.replaceAll("ly", "")}
                </option>
                {frequency === "Weekly" && weekdays
                  ? weekdays.map((t, i) => (
                      <option key={i} value={t}>
                        {`Every ${t}s `}
                      </option>
                    ))
                  : monthdays &&
                    monthdays.map((t, i) => (
                      <option key={i} value={t}>
                        {`Every ${ordinalNumbers(t)} `}
                      </option>
                    ))}
              </select>
            </div>
            <small className="form-error">
              {touched.timeline && formErrors.timeline}
            </small>
          </div>
        )}
      </div>
    </>
  );
};

export default Step2;
