import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopGainerStockThunk = createAsyncThunk('fetchTopGainerStock',async ()=>{
    const topGainerStocksApi = 'http://localhost:8080/api/specific/stock/topGainerStocks';

    const response = await fetch(topGainerStocksApi,{
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