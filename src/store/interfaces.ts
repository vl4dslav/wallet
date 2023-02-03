export enum statType {
  income = "income",
  expense = "expense",
}

interface IStat {
  description: string;
  type: string;
  value: number;
  currency: string;
  typeOfStat: statType;
}

export interface IExpense extends IStat {
  description: string;
  type: string;
  value: number;
  currency: string;
  typeOfStat: statType.expense;
}

export interface IIncome extends IStat {
  description: string;
  type: string;
  value: number;
  currency: string;
  typeOfStat: statType.income;
}

export enum buttonStyle {
  standart,
  reverse,
}

export interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  style: buttonStyle;
  content: string;
  handleClick?: () => void;
}

export interface IDropdownProps {
  currentOption: string;
  options: Array<string>;
  changeCurrentOption: (index: number) => void;
}

export interface INumberInputProps {
  min?: number;
  max?: number;
  value?: number;
  changeCurrentValue: (newValue: number) => void;
}

export interface IListProps {
  type: statType;
}

export type IDate = {
  day: number;
  month: number;
  year: number;
};

export type IStatsWithDate = {
  date: IDate;
  income: IIncome[];
  expense: IExpense[];
};

export interface IAllStats {
  stats: IStatsWithDate[];
  currentStats: IStatsWithDate;
}

export interface IAddStat {
  Addtype: statType;
  changeAddType: () => void;
}

// export enum incomeActionTypes {
//   add = "add",
//   delete = "delete",
// }
