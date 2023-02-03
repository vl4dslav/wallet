import { configureStore } from "@reduxjs/toolkit";
import { statsSlice } from "./statsSlice";

export const store = configureStore({
  reducer: { stats: statsSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
