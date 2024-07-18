import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genreList : []
};

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers:{
        "getGenre" : (state,action)=>{
            
            state.genreList = [...action.payload];
            
        }
    }
})

export const {getGenre} = genreSlice.actions;
export default genreSlice.reducer;