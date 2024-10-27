import { combineReducers } from "@reduxjs/toolkit";
import userWatchlistReducer from '../features/userWatchlist/userWatchlistSlice';
import mostBoughtStockReducer from '../features/api_lab/mostBoughtStocksApiData/mostBoughtStocksSlice';
import topGainerStockReducer from '../features/api_lab/topGainerStockApiData/topGainerStocksSlice';
import stockNewsApiDataReducer from '../features/api_lab/stockNewsApiData/stockNewsApiDataSlice';
import topLoserStockReducer from '../features/api_lab/topLosersStockApiData/topLosersStockSlice';
import msgPopUpReducer from '../features/msgPopUpHandel/msgPopUpHandelSlice';
import userCartReducer from '../features/userCart/userCartSlice';
import userProfileReducer from '../features/userProfileData/userProfileDataSlice.js'
import allStockHeadReducer from '../features/api_lab/allStockHeadApiData/allStockHeadApiDataSlice'
import topMarketCapStockReducer from '../features/api_lab/topMarketCapStockApiData/topMarketCapStockApiDataSlice';
import userWatchlistApiReducer from '../features/api_lab/userWatchlistData/userWatchlistDataSlice';

const rootReducer = combineReducers({
    userWatchlist:userWatchlistReducer,
    mostBoughtStock:mostBoughtStockReducer,
    topGainerStock:topGainerStockReducer,
    stockNewsData:stockNewsApiDataReducer,
    topLoserStockData:topLoserStockReducer,
    handelMsgPopUp:msgPopUpReducer,
    userCartData:userCartReducer,
    userProfileData:userProfileReducer,
    allStockApiData:allStockHeadReducer,
    topMarketCapStock:topMarketCapStockReducer,
    userWatchlistAPiData:userWatchlistApiReducer
});

export default rootReducer;