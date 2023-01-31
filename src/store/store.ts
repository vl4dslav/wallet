import { configureStore, createSlice, current } from "@reduxjs/toolkit";
// import { create } from "domain";
import { IIncome } from "./interfaces";

const defaultIncome: IIncome[] = [];

const incomeSlice = createSlice({
  name: "income",
  initialState: defaultIncome,
  reducers: {
    addIncome: (state, action) => {
      console.log(current(state));
      const newState = ([] as Array<IIncome>).concat(state);
      newState.push(action.payload);
      return newState; //mutate state or make return ????
    },
    deleteIncome: (state, action) => {
      if (action.type === "delete")
        return state.filter((income, index) => index !== action.payload);
      return state;
    },
  },
});

export type StateIncome = ReturnType<typeof incomeSlice.reducer>;

export const { addIncome, deleteIncome } = incomeSlice.actions;

export const store = configureStore({
  reducer: { income: incomeSlice.reducer },
});
