import {fetchUserCartThunk} from './userCartDataThunk'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading : false,
    data : [],
    isError : false,
    errorMsg : ''
}



const userCardDataSlice = createSlice({
    name:'userCardApiData',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchUserCartThunk.pending , (state,action)=>{
            state.isLoading = true
        })

        builder.addCase(fetchUserCartThunk.fulfilled , (state,action)=>{
            state.isLoading = false
            state.data = action.payload
        })

        builder.addCase(fetchUserCartThunk.pending , (state,action)=>{
            state.isLoading = true
            state.errorMsg = action.error.message
        })
    }
})

export default userCardDataSlice;