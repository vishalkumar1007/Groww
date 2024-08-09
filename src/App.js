import './App.css';
import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import Login from './page/Login/Login';
import ForgetPassword from './page/ForgetPassword/ForgetPassword';
import Home from './page/Home/Home';
import SignUp from './page/SignUp/SignUp';
import Dashboard from './page/Dashboard/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='forget' element={<ForgetPassword/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
