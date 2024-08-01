import { useEffect, useState } from 'react';
import './Login.css';
import Logo_dark from '../../assets/svg/groww-logo-dark.svg'
import google_svg from '../../assets/svg/google.icon.svg'

const Login = () => {
    const [inputActive, setInputActive] = useState(false);
    const [userEmailId, setUserEmailId] = useState('');
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [emailValidFromDataBase, setemailValidFromDataBase] = useState(false);
    const checkInputFocus = () => {
        setInputActive(true);
    }
    const handleBlur = (event) => {
        if (event.target.value === "") {
            setInputActive(false);
        }
    }

    useEffect(() => {
        if ((inputActive) && !(['@gmail.com'].some(operator => userEmailId.includes(operator)))) {
            setIncorrectEmail(true);
        } else if (inputActive === false) {
            setIncorrectEmail(false);
        } else {
            setIncorrectEmail(false);
        }
    }, [inputActive, userEmailId]);

    return (
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
                            <div className='login_left_inter'>
                                <div className='left_tagline_top'>
                                    <p id='left_tagline_top_text'>Simple, Free</p>
                                    <p id='left_tagline_top_text'>Investing.</p>
                                </div>
                                <div className='left_tagline_bottom'>
                                    <div id='interval'></div>
                                    <p id='left_tagline_bottom_text'>Mutual Funds</p>
                                </div>
                            </div>
                        </div>
                        <div className='login_right'>
                            <div className='login_right_arrange'>
                                <div className='login_with_google'>
                                    <div className='lwg_title'>
                                        <p>Welcome to Groww</p>
                                    </div>
                                    <div className='lwg_box'>
                                        <div className='lwg_btn'>
                                            <button className='lwg_btn_text'>
                                                <div id='lwg_img'><img src={google_svg} alt="google" /></div>
                                                <p>Continue with Google</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="or_main">
                                    <div className='or_box'>
                                        <div className='or_line'></div>
                                        <div className='or_text'><p>Or</p></div>
                                        <div className='or_line'></div>
                                    </div>
                                </div>
                                <div className='login_with_id'>
                                    {
                                        !emailValidFromDataBase ?
                                            <div className='input_email_div'>
                                                <div className='ied_center'>
                                                    <label id={inputActive ? 'placeholder_move' : 'placeholder_static'}>Your Email Address</label>
                                                    <input id={inputActive ? 'inputActive' : 'inputDeactivate'} type="email" onFocus={() => { checkInputFocus() }} onBlur={handleBlur} onChange={(e) => { setUserEmailId(e.target.value) }} />
                                                    <div className='email_error_div'>
                                                        {incorrectEmail ? <label id='email_incorrect_error'>Incorrect email</label> : ''}
                                                        {<br />}
                                                        {emailNotFoundError ? <label id='email_invalid_error'>Email invalid Create your account</label> : ''}
                                                    </div>
                                                </div>

                                            </div>
                                            :
                                            <div className='input_email_div'>
                                                <div className='input_email_div'>
                                                    <div className='ied_center'>
                                                        <label id={inputActive ? 'placeholder_move' : 'placeholder_static'}>Enter Password</label>
                                                        <input id={inputActive ? 'inputActive' : 'inputDeactivate'} type="email" onFocus={() => { checkInputFocus() }} onBlur={handleBlur} onChange={(e) => { setUserEmailId(e.target.value) }} />
                                                        <div className='email_error_div'>
                                                            {incorrectEmail ? <label id='email_incorrect_error'>Incorrect Password</label> : ''}
                                                            {<br />}
                                                            {emailNotFoundError ? <label id='email_invalid_error'>Incorrect Password</label> : ''}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                    }
                                    <div className='continue_btn_div'>
                                        <button id='cnt_btn'>Continue</button>
                                    </div>
                                    <div className='company_terms_div'>
                                        <p>By proceeding, I agree to <a href="https://google.com">T&C</a>, <a href="https://google.com">Privacy Policy</a> & <a href="https://google.com">Tariff Rates</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;