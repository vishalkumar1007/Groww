import { useEffect, useState } from 'react';
import './Login.css';
import Logo_dark from '../../assets/svg/groww-logo-dark.svg'
import google_svg from '../../assets/svg/google.icon.svg'
// import ForgetPassword from '../ForgetPassword/ForgetPassword'

const Login = () => {
    const [inputActive, setInputActive] = useState(false);
    const [userEmailId, setUserEmailId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [emailValidFromDataBase, setEmailValidFromDataBase] = useState(false);
    const [passwordValidFromDataBase, setPasswordValidFromDataBase] = useState(false);
    const [passwordErrorAlert, setPasswordErrorAlert] = useState('')


    const checkInputFocus = () => {
        setInputActive(true);
    }
    const handleBlur = (event) => {
        if (event.target.value === "") {
            setInputActive(false);
        }
    }

    useEffect(() => {
        if (inputActive) {
            if (userPassword.length < 7 || userPassword.length > 20) {
                setPasswordErrorAlert('Password length must be between 7 to 20');
            } else if (['$', '!', '%', '^', '*', '(', ')', '|'].some(operator => userPassword.includes(operator))) {
                setPasswordErrorAlert('Not allow to use these character $ ! % ^ | ( ) ');
            } else if (!(/\d/).test(userPassword)) {
                setPasswordErrorAlert('Password must be contain number');
            } else if (!['@', '#', '-', '.', '/'].some(operator => userPassword.includes(operator))) {
                setPasswordErrorAlert('Password must be contain special character');
            } else if (!(/[A-Z]/.test(userPassword))) {
                setPasswordErrorAlert('Password must contain at least one capital letter');
            } else {
                setPasswordErrorAlert('Seems Like All Set For Login You Account');
            }
        } else if (userPassword === '') {
            setPasswordErrorAlert('');
        }
    }, [inputActive, userPassword])


    useEffect(() => {
        if (inputActive) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIncorrectEmail(!emailPattern.test(userEmailId));
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

                                {
                                    !emailValidFromDataBase
                                        ?

                                        <div className='login_with_id'>

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

                                            <div className='continue_btn_div'>
                                                <button id='cnt_btn' onClick={() => { if (!incorrectEmail && userEmailId !== '') { setInputActive(false); setEmailValidFromDataBase(true) } }}>Continue</button>
                                            </div>
                                            <div className='company_terms_div'>
                                                <p>By proceeding, I agree to <a href="https://google.com">T&C</a>, <a href="https://google.com">Privacy Policy</a> & <a href="https://google.com">Tariff Rates</a></p>
                                            </div>
                                        </div>

                                        :

                                        <div className='login_with_id'>

                                            <div className='input_email_div'>
                                                <div className='input_email_div'>
                                                    <div className='ied_center'>
                                                        <label id={inputActive ? 'placeholder_move' : 'placeholder_static'}>Enter Password</label>
                                                        <input id={inputActive ? 'inputActive' : 'inputDeactivate'} type="email" onFocus={() => { checkInputFocus() }} onBlur={handleBlur} onChange={(e) => { setUserPassword(e.target.value) }} />
                                                        <div className='email_error_div'>
                                                            {
                                                                passwordValidFromDataBase
                                                                    ?
                                                                    <label id='email_invalid_error'>Your Password is Incorrect</label>
                                                                    :
                                                                    <label id='email_incorrect_error' style={{ color: passwordErrorAlert === 'Seems Like All Set For Login You Account' ? '#39ac13' : '#d50707' }}>{passwordErrorAlert}</label>
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='continue_btn_div'>
                                                <button id='cnt_btn'>Login</button>
                                            </div>
                                            <div className='company_terms_div'>
                                                {/* <p>Don't remember Password ? <a href={ForgetPassword}>Forget Password</a></p> */}
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;