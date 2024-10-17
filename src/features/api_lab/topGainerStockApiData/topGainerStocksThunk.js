import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopGainerStockThunk = createAsyncThunk('fetchTopGainerStock',async ()=>{
    const api = 'http://localhost:8080/api/specific/stock/topGainerStocks';

    const response = await fetch(api,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });
    if(!response.ok){
        throw new Error('error while fetch TopGainerStockData');
    }
    return response.json();
});