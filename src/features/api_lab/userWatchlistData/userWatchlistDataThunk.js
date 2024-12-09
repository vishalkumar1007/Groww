import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserWatchlistApiDataThunk = createAsyncThunk('userWatchlistApiDataThunk',async ()=>{
    const userWatchlistApi = '';
    const userWatchlistData = await fetch(userWatchlistApi , {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(!userWatchlistData){
        throw new Error('Error while fetching userWatchlistData');
    }

    return await userWatchlistApi.json();
})