import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultDate } from "./defaultValues";
import {
  IAllStats,
  IDate,
  IExpense,
  IIncome,
  ISettingsState,
} from "./interfaces";

const defaultSecondDate = (): IDate => {
  if (defaultDate.month === 1)
    return {
      ...defaultDate,
      month: 12,
      year: defaultDate.year - 1,
    };
  return {
    ...defaultDate,
    month: defaultDate.month - 1,
  };
};

const defaultState = {
  firstDate: defaultDate,
  secondDate: defaultSecondDate(),
  calendar: defaultDate,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: defaultState,
  reducers: {
    setTwoDates(state: ISettingsState, action: PayloadAction<IDate[]>) {
      if (action.payload.length > 1) {
        state.firstDate = action.payload[0];
        state.secondDate = action.payload[1];
      } else {
        console.log("setTwoDates error");
      }
    },
    setCalendar(state: ISettingsState, action: PayloadAction<IDate>) {
      state.calendar = action.payload;
    },
  },
});

export type StateStats = ReturnType<typeof settingsSlice.reducer>;

export const { setTwoDates, setCalendar } = settingsSlice.actions;
