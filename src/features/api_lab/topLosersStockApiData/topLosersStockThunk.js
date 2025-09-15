import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopLoserStockThunk = createAsyncThunk('topLoserStockData',async()=>{

    const topLoserStocksApi = 'https://groww-backend-omega.vercel.app/api/specific/stock/topLoserStocks';
    const localStorageToken = localStorage.getItem('token');
    if(!localStorageToken){
        return
    }
    const response = await fetch(topLoserStocksApi,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorageToken}`
        }
    });

    if(!response.ok){
        throw new Error('Error while fetch topLoserStockData');
    }

    return response.json();
})