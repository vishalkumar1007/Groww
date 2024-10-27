import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchUserCartThunk = createAsyncThunk('userCartApiDataThunk',async (userEmail)=>{
    const userCartApi = `http://localhost:8080/api/user/getUserCartData?email=${userEmail}`;
    const response = await fetch(userCartApi , {
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(!response.ok){
        throw new Error ('error while fetching userCardData');
    }
    return await response.json();
})