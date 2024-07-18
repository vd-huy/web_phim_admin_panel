import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countryList : []
};

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers:{
        "getCountry" : (state,action)=>{
            
            state.countryList = [...action.payload];
            
        }
    }
})

export const {getCountry} = countrySlice.actions;
export default countrySlice.reducer;