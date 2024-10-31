import {createAsyncThunk} from '@reduxjs/toolkit'


export const fetchTopMarketCapStockThunk = createAsyncThunk('topMarketCapStockData',async ()=>{
    const topMarketCapStockApiDataApi = 'http://localhost:8080/api/stock/getTopCapStock';
    const localStorageToken = localStorage.getItem('token');
    if(!localStorageToken){
        return
    }
    const response = await fetch(topMarketCapStockApiDataApi , {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorageToken}`
        }
    })
    if(!response.ok){
        throw new Error('error while fetching topMarketCaoStockData');
    }

    return await response.json();

})