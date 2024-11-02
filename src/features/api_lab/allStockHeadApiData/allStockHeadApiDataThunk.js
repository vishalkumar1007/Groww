import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllStockApiThunk = createAsyncThunk('allStockApiData', async ()=>{
    const allStockHeadApi = 'http://localhost:8080/api/stock/getAllHead';
    // const allStockHeadApi = '';
    const response = await fetch(allStockHeadApi,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(!response){
        throw new Error('Trouble to fetch ALl Stock Head Data');
    }
    return await response.json();
})