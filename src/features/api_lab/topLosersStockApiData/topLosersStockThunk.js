import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopLoserStockThunk = createAsyncThunk('topLoserStockData',async()=>{

    const api = 'http://localhost:8080/api/specific/stock/topLoserStocks';
    const response = await fetch(api,{
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