import Dropzone from "@/app/components/Dropzone/index";
import {
  IDateFocus,
  IDateProps,
  IEventDate,
  IReactSelect,
  IStepFormState,
  ITouchedBoolean,
} from "@/utils/Interface";
import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props extends IStepFormState {
  params: Iparams;
  touched: ITouchedBoolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBannerChange: (param: { name: string; value: IReactSelect[] }) => void;
  handleDateChange: (value: IDateProps) => void;
  onFocus: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDateFocus: (props: IDateFocus) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

type Iparams = {
  start: IEventDate;
  end?: IEventDate;
  banner: string[];
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
    handleBannerChange,
    onDateFocus,
    onBlur,
  } = props;
  const { start, end, banner } = params;

  if (currentStep !== 2) {
    return null;
  }
  return (
    <>
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
              selected={start.date}
              startDate={start.date}
              endDate={end!.date}
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
                handleDateChange({ value: date, name: "start", type: "date" })
              }
              onFocus={(e) => onDateFocus({ e, name: "start", type: "date" })}
              onBlur={onBlur}
              autoComplete="new-password"
            />
            <small className="form-error">
              {touched.start?.date && formErrors.start?.date}
            </small>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="startTime">
              Start Time
            </label>
            <DatePicker
              className="inputClass2"
              selected={start.time}
              id="startTime"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "start", type: "time" })
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              onFocus={(e) => onDateFocus({ e, name: "start", type: "time" })}
              onBlur={onBlur}
              autoComplete="new-password"
            />
            <small className="form-error">
              {touched.start?.time && formErrors.start?.time}
            </small>
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="endDate">
              End Date
            </label>
            <DatePicker
              className="inputClass2"
              selectsEnd
              id="endDate"
              selected={end!.date}
              startDate={start.date}
              endDate={end!.date}
              minDate={start.date !== null ? start.date : new Date()}
              dateFormat="d MMMM, yyyy"
              nextMonthButtonLabel={
                <HiChevronRight className="w-5 h-5 text-gray-600" />
              }
              previousMonthButtonLabel={
                <HiChevronLeft className="w-5 h-5 text-gray-600" />
              }
              popperClassName="react-datepicker-right"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "end", type: "date" })
              }
              onFocus={(e) => onDateFocus({ e, name: "end", type: "date" })}
              onBlur={onBlur}
              autoComplete="chrome-off"
            />
            <small className="form-error">
              {touched.end?.date && formErrors.end?.date}
            </small>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="endTime">
              End Time
            </label>
            <DatePicker
              className="inputClass2"
              selected={end!.time}
              id="endTime"
              onChange={(date: Date) =>
                handleDateChange({ value: date, name: "end", type: "time" })
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              onFocus={(e) => onDateFocus({ e, name: "end", type: "time" })}
              onBlur={onBlur}
              autoComplete="chrome-off"
            />
            <small className="form-error">
              {touched.end?.time && formErrors.end?.time}
            </small>
          </div>
        </div>
      </div>

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full">
          <div className="relative">
            <label className="inputLabelClass" htmlFor="title">
              Event Banner
            </label>
            <Dropzone
              onBannerChange={handleBannerChange}
              banner={banner}
              touched={touched}
              className="p-16 my-2 relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary-600 bg-gray-100 dark:bg-meta-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
