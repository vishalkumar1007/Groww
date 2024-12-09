import {createSlice} from '@reduxjs/toolkit';
import {fetchUserBuyStockData} from './userBuyStockDataThunk';

const initialState = {
    isLoading:false,
    data:[],
    email:null,
    isError:false
}

const userBuyStockDataSlice = createSlice({
    name:'userBuyStockData',
    initialState,
    extraReducers:(build)=>{
        build.addCase(fetchUserBuyStockData.pending,(state,action)=>{
            state.isLoading = true;
            state.isError = false;
        })
        build.addCase(fetchUserBuyStockData.fulfilled,(state,action)=>{
            if(action.payload){
                state.isLoading = false;
                state.data = action.payload.ownStocks;
                state.email = action.payload.email;
                state.isError = false;
            }
        })
        build.addCase(fetchUserBuyStockData.rejected,(state,action)=>{
            state.isError = true;
        })
    }
});


export default userBuyStockDataSlice.reducer;