import { combineReducers } from "@reduxjs/toolkit";
import userWatchlistReducer from '../features/userWatchlist/userWatchlistSlice';

const rootReducer = combineReducers({
    userWatchlist:userWatchlistReducer
});

export default rootReducer;