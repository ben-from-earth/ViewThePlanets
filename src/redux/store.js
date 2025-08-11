import { configureStore } from "@reduxjs/toolkit";
import solarReducer from "./solarSlice.js";

const store = configureStore({
  reducer: {
    solar: solarReducer,
  },
});

export default store;
