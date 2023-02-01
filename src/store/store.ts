import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import { IAllStats, IDate, IIncome, IStats } from "./interfaces";

const currentDate = new Date();
const defaultDate: IDate = {
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
};

const defaultIncome: IAllStats = {
  stats: [],
  currentStats: {
    date: defaultDate,
    income: [],
  },
};

const compareDates = (date1: IDate, date2: IDate) =>
  date1.day === date2.day &&
  date1.month === date2.month &&
  date1.year === date2.year;

const incomeSlice = createSlice({
  name: "income",
  initialState: defaultIncome,
  reducers: {
    changeDate: (state: IAllStats, action) => {
      const curr = state.currentStats;
      if (curr.income.length > 0) {
        state.stats.push(curr);
      }
      state.currentStats = {
        date: action.payload,
        income: [],
      };
      state.stats.forEach((stat) => {
        if (compareDates(stat.date, state.currentStats.date))
          state.currentStats.income = stat.income;
      });
    },
    addIncome: (state: IAllStats, action) => {
      state.currentStats.income.push(action.payload);
    },
    deleteIncome: (state: IAllStats, action) => {
      state.currentStats.income = state.currentStats.income.filter(
        (expense, index) => index !== action.payload
      );
    },
  },
});

export type StateIncome = ReturnType<typeof incomeSlice.reducer>;

export const { addIncome, deleteIncome, changeDate } = incomeSlice.actions;

export const store = configureStore({
  reducer: { income: incomeSlice.reducer },
});
