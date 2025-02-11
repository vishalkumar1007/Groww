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
import pageNavigateStalkReducer from '../features/pageRouteStalk/pageRouteStalkSlice';
import userTransactionDataReducer from '../features/api_lab/userTransactionData/userTransactionDataSlice.js';
import userBuyStockDataReducer from '../features/api_lab/userBuyStockData/userBuyStockDataSlice';
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
    userWatchlistAPiData:userWatchlistApiReducer,
    pageRouteStalkData:pageNavigateStalkReducer,
    userTransactionData:userTransactionDataReducer,
    userBuyStockData:userBuyStockDataReducer
});

export default rootReducer;