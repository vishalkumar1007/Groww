import './App.css';
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import Login from './page/Login/Login';
import ForgetPassword from './page/ForgetPassword/ForgetPassword';
import Home from './page/Home/Home';
import SignUp from './page/SignUp/SignUp';
import Dashboard from './page/Dashboard/Dashboard';
import PageNotFound from './component/PageNotFound/PageNotFound';
import Error from './component/UnexpectedError/UnexpectedError';
import AllStocksFilter from './page/AllStocksFilter/AllStocksFilter';
import ComingSoon from './component/ComingSoon/ComingSoon';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='*' element={<PageNotFound/>} errorElement={<Error/>}/>
        <Route path='/' element={<Home/>} errorElement={<Error/>}/>
        <Route path='login' element={<Login/>} errorElement={<Error/>}/>
        <Route path='forget' element={<ForgetPassword/>} errorElement={<Error/>}/>
        <Route path='signup' element={<SignUp/>} errorElement={<Error/>}/>
        <Route path='dashboard' element={<Dashboard/>} errorElement={<Error/>}/>
        <Route path='all_stocks_filter' element={<AllStocksFilter/>} errorElement={<Error/>}/>
        <Route path='under_construction' element={<ComingSoon/>} errorElement={<Error/>}/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
