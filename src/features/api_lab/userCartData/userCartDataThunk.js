import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchUserCartThunk = createAsyncThunk('userCartApiDataThunk',async ()=>{
    const userCartApi = '';
    const cartApiResponse = fetch(userCartApi , {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(!cartApiResponse){
        throw new Error ('error while fetching userCardData');
    }

    return await cartApiResponse.json();
})