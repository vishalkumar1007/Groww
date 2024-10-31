import { createSlice } from "@reduxjs/toolkit";
import {fetchAllStockApiThunk} from './allStockHeadApiDataThunk';

const initialState = {
    isLoading:false,
    data:[],
    isError:false,
    ErrorMsg : ''
}

const allStockApiDataSlice = createSlice({
    name:'allStockApiData',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchAllStockApiThunk.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(fetchAllStockApiThunk.fulfilled,(state,action)=>{
            if(action.payload){
                state.isLoading=false;
                state.data = action.payload;
            }
        })
        builder.addCase(fetchAllStockApiThunk.rejected,(state,action)=>{
            state.isError=true;
            state.ErrorMsg = action.error.message;
        })
    }
})

export default allStockApiDataSlice.reducer;