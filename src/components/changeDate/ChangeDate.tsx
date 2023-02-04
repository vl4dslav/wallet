import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCalendar } from "../../store/settingsSlice";
import NumberInput from "../numberInput/NumberInput";
import "./ChangeDate.scss";

const ChangeDate = () => {
  const dispatch = useDispatch();
  const { month, year } = useSelector(
    (state: RootState) => state.settings.calendar
  );

  return (
    <div className="changeDate">
      <NumberInput
        changeCurrentValue={(month: number) =>
          dispatch(setCalendar({ month, year, day: 1 }))
        }
        min={1}
        max={12}
        value={month}
      />
      <NumberInput
        changeCurrentValue={(year: number) =>
          dispatch(setCalendar({ month, year, day: 1 }))
        }
        min={1}
        max={2100}
        value={year}
      />
    </div>
  );
};

export default ChangeDate;
