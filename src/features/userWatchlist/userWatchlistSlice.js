import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value:[]
}


const userWatchlistSlice = createSlice({
    name:'userWatchlist',
    initialState ,
    reducers:{
        addToWatchlist:(state,action)=>{
            state.value.push(action.payload);
        },
        removeFromWatchlist:(state,action)=>{
            state.value = state.value.filter(item=>item.stockId !== action.payload.stockId);
        },
    }
});

export const {addToWatchlist,removeFromWatchlist} = userWatchlistSlice.actions;
export default userWatchlistSlice.reducer;