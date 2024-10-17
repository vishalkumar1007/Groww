import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStockNewsApiThunk = createAsyncThunk('stockNewsApiData', async ()=>{
    const api = 'http://localhost:8080/api/specific/stock/newsStock';
    const response = await fetch(api, {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(!response.ok){
        throw new Error('Error while fetching stockNewsApiThink');
    }

    return response.json();
})