import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMostBoughtStockThunk = createAsyncThunk('fetchMostBoughtStock', async ()=>{
    const mostBoughtOnGrowwStocksAPi = 'http://localhost:8080/api/specific/stock/mostBoughtOnGrowwStocks';
    const localStorageToken = localStorage.getItem('token');
    if(!localStorageToken){
        return
    }
    const response = await fetch(mostBoughtOnGrowwStocksAPi,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorageToken}`
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch MostBoughStockData');  
    }
    return response.json();
});
