import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./userSlice";
import categorySlice from "./categorySlice";
import countrySlice from "./countrySlice";
import genreSlice from "./genreSlice";

export const store = configureStore({
    reducer: {
        user : UserSliceReducer,
        category : categorySlice,
        country : countrySlice,
        genre : genreSlice,
    }
})