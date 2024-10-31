import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchUserCartThunk = createAsyncThunk('userCartApiDataThunk',async (userEmail)=>{
    const userCartApi = `https://groww-backend-omega.vercel.app/api/user/getUserCartData?email=${userEmail}`;
    const localStorageToken = localStorage.getItem('token');
    if(!localStorageToken){
        return
    }
    const response = await fetch(userCartApi , {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorageToken}`
        }
    })

    if(!response.ok){
        throw new Error ('error while fetching userCardData');
    }
    return await response.json();
})