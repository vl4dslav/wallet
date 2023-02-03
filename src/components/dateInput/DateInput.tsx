import { useState } from "react";
import { useDispatch } from "react-redux";
import { IDate } from "../../store/interfaces";
import { changeDate } from "../../store/statsSlice";
import NumberInput from "../numberInput/NumberInput";
import "./DateInput.scss";
import { correct, defaultDate } from "../../store/defaultValues";

const DateInput = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<IDate>(defaultDate);
  const changeDay = (newValue: number) =>
    setDate((prev) => {
      const newDate: IDate = { ...prev };
      newDate.day = newValue;
      return correct(newDate) ? newDate : prev;
    });
  const changeMonth = (newValue: number) =>
    setDate((prev) => {
      const newDate: IDate = { ...prev };
      newDate.month = newValue;
      return correct(newDate) ? newDate : prev;
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
