import { configureStore } from "@reduxjs/toolkit";
import { settingsSlice } from "./settingsSlice";
import { statsSlice } from "./statsSlice";

export const store = configureStore({
  reducer: { stats: statsSlice.reducer, settings: settingsSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
