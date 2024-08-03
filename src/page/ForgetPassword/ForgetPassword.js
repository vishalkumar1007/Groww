import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import './ForgetPassword.css';
import Logo_dark from '../../assets/svg/groww-logo-dark.svg'
import Forget_amico from '../../assets/svg/Forgot-password-bro-groww.svg'
import Create_password_amico from '../../assets/img/Create_password_icon_amico.png'

const Login = () => {
    const [f_inputActive, setF_inputActive] = useState(false);
    const [f_inputActiveEP, setF_inputActiveEP] = useState(false);
    const [f_inputActiveCP, setF_inputActiveCP] = useState(false);
    const [f_userEmailId, setF_userEmailId] = useState('');
    const [f_userInputOtp, setF_userInputOtp] = useState('');
    const [f_emailNotFoundError, setF_emailNotFoundError] = useState(false);
    const [f_incorrectEmail, setF_incorrectEmail] = useState(false);
    const [f_emailValidFromDataBase, setF_emailValidFromDataBase] = useState(false);
    const [f_otpValidFromDataBase, setF_otpValidFromDataBase] = useState(false);
    const [f_isChangePasswordSectionOpen, setF_isChangePasswordSectionOpen] = useState(false);
    const [f_changeInputPassword, setF_changeInputPassword] = useState('')
    const [f_errorCIP, setF_errorCIP] = useState('')
    const [f_changeInputConformPassword, setF_changeInputConformPassword] = useState('')
    const [f_errorCICP, setF_errorCICP] = useState('')


    // useEffect(()=>{
    //     console.log('OTP : ', userInputOtp);
    // },[userInputOtp])

    const checkInputFocus = () => {
        setF_inputActive(true);
    }
    const handleBlur = (event) => {
        if (event.target.value === "") {
            setF_inputActive(false);
        }
    }
    // ............... 
    const checkInputFocusEP = () => {
        setF_inputActiveEP(true);
    }
    const handleBlurEP = (event) => {
        if (event.target.value === "") {
            setF_inputActiveEP(false);
        }
    }
    // ............... 
    const checkInputFocusCP = () => {
        setF_inputActiveCP(true);
    }
    const handleBlurCP = (event) => {
        if (event.target.value === "") {
            setF_inputActiveCP(false);
        }
    }

    const reloadPage = ()=>{
        window.location.reload();
    }

    useEffect(() => {
        if (f_inputActiveEP) {
            if (f_changeInputPassword.length < 7 || f_changeInputPassword.length > 20) {
                setF_errorCIP('Password length must be between 7 to 20');
            } else if (['$', '!', '%', '^', '*', '(', ')', '|'].some(operator => f_changeInputPassword.includes(operator))) {
                setF_errorCIP('Not allow to use these character $ ! % ^ | ( ) ');
            } else if (!(/\d/).test(f_changeInputPassword)) {
                setF_errorCIP('Password must be contain number');
            } else if (!['@', '#', '-', '.', '/'].some(operator => f_changeInputPassword.includes(operator))) {
                setF_errorCIP('Password must be contain special character');
            } else if (!(/[A-Z]/.test(f_changeInputPassword))) {
                setF_errorCIP('Password must contain at least one capital letter');
            } else {
                setF_errorCIP('Seems Like All Set For Login You Account');
            }
        } else if (f_changeInputPassword === '') {
            setF_errorCIP('');
        }
    }, [f_inputActiveEP, f_changeInputPassword]);

    useEffect(() => {
        if (f_inputActiveCP) {
            if (f_changeInputConformPassword.length < 7 || f_changeInputConformPassword.length > 20) {
                setF_errorCICP('Password length must be between 7 to 20');
            } else if (['$', '!', '%', '^', '*', '(', ')', '|'].some(operator => f_changeInputConformPassword.includes(operator))) {
                setF_errorCICP('Not allow to use these character $ ! % ^ | ( ) ');
            } else if (!(/\d/).test(f_changeInputConformPassword)) {
                setF_errorCICP('Password must be contain number');
            } else if (!['@', '#', '-', '.', '/'].some(operator => f_changeInputConformPassword.includes(operator))) {
                setF_errorCICP('Password must be contain special character');
            } else if (!(/[A-Z]/.test(f_changeInputConformPassword))) {
                setF_errorCICP('Password must contain at least one capital letter');
            } else if (f_changeInputPassword !== f_changeInputConformPassword) {
                setF_errorCICP('Password Not Same');
            } else {
                setF_errorCICP('Seems Like All Set For Login You Account');
            }
        } else if (f_changeInputConformPassword === '') {
            setF_errorCICP('');
        }
    }, [f_inputActiveCP, f_changeInputConformPassword, f_changeInputPassword])

    useEffect(() => {
        if (f_otpValidFromDataBase) {
            setTimeout(() => {
                setF_isChangePasswordSectionOpen(true);
            }, 1500);
        }
        //  else {
        //     setIsChangePasswordSectionOpen(false);
        // }
    }, [f_otpValidFromDataBase])

    useEffect(() => {
        if (f_inputActive) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setF_incorrectEmail(!emailPattern.test(f_userEmailId));
        } else {
            setF_incorrectEmail(false);
        }
    }, [f_inputActive, f_userEmailId]);

    return (
        <div className="main_view_forget">
            <div className='main_center_element_forget'>
                <div className='top_element_forget'>
                    <div className='logo_icon_forget'>
                        <img src={Logo_dark} alt="" />
                    </div>
                </div>
                <div className='bottom_element_forget'>
                    <div className='login_box_forget'>
                        <div className='login_left_forget'>
                            <div className='login_left_forget_inter'>
                                <div className='left_tagline_top_forget'>
                                    <p id='left_tagline_top_forget_text'>Simple, Free</p>
                                    <p id='left_tagline_top_forget_text'>Investing.</p>
                                </div>
                                <div className='left_tagline_bottom_forget'>
                                    <div id='interval'></div>
                                    <p id='left_tagline_bottom_forget_text'>Mutual Funds</p>
                                </div>
                            </div>
                        </div>
                        <div className='login_right_forget'>
                            {
                                !f_isChangePasswordSectionOpen
                                ?
                                
                                <div className='login_right_forget_arrange'>
                                        <div className='login_with_forget'>
                                            <div className='lwg_title_forget'>
                                                <p>Forget Password</p>
                                            </div>
                                            <div className='lwg_box_forget'>
                                                <div className='lwg_wrap_image_forget'>
                                                    <img src={Forget_amico} alt="icon" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ............ */}
                                        {
                                            !f_emailValidFromDataBase
                                            ?
                                            
                                                <div className='login_with_id_forget'>

                                                    <div className='input_email_div_forget'>
                                                        <div className='ied_center_forget'>
                                                            <label id={f_inputActive ? 'placeholder_move' : 'placeholder_static'}>Your Email Address</label>
                                                            <input id={f_inputActive ? 'inputActive' : 'inputDeactivate'} type="email" onFocus={() => { checkInputFocus() }} onBlur={handleBlur} onChange={(e) => { setF_userEmailId(e.target.value) }} />
                                                            <div className='email_error_div'>
                                                                {f_incorrectEmail ? <label id='email_incorrect_error_forget'>Incorrect email</label> : ''}
                                                                {<br />}
                                                                {f_emailNotFoundError ? <label id='email_invalid_error'>Invalid Email , First create your account</label> : ''}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='continue_btn_div_forget'>
                                                        <button id='cnt_btn' onClick={() => { if (!f_incorrectEmail && f_userEmailId !== '') { setF_inputActive(false); setF_emailValidFromDataBase(true) } }}>Send OTP</button>
                                                    </div>
                                                    <div className='company_terms_div_forget'>
                                                        <p>Opps, i just remind my password ? <Link to='/'>Login Account</Link> </p>
                                                    </div>
                                                </div>

                                                :
                                                <div className='login_with_id_forget'>

                                                    <div className='input_email_div_forget'>
                                                        <div className='input_email_div_forget'>
                                                            <div className='ied_center_forget'>
                                                                <label id={f_inputActive ? 'placeholder_move' : 'placeholder_static'}>Enter OTP</label>
                                                                <input id={f_inputActive ? 'inputActive' : 'inputDeactivate'} type='number' onFocus={() => { checkInputFocus() }} onBlur={handleBlur} onChange={(e) => { setF_userInputOtp(e.target.value) }} className="no-spinners" />
                                                                {
                                                                    f_otpValidFromDataBase ?
                                                                        <div className='email_error_div'>
                                                                            {
                                                                                f_otpValidFromDataBase
                                                                                    ?
                                                                                    f_otpValidFromDataBase ? <label id='email_invalid_error' style={{ color: 'green' }}>OTP Verified Successfully</label> : ''
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

                                                    <div className='continue_btn_div_forget'>
                                                        <button id='cnt_btn' onClick={() => { if (f_userInputOtp !== '') { setF_otpValidFromDataBase(true) } }}>Validate</button>
                                                    </div>
                                                    <div className='company_terms_div_forget'>
                                                        <p> Still not getting OTP ? <a href="https://google.com">Resend it</a></p>
                                                    </div>
                                                </div>

                                        }
                                    </div>
                                    :
                                    <div className='login_right_forget_arrange'>
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
                                                <div className='ied_center_forget'>
                                                    <label id={f_inputActiveEP ? 'placeholder_move' : 'placeholder_static'}>Enter Your Password</label>
                                                    <input id={f_inputActiveEP ? 'inputActive' : 'inputDeactivate'} type='password' onFocus={() => { checkInputFocusEP() }} onBlur={handleBlurEP} onChange={(e) => { setF_changeInputPassword(e.target.value) }} />
                                                    <div className='conformPass_error_div'>
                                                        {<label id='email_incorrect_error_forget' style={{ color: f_errorCIP === 'Seems Like All Set For Login You Account' ? '#39ac13' : '#d50707' }}>{f_errorCIP}</label>}

                                                    </div>
                                                </div>
                                                <div className='ied_center_forget'>
                                                    <label id={f_inputActiveCP ? 'placeholder_move' : 'placeholder_static'}>Conform Password</label>
                                                    <input id={f_inputActiveCP ? 'inputActive' : 'inputDeactivate'} type='password' onFocus={() => { checkInputFocusCP() }} onBlur={handleBlurCP} onChange={(e) => { setF_changeInputConformPassword(e.target.value) }} />
                                                    <div className='conformPass_error_div'>
                                                        {<label id='email_incorrect_error_forget' style={{ color: f_errorCICP === 'Seems Like All Set For Login You Account' ? '#39ac13' : '#d50707' }}>{f_errorCICP}</label>}

                                                    </div>
                                                </div>

                                            </div>

                                            <div className='createPass_continue_btn_div_forget'>
                                                <button id='cnt_btn' onClick={() => { if (!f_incorrectEmail && f_userEmailId !== '') { setF_inputActive(false); setF_emailValidFromDataBase(true) } }}>Change</button>
                                            </div>
                                            <div className='_createPass_company_terms_div_forget'>
                                                <p>Issue in change password ? <Link to='#!' onClick={reloadPage}>Go to Forget</Link> </p>
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