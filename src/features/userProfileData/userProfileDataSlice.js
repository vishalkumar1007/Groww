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
        },
        deleteUserProfileDetail:(state,action)=>{
            // console.log('remove profile data -------------');
            state.data = []
        }
    }
});

export const {addUserDetail,deleteUserProfileDetail} = userProfileDataSlice.actions;
export default userProfileDataSlice.reducer;