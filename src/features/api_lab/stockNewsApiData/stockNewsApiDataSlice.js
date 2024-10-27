import { createSlice } from "@reduxjs/toolkit";
import {fetchStockNewsApiThunk} from './stockNewsApiDataThunk';

const initialState = {
    isLoading : false,
    data : [],
    isError : false,
    errorMsg : ''
}

const stockNewsApiSlice = createSlice({
    name:'stockNewsApiData',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchStockNewsApiThunk.pending,(state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchStockNewsApiThunk.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchStockNewsApiThunk.rejected , (state,action)=>{
            state.isError = true;
            state.errorMsg = action.error.message;
        })
    }
})

export default stockNewsApiSlice.reducer;