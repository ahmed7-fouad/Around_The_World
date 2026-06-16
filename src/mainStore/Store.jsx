import { configureStore } from "@reduxjs/toolkit";
import ThemeSwitcherReducer from "../allSlices/ThemeSwitcherSlice";
import CountriesSliceReducer from "../allSlices/CountriesDataSlice";
import SelectedCountryReducer from "../allSlices/selectedCountrySlice";
export const store = configureStore({
  reducer: {
    themeSwitcher: ThemeSwitcherReducer,
    countriesReducer: CountriesSliceReducer,
    selectedCountryReducer:SelectedCountryReducer,
  },
});