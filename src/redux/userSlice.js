import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {
        email : null,
        name : null,
        role : null,
    },
    jwt : null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        "login" : (state,action)=>{
            state.jwt = action.payload;
        },
        "getProfile" : (state,action)=>{
            state.profile.email = action.payload.email;
            state.profile.name = action.payload.fullName;
            state.profile.role = action.payload.role;
        }
    }
})

export const { login , getProfile} = userSlice.actions;
export default userSlice.reducer;