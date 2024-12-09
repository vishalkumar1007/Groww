import {createSlice} from '@reduxjs/toolkit';
import {fetchUserWatchlistApiDataThunk} from './userWatchlistThunks';

const initialState = {
    isLoading:false,
    value:[],
    isError:false,
    errorMsg:''
}


const userWatchlistSlice = createSlice({
    name:'userWatchlist',
    initialState ,
    reducers:{
        addToWatchlist:(state,action)=>{
            state.value.push(action.payload);
        },
        removeFromWatchlist:(state,action)=>{
            state.value = state.value.filter(item=>item.stock_id !== action.payload.stock_id);
        },
        deleteAllWatchlistData:(state,action)=>{
            // console.log('remove watchlist -------------');
            state.value = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserWatchlistApiDataThunk.pending , (state,action)=>{
            state.isLoading=true
            state.isError=false
        })
        builder.addCase(fetchUserWatchlistApiDataThunk.fulfilled , (state,action)=>{
            if(!action.payload){
                return 
            }
            state.isLoading=false
            state.isError=false
            state.value = []
            // state.data.push(action.payload.userWatchlist.userWatchlistData);
            const WATCHLIST_API_DATA = action.payload.userWatchlist.userWatchlistData;
            for (const element of WATCHLIST_API_DATA) {
                state.value.push(element);
            }
            // console.log('WATCHLIST API slice : ',action.payload.userWatchlist.userWatchlistData);
            // state.value.push(action.payload.userWatchlist.userWatchlistData);
        })
        builder.addCase(fetchUserWatchlistApiDataThunk.rejected , (state,action)=>{
            state.isError=true;
            state.errorMsg = action.error.message;
        })
    }
});

export const {addToWatchlist,removeFromWatchlist,deleteAllWatchlistData} = userWatchlistSlice.actions;
export default userWatchlistSlice.reducer;