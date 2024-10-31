import {createSlice} from '@reduxjs/toolkit';
import {fetchTopLoserStockThunk} from './topLosersStockThunk';


const initialState = {
    isLoading : false,
    data : [],
    isError : false,
    errorMsg : ''
}

const topLoserStockSlice = createSlice({
    name:'topLoserStockData',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchTopLoserStockThunk.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchTopLoserStockThunk.fulfilled , (state,action)=>{
            if(action.payload){
                state.isLoading = false;
                state.data = action.payload;
            }
        })
        builder.addCase(fetchTopLoserStockThunk.rejected,(state,action)=>{
            state.isError = true;
            state.errorMsg = action.error.message;
        })
    }
})

export default topLoserStockSlice.reducer;