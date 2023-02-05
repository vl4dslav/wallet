import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultDate, operatorLessDates } from "./defaultValues";
import {
  // IAllStats,
  IDate,
  // IExpense,
  // IIncome,
  ISettingsState,
} from "./interfaces";

// const defaultSecondDate = (): IDate => {
//   if (defaultDate.month === 1)
//     return {
//       ...defaultDate,
//       month: 12,
//       year: defaultDate.year - 1,
//     };
//   return {
//     ...defaultDate,
//     month: defaultDate.month - 1,
//   };
// };

const defaultState: ISettingsState = {
  // firstDate: defaultDate,
  // secondDate: defaultSecondDate(),
  pickedBetween: false,
  dates: [],
  calendar: defaultDate,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: defaultState,
  reducers: {
    setDates(state: ISettingsState, action: PayloadAction<IDate[]>) {
      state.dates = action.payload.sort(operatorLessDates);
      // switch (action.payload.length) {
      //   case 0:
      //     break;
      //   case 1:
      //     state.firstDate = state.dates[0];
      //     break;
      //   default:
      //     state.firstDate = state.dates[0];
      //     state.secondDate = state.dates[state.dates.length - 1];
      //     break;
      // }
    },
    setCalendar(state: ISettingsState, action: PayloadAction<IDate>) {
      state.calendar = action.payload;
    },
    changePickedBetween(state: ISettingsState, action) {
      state.pickedBetween = !state.pickedBetween;
    },
  },
});

export type StateStats = ReturnType<typeof settingsSlice.reducer>;

export const { setDates, setCalendar, changePickedBetween } =
  settingsSlice.actions;
