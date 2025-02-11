// Thunk to simulate an API call and asynchronous work
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserWatchlistApiDataThunk = createAsyncThunk(
    'userWatchlistApiDataThunk',
    async (userEmail) => {
        const userWatchlistApi = `http://localhost:8080/api/user/getUserWatchlistData?email=${userEmail}`;
        const localStorageToken = localStorage.getItem('token');
        if(!localStorageToken){
            return
        }

        const response = await fetch(userWatchlistApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorageToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Error while fetching userWatchlistData');
        }

        return await response.json();
    }
);
