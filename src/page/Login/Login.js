import './Login.css';
import Logo_dark from '../../assets/svg/groww-logo-dark.svg'
const Login = ()=>{
    return(
        <div className="main_view">
            <div className='main_center_element'>
                <div className='top_element'>
                    <div className='logo_icon'>
                        <img src={Logo_dark} alt="" />
                    </div>
                </div>
                <div className='bottom_element'>
                    <div className='login_box'>
                        <div className='login_left'>
                            
                        </div>
                        <div className='login_right'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;