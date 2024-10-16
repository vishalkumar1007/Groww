import { combineReducers } from "@reduxjs/toolkit";
import userWatchlistReducer from '../features/userWatchlist/userWatchlistSlice';
import mostBoughtStockReducer from '../features/api_lab/mostBoughtStocksApiData/mostBoughtStocksSlice';

const rootReducer = combineReducers({
    userWatchlist:userWatchlistReducer,
    mostBoughtStock:mostBoughtStockReducer
});

export default rootReducer;