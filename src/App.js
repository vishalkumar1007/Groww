import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login/Login';
import ForgotPassword from './page/ForgotPassword/ForgotPassword.jsx';
import Home from './page/Home/Home';
import SignUp from './page/SignUp/SignUp';
import Dashboard from './page/Dashboard/Dashboard';
import PageNotFound from './component/PageNotFound/PageNotFound';
import Error from './component/UnexpectedError/UnexpectedError';
import AllStocksFilter from './page/AllStocksFilter/AllStocksFilter';
import ComingSoon from './component/ComingSoon/ComingSoon';
import Wallet from './page/Wallet/Wallet';
import ShopCart from './page/ShopCart/ShopCart.jsx';
import StockDetail from './page/StockDetail/StockDetail.jsx';
// import IntroAlert from './component/IntroAlert/IntroAlert.jsx';  
import Investments from './page/Investments/Investments.jsx';
import Watchlist from './page/Watchlist/Watchlist.jsx';
import SearchStock from './component/SearchStock/SearchStock.jsx';
import Profile from './page/Profile/Profile.jsx';
import TopStock from './page/TopStocks/TopStocks.jsx';

// -----------------
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserWatchlistApiDataThunk,
  selectUserWatchlistValue,
  // selectUserWatchlistLoading,
  // selectUserWatchlistError,
  // selectUserWatchlistErrorMessage
} from "./features/userWatchlist/centralExportUserWatchlist.js";
import { selectUserProfileData } from "./features/userProfileData/centralExportUserProfileData.js"
import {
  selectUserCartValue,
  fetchUserCartThunk,
  // selectUserCartIsLoading,
  // selectUserCartIsError,
  // selectUserCartErrorMessage
} from "./features/userCart/centralExportUserCart.js";

import {
  fetchMostBoughtStockThunk,
  selectMostBoughtStockData,
  selectMostBoughtStockLoading,
  // selectMostBoughtStockError,
} from "./features/api_lab/mostBoughtStocksApiData/centralExportMostBoughtStocks.js";

import {
  fetchTopGainerStockThunk,
  selectTopGainerStockData,
  selectTopGainerStockLoading,
  // selectTopGainerStockError,
  // selectTopGainerStockErrorMessage,
} from "./features/api_lab/topGainerStockApiData/centralExportTopGainer.js";

import {
  fetchStockNewsApiThunk,
  selectStockNewsApiData,
  selectStockNewsApiLoading,
  // selectStockNewsApiError,
  // selectStockNewsApiErrorMsg,
} from "./features/api_lab/stockNewsApiData/centralExportStockNewsApiData.js";

import {
  fetchTopLoserStockThunk,
  selectorTopLoserStockData,
  selectorTopLoserStockLoading,
  // selectorTopLoserStockError,
  // selectorTopLoserStockErrorMsg,
} from "./features/api_lab/topLosersStockApiData/centralExportTopLoserStock.js";


import {
  fetchTopMarketCapStockThunk,
  selectorTopMarketCapStockData,
  selectorTopMarketCapStockLoading,
  // selectorTopMarketCapStockError,
  // selectorTopMarketCapStockErrorMsg
} from "./features/api_lab/topMarketCapStockApiData/centralExportTopMarketCapStockApiData.js";



