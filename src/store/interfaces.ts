export interface IIncome {
  description: string;
  type: string;
  value: number;
  currency: string;
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
  type: listType;
}

export enum listType {
  income = "income",
  expense = "expense",
}
// export enum incomeActionTypes {
//   add = "add",
//   delete = "delete",
// }
