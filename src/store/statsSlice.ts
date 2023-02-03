import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultStats } from "./defaultValues";
import { IAllStats, IDate, IExpense, IIncome, statType } from "./interfaces";

const compareDates = (date1: IDate, date2: IDate) =>
  date1.day === date2.day &&
  date1.month === date2.month &&
  date1.year === date2.year;

const isIncome = (item: IIncome | IExpense): item is IIncome => {
  if (item.typeOfStat === statType.income) return true;
  return false;
};

export const statsSlice = createSlice({
  name: "stats",
  initialState: defaultStats,
  reducers: {
    changeDate: (state: IAllStats, action: PayloadAction<IDate>) => {
      const curr = state.currentStats;
      if (curr.income.length > 0 || curr.expense.length > 0) {
        let newDate = true;
        state.stats = state.stats.map((stat) => {
          if (compareDates(stat.date, curr.date)) {
            newDate = false;
            return curr;
          }
          return stat;
        });
        if (newDate) state.stats.push(curr);
      }
      state.currentStats = {
        date: action.payload,
        income: [],
        expense: [],
      };
      state.stats.forEach((stat) => {
        if (compareDates(stat.date, state.currentStats.date))
          state.currentStats = stat;
      });
    },
    addStat: (state: IAllStats, action: PayloadAction<IIncome | IExpense>) => {
      if (isIncome(action.payload)) {
        state.currentStats.income.push(action.payload);
      } else {
        state.currentStats.expense.push(action.payload);
      }
    },
    deleteIncome: (state: IAllStats, action: PayloadAction<number>) => {
      state.currentStats.income = state.currentStats.income.filter(
        (_, index) => index !== action.payload
      );
    },
    deleteExpense: (state: IAllStats, action: PayloadAction<number>) => {
      state.currentStats.expense = state.currentStats.expense.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export type StateStats = ReturnType<typeof statsSlice.reducer>;

export const { addStat, deleteIncome, deleteExpense, changeDate } =
  statsSlice.actions;