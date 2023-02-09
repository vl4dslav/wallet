export enum statType {
  income = "income",
  expense = "expense",
}

export enum AddTypeTitles {
  income = "Income types",
  expense = "Expense types",
}

interface IStat {
  description: string;
  type: statInfo;
  value: number;
  currency: string;
  typeOfStat: statType;
}

export interface IExpense extends IStat {
  description: string;
  type: statInfo;
  value: number;
  currency: string;
  typeOfStat: statType.expense;
}

export interface IIncome extends IStat {
  description: string;
  type: statInfo;
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
  currentOption: string | JSX.Element;
  options: Array<string> | JSX.Element[];
  changeCurrentOption: (index: number) => void;
  width: string;
  height: string;
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
  typeOfStat: statType | null;
}

// const [typeOfStat, setTypeOfStat] = React.useState<statType | null>(null);

export interface IAddStat {
  Addtype: statType;
  changeAddType: () => void;
}

export enum color {
  red = "#ff1800",
  orange = "#ff7a00",
  yellow = "#fff740",
  green = "#008209",
  blue = "#0969a2",
  violet = "#412c84",
  purple = "#7608aa",
  pink = "#892276",
  silver = "#c8c8c8",
  black = "#242325",
}

export interface statInfo {
  title: string;
  color: color;
  active: boolean;
}

export interface addTypeAction {
  statInfo: statInfo;
  type: statType;
}

export interface typeOfStat {
  income: statInfo[];
  expense: statInfo[];
}

export interface ISettingsState {
  calendar: IDate;
  dates: IDate[];
  pickedBetween: boolean;
  typesOfStat: typeOfStat;
}

export interface ICheckBoxList {
  create: (info: statInfo) => void;
  getList: () => statInfo[];
  title: string;
  changeActive: (index: number) => void;
  changeTitle?: () => void;
}

export interface activeTypeAction {
  index: number;
  type: statType;
}
