import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value:[],
    loading:false,
    error:null
}


const userWatchlistSlice = createSlice({
    name:'userWatchlist',
    initialState ,
    reducers:{
        addToWatchlist:(state,action)=>{
            // console.log('Adding to watchlist:', action.payload);
            state.value.push(action.payload);
        },
        removeFromWatchlist:(state,action   )=>{
            // console.log('Removing from watchlist:', action.payload);
            state.value = state.value.filter(item=>item.title !== action.payload.title);
        },
    }
});

export const {addToWatchlist,removeFromWatchlist} = userWatchlistSlice.actions;
export default userWatchlistSlice.reducer;