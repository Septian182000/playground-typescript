import { configureStore } from "@reduxjs/toolkit";
import placeHolderReducer from "./reducers/placeHolderSlice";

export const dataStore = configureStore({
  reducer: {
    placeData: placeHolderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof dataStore.getState>;
export type AppDispatch = typeof dataStore.dispatch;
