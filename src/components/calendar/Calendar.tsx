import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { daysInMonth, week } from "../../store/defaultValues";
import { RootState } from "../../store/store";
import "./Calendar.scss";

const Calendar = () => {
  const [shift, setShift] = useState(() => new Date().getDay());
  const [shiftEnd, setShiftEnd] = useState(0);
  const { month, year } = useSelector((state: RootState) => {
    return state.settings.calendar;
  });
  useEffect(() => {
    const date = new Date(year, month - 1, 1);
    setShift(date.getDay());
    setShiftEnd(() => {
      if (year % 4 === 0 && month === 2) return 7 - date.getDay() - 1;
      return (14 - (daysInMonth[month] % 7) - date.getDay()) % 7;
    });
  }, [year, month]);
  const shiftDays = (num: number) => {
    const days = Array.from(new Array(num).keys());
    return days.map((_, index) => {
      return <div key={index} className="day calendar-item"></div>;
    });
  };
  const releaseDays = () => {
    if (year % 4 === 0 && month === 2) {
      const days = Array.from(new Array(29));
      return days.map((_, index) => (
        <div key={index} className="day calendar-item">
          {index + 1}
        </div>
      ));
    }
    const days = Array.from(new Array(daysInMonth[month]).keys());
    return days.map((_, index) => {
      return (
        <div key={index} className="day calendar-item">
          {index + 1}
        </div>
      );
    });
  };
  return (
    <div className="calendar">
      {week.map((weekday, i) => (
        <div key={i} className="weekday calendar-item">
          {weekday}
        </div>
      ))}
      {shiftDays(shift)}
      {releaseDays()}
      {shiftDays(shiftEnd)}
    </div>
  );
};

export default Calendar;
