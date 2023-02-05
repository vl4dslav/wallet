import { IAllStats, IDate } from "./interfaces";

const currentDate = new Date();

export const currentWeekday = currentDate.getDay();

export const defaultDate: IDate = {
  day: currentDate.getDate(),
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
};

export const correct = (date: IDate) => {
  if (date.day > 31 || date.day < 1 || date.month < 1 || date.month > 12)
    return false;
  if (date.year % 4 === 0 && date.month === 2 && date.day > 29) return false;
  if (date.year % 4 !== 0 && date.month === 2 && date.day > 28) return false;
  switch (date.month) {
    case 4:
      return date.day > 30 ? false : true;
    case 6:
      return date.day > 30 ? false : true;
    case 9:
      return date.day > 30 ? false : true;
    case 11:
      return date.day > 30 ? false : true;
    default:
      return true;
  }
};

export const defaultStats: IAllStats = {
  stats: [],
  currentStats: {
    date: defaultDate,
    income: [],
    expense: [],
  },
};

export const daysInMonth = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //dec, jan, ... , dec
export const week = ["s", "m", "t", "w", "t", "f", "s"];

export const compareDates = (date1: IDate, date2: IDate) =>
  date1.day === date2.day &&
  date1.month === date2.month &&
  date1.year === date2.year;

export const operatorLessDates = (date1: IDate, date2: IDate) => {
  if (date1.year < date2.year) return -1;
  if (date1.month < date2.month) return -1;
  if (date1.day < date2.day) return -1;
  return 1;
};
