import {createSlice} from '@reduxjs/toolkit';
import {fetchMostBoughtStockThunk} from './mostBoughtStocksThunk'

const initialState ={
    isLoading:false,
    data:[],
    isError:false,
    errorMsg:''
}
const mostBoughtStocksSlice = createSlice({
    name:'mostBoughtStocksData',
    initialState ,
    extraReducers: (builder)=> {
        builder.addCase(fetchMostBoughtStockThunk.pending , (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(fetchMostBoughtStockThunk.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchMostBoughtStockThunk.rejected , (state,action)=>{
            state.isError = true;
            state.errorMsg = action.error.message;
        })
    }
})

export default mostBoughtStocksSlice.reducer;