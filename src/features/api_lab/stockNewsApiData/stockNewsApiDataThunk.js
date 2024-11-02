import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStockNewsApiThunk = createAsyncThunk('stockNewsApiData', async ()=>{
    const newsStockApi = 'http://localhost:8080/api/specific/stock/newsStock';
    const localStorageToken = localStorage.getItem('token');
    if(!localStorageToken){
        return
    }
    const response = await fetch(newsStockApi, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorageToken}`
        }
    })

    if(!response.ok){
        throw new Error('Error while fetching stockNewsApiThink');
    }

    return response.json();
})