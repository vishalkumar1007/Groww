import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserBuyStockData = createAsyncThunk('userBuyStockData',async (email)=>{
    const buyStockDataApi = 'http://localhost:8080/api/user/getUserBuyData';
    const token = localStorage.getItem('token');
    if(!token){
        return;
    }
    const response = await fetch(buyStockDataApi ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({email})
    });

    if(!response.ok){
        throw new Error('error while fetch user buy stock data');
    }

    return await response.json();
})