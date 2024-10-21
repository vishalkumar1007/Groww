import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : []
}

const userProfileDataSlice = createSlice({
    name:'userProfileData',
    initialState,
    reducers:{
        addUserDetail:(state,action)=>{
            state.data = action.payload;
        }
    }
});

export const {addUserDetail} = userProfileDataSlice.actions;
export default userProfileDataSlice.reducer;