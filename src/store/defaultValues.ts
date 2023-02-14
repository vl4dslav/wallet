import { useSelector } from "react-redux";
import {
  color,
  currencyTypes,
  IAllStats,
  ICurrencyExchange,
  IDate,
  IExpense,
  IIncome,
  IStatsWithDate,
  statInfo,
  statType,
} from "./interfaces";
import { RootState } from "./store";

const currentDate = new Date();

export const currentWeekday = currentDate.getDay();

export const defaultDate: IDate = {
  day: currentDate.getDate(),
  month: currentDate.getMonth() + 1,
  year: currentDate.getFullYear(),
};

export const defaultDate2: IDate = {
  ...defaultDate,
  day: 1,
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

// const [typeOfStat, setTypeOfStat] = React.useState<statType | null>(null);

export const defaultStats: IAllStats = {
  stats: [],
  currentStats: {
    date: defaultDate,
    income: [],
    expense: [],
  },
  typeOfStat: null,
};

export const daysInMonth = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //dec, jan, ... , dec
export const week = ["s", "m", "t", "w", "t", "f", "s"];

export const compareDates = (date1: IDate, date2: IDate) =>
  date1.day === date2.day &&
  date1.month === date2.month &&
  date1.year === date2.year;

export const operatorLessDates = (date1: IDate, date2: IDate) => {
  if (date1.year < date2.year) return -1;
  if (date1.year > date2.year) return 1;
  if (date1.month < date2.month) return -1;
  if (date1.month > date2.month) return 1;
  if (date1.day < date2.day) return -1;
  return 1;
};

export const colors = [
  color.black,
  color.blue,
  color.green,
  color.orange,
  color.pink,
  color.purple,
  color.red,
  color.silver,
  color.violet,
  color.yellow,
];

export const useSumAndTypeToSum = (
  type: statType,
  currencyList: ICurrencyExchange[]
) => {
  const [stats, dates, typesOfStat, pickedBetween]: [
    IStatsWithDate[],
    IDate[],
    statInfo[],
    boolean
  ] = useSelector((state: RootState) => {
    let allTypesOfStats: statInfo[] = [];
    switch (type) {
      case statType.income:
        allTypesOfStats = state.settings.typesOfStat.income;
        break;
      case statType.expense:
        allTypesOfStats = state.settings.typesOfStat.expense;
        break;
    }
    return [
      state.stats.stats,
      state.settings.dates,
      allTypesOfStats,
      state.settings.pickedBetween,
    ];
  });

  const typeToSum = new Map<statInfo, number>();
  let sum = 1;
  typesOfStat.forEach((item) => typeToSum.set(item, 0));
  const makeReduce = (sum: number, income: IIncome | IExpense) => {
    const currentValue: number = typeToSum.get(income.type) || 0;
    const currencyRate =
      income.currency === currencyTypes.RUB
        ? 1
        : currencyList.reduce(
            (acc, currency) =>
              currency.currency === income.currency ? currency.value : acc,
            0
          );
    typeToSum.set(
      income.type,
      currentValue + Math.round(income.value * currencyRate * 100) / 100
    );
    return sum + Math.round(income.value * currencyRate * 100) / 100;
  };

  if (pickedBetween && dates.length > 0) {
    sum = stats.reduce((accum, item) => {
      if (
        (operatorLessDates(dates[0], item.date) < 0 &&
          operatorLessDates(item.date, dates[dates.length - 1]) < 0) ||
        compareDates(dates[0], item.date) ||
        compareDates(item.date, dates[dates.length - 1])
      ) {
        switch (type) {
          case statType.income:
            return (accum += item.income.reduce(makeReduce, 0));
          case statType.expense:
            return (accum += item.expense.reduce(makeReduce, 0));
        }
      }
      return accum;
    }, 0);
  }

  if (!pickedBetween && dates.length > 0) {
    sum = stats.reduce((accum, item) => {
      if (
        dates.reduce((acc, date) => {
          if (compareDates(date, item.date)) return true;
          return acc;
        }, false)
      ) {
        switch (type) {
          case statType.income:
            return (accum += item.income.reduce(makeReduce, 0));
          case statType.expense:
            return (accum += item.expense.reduce(makeReduce, 0));
        }
      }
      return accum;
    }, 0);
  }
  return { sum, typeToSum };
};
