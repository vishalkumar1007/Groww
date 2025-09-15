import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserTransactionDataThunk = createAsyncThunk('fetchUserTransactionData', async (email) => {   
    const transactionDataApi = 'https://groww-backend-omega.vercel.app/api/payment/getUserTransactionAndWallet';
    const localStorageToken = localStorage.getItem('token');
    const data = {
        email
    }
    if (!localStorageToken && !email) {
        return
    }
    const response = await fetch(transactionDataApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorageToken}`
        },
        body:JSON.stringify(data)
    })
    if (!response.ok) {
        console.log('response not ok');
        throw new Error('error while fetching transaction data');
    }
    return await response.json();
})