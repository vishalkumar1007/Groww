import { createSlice } from "@reduxjs/toolkit";
import { fetchTopGainerStockThunk } from './topGainerStocksThunk';

const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    errorMsg: null
}

const topGainerSlice = createSlice({
    name: 'topGainerStockData',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchTopGainerStockThunk.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTopGainerStockThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTopGainerStockThunk.rejected, (state, action) => {
            console.log('rejected error in topGainerStock: ', action.error.message); 
            state.isError = true;
            state.errorMsg = action.error.message;  
        });

    }
})

export default topGainerSlice.reducer;