import { useEffect, useState } from 'react';
import './ForgetPassword.css';
import Logo_dark from '../../assets/svg/groww-logo-dark.svg'
import Forget_amico from '../../assets/svg/Forgot-password-bro-groww.svg'
import Create_password_amico from '../../assets/img/Create_password_icon_amico.png'

const Login = () => {
    const [inputActive, setInputActive] = useState(false);
    const [inputActiveEP, setInputActiveEP] = useState(false);
    const [inputActiveCP, setInputActiveCP] = useState(false);
    const [userEmailId, setUserEmailId] = useState('');
    const [userInputOtp, setUserInputOtp] = useState('');
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [emailValidFromDataBase, setEmailValidFromDataBase] = useState(false);
    const [otpValidFromDataBase, setOtpValidFromDataBase] = useState(false);
    const [isChangePasswordSectionOpen, setIsChangePasswordSectionOpen] = useState(false);
    const [changeInputPassword, setChangeInputPassword] = useState('')
    const [errorCIP, setErrorCIP] = useState('')
    const [changeInputConformPassword, setChangeInputConformPassword] = useState('')
    const [errorCICP, setErrorCICP] = useState('')


    // useEffect(()=>{
    //     console.log('OTP : ', userInputOtp);
    // },[userInputOtp])

    const checkInputFocus = () => {
        setInputActive(true);
    }
    const handleBlur = (event) => {
        if (event.target.value === "") {
            setInputActive(false);
        }
    }
    // ............... 
    const checkInputFocusEP = () => {
        setInputActiveEP(true);
    }
    const handleBlurEP = (event) => {
        if (event.target.value === "") {
            setInputActiveEP(false);
        }
    }
    // ............... 
    const checkInputFocusCP = () => {
        setInputActiveCP(true);
    }
    const handleBlurCP = (event) => {
        if (event.target.value === "") {
            setInputActiveCP(false);
        }
    }

    useEffect(() => {
        if (inputActiveEP) {
            if (changeInputPassword.length < 7 || changeInputPassword.length > 20) {
                setErrorCIP('Password length must be between 7 to 20');
            } else if (['$', '!', '%', '^', '*', '(', ')', '|'].some(operator => changeInputPassword.includes(operator))) {
                setErrorCIP('Not allow to use these character $ ! % ^ | ( ) ');
            } else if (!(/\d/).test(changeInputPassword)) {
                setErrorCIP('Password must be contain number');
            } else if (!['@', '#', '-', '.', '/'].some(operator => changeInputPassword.includes(operator))) {
                setErrorCIP('Password must be contain special character');
            } else if (!(/[A-Z]/.test(changeInputPassword))) {
                setErrorCIP('Password must contain at least one capital letter');
            } else {
                setErrorCIP('Seems Like All Set For Login You Account');
            }
        } else if (changeInputPassword === '') {
            setErrorCIP('');
        }
    }, [inputActiveEP, changeInputPassword]);

    useEffect(() => {
        if (inputActiveCP) {
            if (changeInputConformPassword.length < 7 || changeInputConformPassword.length > 20) {
                setErrorCICP('Password length must be between 7 to 20');
            } else if (['$', '!', '%', '^', '*', '(', ')', '|'].some(operator => changeInputConformPassword.includes(operator))) {
                setErrorCICP('Not allow to use these character $ ! % ^ | ( ) ');
            } else if (!(/\d/).test(changeInputConformPassword)) {
                setErrorCICP('Password must be contain number');
            } else if (!['@', '#', '-', '.', '/'].some(operator => changeInputConformPassword.includes(operator))) {
                setErrorCICP('Password must be contain special character');
            } else if (!(/[A-Z]/.test(changeInputConformPassword))) {
                setErrorCICP('Password must contain at least one capital letter');
            } else if (changeInputPassword !== changeInputConformPassword) {
                setErrorCICP('Password Not Same');
            } else {
                setErrorCICP('Seems Like All Set For Login You Account');
            }
        } else if (changeInputConformPassword === '') {
            setErrorCICP('');
        }
    }, [inputActiveCP, changeInputConformPassword, changeInputPassword])

    useEffect(() => {
        if (otpValidFromDataBase) {
            setTimeout(() => {
                setIsChangePasswordSectionOpen(true);
            }, 1500);
        }
        //  else {
        //     setIsChangePasswordSectionOpen(false);
        // }
    }, [otpValidFromDataBase])

    useEffect(() => {
        if (inputActive) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIncorrectEmail(!emailPattern.test(userEmailId));
        } else {
            setIncorrectEmail(false);
        }
    }, [inputActive, userEmailId]);

    return (
        <div className="main_view_forget">
            <div className='main_center_element_forget'>
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
                            {
                                !isChangePasswordSectionOpen
                                    ?

                                    <div className='login_right_arrange'>
                                        <div className='login_with_google'>
                                            <div className='lwg_title'>
                                                <p>Forget Password</p>
                                            </div>
                                            <div className='lwg_box'>
                                                <div className='lwg_wrap_image'>
                                                    <img src={Forget_amico} alt="icon" />
                                                </div>
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
                                                                {emailNotFoundError ? <label id='email_invalid_error'>Invalid Email , First create your account</label> : ''}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='continue_btn_div'>
                                                        <button id='cnt_btn' onClick={() => { if (!incorrectEmail && userEmailId !== '') { setInputActive(false); setEmailValidFromDataBase(true) } }}>Send OTP</button>
                                                    </div>
                                                    <div className='company_terms_div'>
                                                        <p>Opps, i just remind my password ? <a href="https://google.com">Login Account</a> </p>
                                                    </div>
                                                </div>

                                                :
                                                <div className='login_with_id'>

                                                    <div className='input_email_div'>
                                                        <div className='input_email_div'>
                                                            <div className='ied_center'>
                                                                <label id={inputActive ? 'placeholder_move' : 'placeholder_static'}>Enter OTP</label>
                                                                <input id={inputActive ? 'inputActive' : 'inputDeactivate'} type='number' onFocus={() => { checkInputFocus() }} onBlur={handleBlur} onChange={(e) => { setUserInputOtp(e.target.value) }} className="no-spinners" />
                                                                {
                                                                    otpValidFromDataBase ?
                                                                        <div className='email_error_div'>
                                                                            {
                                                                                otpValidFromDataBase
                                                                                    ?
                                                                                    otpValidFromDataBase ? <label id='email_invalid_error' style={{ color: 'green' }}>OTP Verified Successfully</label> : ''
                                                                                    :
                                                                                    <label id='email_invalid_error'>Incorrect Input OTP</label>
                                                                            }
                                                                        </div>
                                                                        :
                                                                        ""
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='continue_btn_div'>
                                                        <button id='cnt_btn' onClick={() => { if (userInputOtp !== '') { setOtpValidFromDataBase(true) } }}>Validate</button>
                                                    </div>
                                                    <div className='company_terms_div'>
                                                        <p> Still not getting OTP ? <a href="https://google.com">Resend it</a></p>
                                                    </div>
                                                </div>

                                        }
                                    </div>
                                    :
                                    <div className='login_right_arrange'>
                                        <div className='cretePass_heading'>
                                            <div className='cp_title'>
                                                <p>Create Password</p>
                                            </div>
                                            <div className='cp_icon_box'>
                                                <div className='cp_icon_image' id='createImageHandel'>
                                                    <img src={Create_password_amico} alt="icon" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='Create_password_section'>

                                            <div className='input_createPass_div'>
                                                <div className='ied_center'>
                                                    <label id={inputActiveEP ? 'placeholder_move' : 'placeholder_static'}>Enter Your Password</label>
                                                    <input id={inputActiveEP ? 'inputActive' : 'inputDeactivate'} type='password' onFocus={() => { checkInputFocusEP() }} onBlur={handleBlurEP} onChange={(e) => { setChangeInputPassword(e.target.value) }} />
                                                    <div className='conformPass_error_div'>
                                                        {<label id='email_incorrect_error' style={{ color: errorCIP === 'Seems Like All Set For Login You Account' ? '#39ac13' : '#d50707' }}>{errorCIP}</label>}

                                                    </div>
                                                </div>
                                                <div className='ied_center'>
                                                    <label id={inputActiveCP ? 'placeholder_move' : 'placeholder_static'}>Conform Password</label>
                                                    <input id={inputActiveCP ? 'inputActive' : 'inputDeactivate'} type='password' onFocus={() => { checkInputFocusCP() }} onBlur={handleBlurCP} onChange={(e) => { setChangeInputConformPassword(e.target.value) }} />
                                                    <div className='conformPass_error_div'>
                                                        {<label id='email_incorrect_error' style={{ color: errorCICP === 'Seems Like All Set For Login You Account' ? '#39ac13' : '#d50707' }}>{errorCICP}</label>}

                                                    </div>
                                                </div>

                                            </div>

                                            <div className='createPass_continue_btn_div'>
                                                <button id='cnt_btn' onClick={() => { if (!incorrectEmail && userEmailId !== '') { setInputActive(false); setEmailValidFromDataBase(true) } }}>Change</button>
                                            </div>
                                            <div className='_createPass_company_terms_div'>
                                                <p>Issue in change password ? <a href="https://google.com">Go to Forget</a> </p>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;