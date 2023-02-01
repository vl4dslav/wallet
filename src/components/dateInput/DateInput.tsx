import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IDate } from "../../store/interfaces";
import { changeDate } from "../../store/store";
import Dropdown from "../dropdown/Dropdown";
import NumberInput from "../numberInput/NumberInput";
import "./DateInput.scss";

const currentDate = new Date();
const initialDate: IDate = {
  day: currentDate.getDate(),
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
  correct() {
    if (this.day > 31 || this.day < 1 || this.month < 1 || this.month > 12)
      return false;
    if (this.year % 4 === 0 && this.month === 2 && this.day > 29) return false;
    if (this.year % 4 !== 0 && this.month === 2 && this.day > 28) return false;
    switch (this.month) {
      case 4:
        return this.day > 30 ? false : true;
      case 6:
        return this.day > 30 ? false : true;
      case 9:
        return this.day > 30 ? false : true;
      case 11:
        return this.day > 30 ? false : true;
      default:
        return true;
    }
  },
}; //delete ? ? ?////////////////////////

const DateInput = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<IDate>(initialDate);
  const changeDay = (newValue: number) =>
    setDate((prev) => {
      const newDate: IDate = { ...prev };
      newDate.day = newValue;
      return newDate.correct() ? newDate : prev;
    });
  const changeMonth = (newValue: number) =>
    setDate((prev) => {
      const newDate: IDate = { ...prev };
      newDate.month = newValue;
      return newDate.correct() ? newDate : prev;
    });
  const changeYear = (newValue: number) =>
    setDate((prev) => {
      const newDate: IDate = { ...prev };
      newDate.year = newValue;
      return newDate;
    });
  const saveDate = () => dispatch(changeDate(date));
  return (
    <div className="date-section">
      <h2>Choose date</h2>
      <div className="inputs">
        <NumberInput
          changeCurrentValue={changeDay}
          min={1}
          max={31}
          value={date.day}
        />
        <NumberInput
          changeCurrentValue={changeMonth}
          min={1}
          max={12}
          value={date.month}
        />
        <NumberInput
          changeCurrentValue={changeYear}
          max={2100}
          value={date.year}
        />
        <button className="change-income-date" onClick={saveDate}>
          save
        </button>
      </div>
    </div>
  );
};

export default DateInput;
