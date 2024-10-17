import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStockNewsApiThunk = createAsyncThunk('stockNewsApiData', async ()=>{
    const newsStockApi = 'http://localhost:8080/api/specific/stock/newsStock';
    const response = await fetch(newsStockApi, {
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