import { combineReducers } from "@reduxjs/toolkit";
import userWatchlistReducer from '../features/userWatchlist/userWatchlistSlice';
import mostBoughtStockReducer from '../features/api_lab/mostBoughtStocksApiData/mostBoughtStocksSlice';
import topGainerStockReducer from '../features/api_lab/topGainerStockApiData/topGainerStocksSlice';
import stockNewsApiDataReducer from '../features/api_lab/stockNewsApiData/stockNewsApiDataSlice';


const rootReducer = combineReducers({
    userWatchlist:userWatchlistReducer,
    mostBoughtStock:mostBoughtStockReducer,
    topGainerStock:topGainerStockReducer,
    stockNewsData:stockNewsApiDataReducer
});

export default rootReducer;