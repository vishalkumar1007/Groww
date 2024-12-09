import { createSlice } from "@reduxjs/toolkit";
import {fetchUserTransactionDataThunk} from './userTransactionDataThunk';

const initialState = {
    isLoading:false,
    walletBalance:null,
    transactionData:[],
    isError:false,
    errMsg:''
}

const userTransactionDataSlice = createSlice({
    name:'userTransactionData',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchUserTransactionDataThunk.pending,(state,action)=>{
            state.isLoading = true
            state.isError=false
        })
        builder.addCase(fetchUserTransactionDataThunk.fulfilled,(state,action)=>{
            state.isLoading=false;
            if(action.payload){
                state.transactionData = action.payload.transactions;
                state.walletBalance = action.payload.balance.toFixed(2);
            }
            state.isError=false
        })
        builder.addCase(fetchUserTransactionDataThunk.rejected,(state,action)=>{
            state.isError=true
            state.errMsg=action.error.message;
        })
    }
})

export default userTransactionDataSlice.reducer;