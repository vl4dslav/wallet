import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  compareDates,
  daysInMonth,
  operatorLessDates,
  week,
} from "../../store/defaultValues";
import { IDate } from "../../store/interfaces";
import { setDates } from "../../store/settingsSlice";
import { RootState } from "../../store/store";
import "./Calendar.scss";

const Calendar = () => {
  // const [pickedDates, setPickedDates] = useState<IDate[] | null>(null);
  const dispatch = useDispatch();
  const { pickedDates, pickedBetween } = useSelector((state: RootState) => {
    return {
      pickedDates: state.settings.dates,
      pickedBetween: state.settings.pickedBetween,
    };
  });
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
  const handleClickOnDay = (
    length: number,
    day: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.currentTarget.className.split(" ").length < 3) {
      dispatch(setDates([...pickedDates, { day, month, year }]));
    } else {
      dispatch(
        setDates([
          ...pickedDates.filter(
            (item) => !compareDates(item, { day, month, year })
          ),
        ])
      );
    }
  };
  const isPicked = (day: number): string => {
    if (
      pickedDates?.reduce(
        (accum, item) =>
          accum ? accum : compareDates(item, { day, month, year }),
        false
      )
    )
      return " picked";
    if (pickedDates.length > 1) {
      if (
        (pickedBetween &&
          operatorLessDates(pickedDates[0], { day, month, year })) === -1 &&
        operatorLessDates(pickedDates[pickedDates.length - 1], {
          day,
          month,
          year,
        }) === 1
      )
        return " picked";
    }
    return "";
  };
  const releaseDays = () => {
    if (year % 4 === 0 && month === 2) {
      const days = Array.from(new Array(29));
      return days.map((_, index) => (
        <div
          key={index}
          className={`day calendar-item${isPicked(index + 1)}`}
          onClick={(e) => handleClickOnDay(29, index + 1, e)}
        >
          {index + 1}
          <div></div>
        </div>
      ));
    }
    const days = Array.from(new Array(daysInMonth[month]).keys());
    return days.map((_, index) => {
      return (
        <div
          key={index}
          className={`day calendar-item${isPicked(index + 1)}`}
          onClick={(e) => handleClickOnDay(daysInMonth[month], index + 1, e)}
        >
          {index + 1}
          <div></div>
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
