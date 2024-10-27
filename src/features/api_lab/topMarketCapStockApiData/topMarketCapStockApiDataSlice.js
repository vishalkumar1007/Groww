import {fetchTopMarketCapStockThunk} from './topMarketCapStockApiDataThunk';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading : false,
    data:[],
    isError:false,
    errorMsg:''
}

const topMarketCapStockSlice = createSlice({
    name:'topMarketCapStock',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchTopMarketCapStockThunk.pending , (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchTopMarketCapStockThunk.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.data = action.payload;
        })
        builder.addCase(fetchTopMarketCapStockThunk.rejected,(state,action)=>{
            state.isError = true;
            state.errorMsg = action.error.message;
        })
    }
})

export default topMarketCapStockSlice.reducer;