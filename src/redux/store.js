import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        user : UserSliceReducer
    }
})