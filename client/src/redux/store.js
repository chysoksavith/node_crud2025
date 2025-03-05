import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./features/brandSlice";
export const store = configureStore({
  reducer: {
    brands: brandReducer,
  },
});
