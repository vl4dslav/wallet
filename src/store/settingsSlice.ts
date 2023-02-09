import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultDate, defaultDate2, operatorLessDates } from "./defaultValues";
import {
  activeTypeAction,
  addTypeAction,
  color,
  IDate,
  ISettingsState,
  statType,
} from "./interfaces";

// const currencyValues = ["rub", "usd"];
//between dates ??????????????????????????????????????????????????????

const defaultState: ISettingsState = {
  pickedBetween: false,
  dates: [defaultDate2, defaultDate],
  calendar: defaultDate,
  typesOfStat: {
    income: [
      { title: "freelance", color: color.blue, active: true },
      { title: "job", color: color.orange, active: true },
      { title: "gift", color: color.purple, active: true },
    ],
    expense: [
      { title: "food", color: color.blue, active: true },
      { title: "entertainment", color: color.purple, active: true },
    ],
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: defaultState,
  reducers: {
    setDates(state: ISettingsState, action: PayloadAction<IDate[]>) {
      state.dates = action.payload.sort(operatorLessDates);
    },
    setCalendar(state: ISettingsState, action: PayloadAction<IDate>) {
      state.calendar = action.payload;
    },
    changePickedBetween(state: ISettingsState, action) {
      state.pickedBetween = !state.pickedBetween;
    },
    addTypes(state: ISettingsState, action: PayloadAction<addTypeAction>) {
      switch (action.payload.type) {
        case statType.income:
          state.typesOfStat.income.push(action.payload.statInfo);
          break;
        case statType.expense:
          state.typesOfStat.expense.push(action.payload.statInfo);
          break;
      }
    },
    changeActive(
      state: ISettingsState,
      action: PayloadAction<activeTypeAction>
    ) {
      switch (action.payload.type) {
        case statType.income:
          state.typesOfStat.income[action.payload.index].active =
            !state.typesOfStat.income[action.payload.index].active;
          break;
        case statType.expense:
          state.typesOfStat.expense[action.payload.index].active =
            !state.typesOfStat.expense[action.payload.index].active;
          break;
      }
    },
  },
});

export type StateStats = ReturnType<typeof settingsSlice.reducer>;

export const {
  setDates,
  setCalendar,
  changePickedBetween,
  addTypes,
  changeActive,
} = settingsSlice.actions;
