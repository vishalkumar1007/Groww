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

// -----------------
import { useEffect,useState } from "react";
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
    const saveData = () => {
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
      const success = navigator.sendBeacon(userWatchlistPushApi, blobWatchlist);
      localStorage.setItem('WatchlistDataSaveStatus', success ? 'Saved successfully' : 'Error: Network issue');

      // Prepare cart data
      const cartData = {
        email: userProfileData.userEmail,
        userCartData: [...userCartApiData]
      };
      const userCartPushApi = 'http://localhost:8080/api/user/updateUserCart';
      const blobCart = new Blob([JSON.stringify(cartData)], { type: 'application/json' });
      const successCart = navigator.sendBeacon(userCartPushApi, blobCart);
      localStorage.setItem('cartDataSaveStatus', successCart ? 'Saved successfully' : 'Error: Network issue');
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
      </Routes>
    </BrowserRouter>

  );
}

export default App;
