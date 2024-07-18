import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryList : []
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{
        "getCategory" : (state,action)=>{
            
            state.categoryList = [...action.payload];
            
        }
    }
})

export const {getCategory} = categorySlice.actions;
export default categorySlice.reducer;