import './App.css';
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
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

function App() {
  return (
    // basename="/Groww" // for production ---------------
    <BrowserRouter basename="/Groww">
      <Routes>
        <Route path='*' element={<PageNotFound/>} errorElement={<Error/>}/>
        <Route path='/' element={<Home/>} errorElement={<Error/>}/>
        <Route path='login' element={<Login/>} errorElement={<Error/>}/>
        <Route path='forgot' element={<ForgotPassword/>} errorElement={<Error/>}/>
        <Route path='signup' element={<SignUp/>} errorElement={<Error/>}/>
        <Route path='dashboard' element={<Dashboard/>} errorElement={<Error/>}/>
        <Route path='all_stocks_filter' element={<AllStocksFilter/>} errorElement={<Error/>}/>
        <Route path='under_construction' element={<ComingSoon/>} errorElement={<Error/>}/>
        <Route path='wallet' element={<Wallet/>} errorElement={<Error/>}/>
        <Route path='wallet' element={<Wallet/>} errorElement={<Error/>}/>
        <Route path='shop_cart' element={<ShopCart/>} errorElement={<Error/>}/>
        <Route path='stock_detail' element={<StockDetail/>} errorElement={<Error/>} />
        <Route path='/user/investments' element={<Investments/>} errorElement={<Error/>} />
        {/* <Route path='/IntroAlert' element={<IntroAlert/>} errorElement={<Error/>} /> */}
        <Route path='/dashboard/watchlist' element={<Watchlist/>} errorElement={<Error/>} />
        <Route path='/searchStocks' element={<SearchStock/>} errorElement={<Error/>} />
        <Route path='/user/profile' element={<Profile/>} errorElement={<Error/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