function App() {
  const dispatch = useDispatch();
  const userWatchlistApiData = useSelector(selectUserWatchlistValue);
  const userProfileData = useSelector(selectUserProfileData);
  const userCartApiData = useSelector(selectUserCartValue);
  // const userWatchlistApiLoading = useSelector(selectUserWatchlistLoading);
  // const userCartApiLoading = useSelector(selectUserCartIsLoading);

  // console.log('userWatchlistApiData ::: ', userWatchlistApiData)
  // console.log('userCartData ::: ', userCartApiData)

  // Assume loading states start as `true`
  const [userWatchlistApiLoading, setUserWatchlistApiLoading] = useState(true);
  const [userCartApiLoading, setUserCartApiLoading] = useState(true);

  useEffect(() => {
    if (userProfileData.userEmail) {
      // Dispatch fetch thunks and set loading states to `false` once data is fetched
      dispatch(fetchUserWatchlistApiDataThunk(userProfileData.userEmail))
        .finally(() => setUserWatchlistApiLoading(false));

      dispatch(fetchUserCartThunk(userProfileData.userEmail))
        .finally(() => setUserCartApiLoading(false));
    }
  }, [dispatch, userProfileData]);

  useEffect(() => {
    const saveData = async () => {
      try {
        if (userWatchlistApiLoading || userCartApiLoading) {
          return;
        }

        if (!(userProfileData.userEmail && userWatchlistApiData && userCartApiData)) {
          return;
        }

        // Prepare watchlist data
        const watchListData = {
          email: userProfileData.userEmail,
          userWatchlistData: [...userWatchlistApiData]
        };
        const userWatchlistPushApi = 'http://localhost:8080/api/user/updateUserWatchlist';
        const blobWatchlist = new Blob([JSON.stringify(watchListData)], { type: 'application/json' });

        const success = await navigator.sendBeacon(userWatchlistPushApi, blobWatchlist);
        localStorage.setItem('WatchlistDataSaveStatus', success ? 'Saved successfully' : 'Error: Network issue');

        // Prepare cart data
        const cartData = {
          email: userProfileData.userEmail,
          userCartData: [...userCartApiData]
        };
        const userCartPushApi = 'http://localhost:8080/api/user/updateUserCart';
        const blobCart = new Blob([JSON.stringify(cartData)], { type: 'application/json' });

        const successCart = await navigator.sendBeacon(userCartPushApi, blobCart);
        localStorage.setItem('cartDataSaveStatus', successCart ? 'Saved successfully' : 'Error: Network issue');

      } catch (error) {
        console.error("An error occurred while saving data:", error);
        localStorage.setItem('WatchlistDataSaveStatus', 'Error: Could not save data');
        localStorage.setItem('cartDataSaveStatus', 'Error: Could not save data');
      }
    };


    // Add event listeners to `beforeunload` and `popstate`
    window.addEventListener('popstate', saveData);
    window.addEventListener('beforeunload', saveData);

    // Clean up the event listeners on unmount
    return () => {
      window.removeEventListener('beforeunload', saveData);
      window.removeEventListener('popstate', saveData);
    };
  }, [userCartApiData, userCartApiLoading, userProfileData.userEmail, userWatchlistApiData, userWatchlistApiLoading]);


  // handel to calling mostBoughStock api in redux -----------------

  const mostBoughtStocksApiData = useSelector(selectMostBoughtStockData);
  useEffect(() => {
    if (mostBoughtStocksApiData.length === 0) {
      // console.log("mostBoughtStockData api call");
      dispatch(fetchMostBoughtStockThunk());
    }
  }, [dispatch, mostBoughtStocksApiData]);

  // handel to calling topGainerStock api in redux ------------------

  const topGainerStockApiData = useSelector(selectTopGainerStockData);
  useEffect(() => {
    if (topGainerStockApiData.length === 0) {
      // console.log("topGainStockData api call");
      dispatch(fetchTopGainerStockThunk());
    }
  }, [dispatch, topGainerStockApiData]);

  // handel to calling stockNewsApiData api in redux ----------------

  const stockNewsApiData = useSelector(selectStockNewsApiData);
  useEffect(() => {
    if (stockNewsApiData.length === 0) {
      // console.log("stockNewsApiData api call");
      dispatch(fetchStockNewsApiThunk());
    }
  }, [dispatch, stockNewsApiData]);

  // handel to calling topLoserStockApiData api in redux ----------------

  const topLoserStockApiData = useSelector(selectorTopLoserStockData);
  useEffect(() => {
    if (topLoserStockApiData.length === 0) {
      // console.log("topLoserStockApiData api call");
      dispatch(fetchTopLoserStockThunk());
    }
  }, [dispatch, topLoserStockApiData]);


  
  // handel to calling topByMarketCapStock api in redux -----------------

  const topMarketCapStockApiData = useSelector(selectorTopMarketCapStockData);
  useEffect(() => {
    if (topMarketCapStockApiData.length === 0) {
      dispatch(fetchTopMarketCapStockThunk());
    }
  }, [dispatch, topMarketCapStockApiData]);


  return (
    // basename="/Groww" // for production ---------------
    <BrowserRouter basename="/Groww">
      <Routes>
        <Route path='*' element={<PageNotFound />} errorElement={<Error />} />
        <Route path='/' element={<Home />} errorElement={<Error />} />
        <Route path='login' element={<Login />} errorElement={<Error />} />
        <Route path='forgot' element={<ForgotPassword />} errorElement={<Error />} />
        <Route path='signup' element={<SignUp />} errorElement={<Error />} />
        <Route path='dashboard' element={<Dashboard />} errorElement={<Error />} />
        <Route path='all_stocks_filter' element={<AllStocksFilter />} errorElement={<Error />} />
        <Route path='under_construction' element={<ComingSoon />} errorElement={<Error />} />
        <Route path='wallet' element={<Wallet />} errorElement={<Error />} />
        <Route path='wallet' element={<Wallet />} errorElement={<Error />} />
        <Route path='shop_cart' element={<ShopCart />} errorElement={<Error />} />
        <Route path='stock_detail' element={<StockDetail />} errorElement={<Error />} />
        <Route path='/user/investments' element={<Investments />} errorElement={<Error />} />
        {/* <Route path='/IntroAlert' element={<IntroAlert/>} errorElement={<Error/>} /> */}
        <Route path='/dashboard/watchlist' element={<Watchlist />} errorElement={<Error />} />
        <Route path='/searchStocks' element={<SearchStock />} errorElement={<Error />} />
        <Route path='/user/profile' element={<Profile />} errorElement={<Error />} />
        <Route path='/dashboard/topStock' element={<TopStock />} errorElement={<Error />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
