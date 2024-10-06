import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data : []
}

const userInformationSlice = createSlice({
    name:'userInformation',
    initialState ,
    reducers:{
        addUserInformation:(state , action)=>{
            console.log('ok---' , action.payload)
            state.data.push(action.payload);
        },
        removeUserInformation:(state , action)=>{
            state.data = [];
        }
    }
});

export const {addUserInformation,removeUserInformation} = userInformationSlice.actions;
export default userInformationSlice.reducer;