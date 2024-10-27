import {fetchUserWatchlistApiDataThunk} from './userWatchlistDataThunk';
import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    isLoading:false,
    data:[],
    isError:false,
    errorMsg : ''
}

const userWatchlistSlice = createSlice({
    name:'userWatchlistAPiData',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchUserWatchlistApiDataThunk.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(fetchUserWatchlistApiDataThunk.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload;
        })
        builder.addCase(fetchUserWatchlistApiDataThunk.rejected,(state,action)=>{
            state.isError = true;
            state.errorMsg = action.error.message;
        })
    }
})


export default userWatchlistSlice.reducer ;