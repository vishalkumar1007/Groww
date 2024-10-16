import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMostBoughtStockThunk = createAsyncThunk('fetchMostBoughtStock', async ()=>{
    const api = 'http://localhost:8080/api/specific/stock/mostBoughtOnGrowwStocks';
    const response = await fetch(api,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data');  
    }
    return response.json();
});
