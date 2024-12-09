import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageShow : 'Notification msg',
    positiveResponse : true,
    makeFire : false,
}

const msgPopUpHandelSlice = createSlice({
    name:'handelMsgPopUp',
    initialState,
    reducers:{
        fireTheMessagePopUp: (state,action)=>{
            state.messageShow = action.payload.messageShow;
            state.positiveResponse = action.payload.positiveResponse;
            state.makeFire = action.payload.makeFire;
        }
    }
})

export const {fireTheMessagePopUp}   = msgPopUpHandelSlice.actions;
export default msgPopUpHandelSlice.reducer;