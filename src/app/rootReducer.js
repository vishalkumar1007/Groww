import { combineReducers } from "@reduxjs/toolkit";
import userWatchlistReducer from '../features/userWatchlist/userWatchlistSlice';
import userInformationReducer from '../features/userInformation/userInformationSlice';

const rootReducer = combineReducers({
    userWatchlist:userWatchlistReducer,
    userInformation:userInformationReducer
});

export default rootReducer;