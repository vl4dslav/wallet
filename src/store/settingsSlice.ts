import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultDate, operatorLessDates } from "./defaultValues";
import { IDate, ISettingsState } from "./interfaces";

const defaultState: ISettingsState = {
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
