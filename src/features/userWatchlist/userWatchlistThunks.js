// src/features/featureA/featureAThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { increment, decrement } from './userWatchlistSlice';

// Thunk to simulate an API call and increment the state
export const fetchAndIncrement = createAsyncThunk(
  'featureA/fetchAndIncrement',
  async (amount, { dispatch, rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(amount), 1000)
      );
      dispatch(increment(response));
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch and increment');
    }
  }
);

// Thunk to simulate an API call and decrement the state
export const fetchAndDecrement = createAsyncThunk(
  'featureA/fetchAndDecrement',
  async (amount, { dispatch, rejectWithValue }) => {
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(amount), 1000)
      );
      dispatch(decrement(response));
      return response;
    } catch (error) {
      return rejectWithValue('Failed to fetch and decrement');
    }
  }
);
