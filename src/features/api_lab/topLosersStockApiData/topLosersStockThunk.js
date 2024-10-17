import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopLoserStockThunk = createAsyncThunk('topLoserStockData',async()=>{

    const topLoserStocksApi = 'http://localhost:8080/api/specific/stock/topLoserStocks';
    const response = await fetch(topLoserStocksApi,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(!response.ok){
        throw new Error('Error while fetch topLoserStockData');
    }

    return response.json();
})