import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";
import Logo_dark from "../../assets/svg/groww-logo-dark.svg";
import Forget_amico from "../../assets/svg/Forgot-password-bro-groww.svg";
import Create_password_amico from "../../assets/img/Create_password_icon_amico.png";

const Login = () => {
    const [f_inputActive, setF_inputActive] = useState(false);
    const [f_inputActiveEP, setF_inputActiveEP] = useState(false);
    const [f_inputActiveCP, setF_inputActiveCP] = useState(false);
    const [f_userEmailId, setF_userEmailId] = useState("");
    const [f_userInputOtp, setF_userInputOtp] = useState("");
    const [f_emailNotFoundError, setF_emailNotFoundError] = useState(false);
    const [f_incorrectEmail, setF_incorrectEmail] = useState(false);
    const [f_emailValidFromDataBase, setF_emailValidFromDataBase] =
        useState(false);
    const [f_otpValidFromDataBase, setF_otpValidFromDataBase] = useState(false);
    const [f_isChangePasswordSectionOpen, setF_isChangePasswordSectionOpen] =
        useState(false);
    const [f_changeInputPassword, setF_changeInputPassword] = useState("");
    const [f_errorCIP, setF_errorCIP] = useState("");
    const [f_changeInputConformPassword, setF_changeInputConformPassword] =
        useState("");
    const [f_errorCICP, setF_errorCICP] = useState("");

    const [isUpdatePassHide, setIsUpdatePassHide] = useState(true);
    const [isUpdateConfPassHide, setIsUpdateConfPassHide] = useState(true);

    const checkInputFocus = () => {
        setF_inputActive(true);
    };
    const handleBlur = (event) => {
        if (event.target.value === "") {
            setF_inputActive(false);
        }
    };
    // ...............
    const checkInputFocusEP = () => {
        setF_inputActiveEP(true);
    };
    const handleBlurEP = (event) => {
        if (event.target.value === "") {
            setF_inputActiveEP(false);
        }
    };
    // ...............
    const checkInputFocusCP = () => {
        setF_inputActiveCP(true);
    };
    const handleBlurCP = (event) => {
        if (event.target.value === "") {
            setF_inputActiveCP(false);
        }
    };

    const reloadPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (f_inputActiveEP) {
            if (
                f_changeInputPassword.length < 7 ||
                f_changeInputPassword.length > 20
            ) {
                setF_errorCIP("Password length must be between 7 to 20");
            } else if (
                ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
                    f_changeInputPassword.includes(operator)
                )
            ) {
                setF_errorCIP("Not allow to use these character $ ! % ^ | ( ) ");
            } else if (!/\d/.test(f_changeInputPassword)) {
                setF_errorCIP("Password must be contain number");
            } else if (
                !["@", "#", "-", ".", "/"].some((operator) =>
                    f_changeInputPassword.includes(operator)
                )
            ) {
                setF_errorCIP("Password must be contain special character");
            } else if (!/[A-Z]/.test(f_changeInputPassword)) {
                setF_errorCIP("Password must contain at least one capital letter");
            } else {
                setF_errorCIP("Seems Like All Set For Login You Account");
            }
        } else if (f_changeInputPassword === "") {
            setF_errorCIP("");
        }
    }, [f_inputActiveEP, f_changeInputPassword]);

    useEffect(() => {
        if (f_inputActiveCP) {
            if (
                f_changeInputConformPassword.length < 7 ||
                f_changeInputConformPassword.length > 20
            ) {
                setF_errorCICP("Password length must be between 7 to 20");
            } else if (
                ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
                    f_changeInputConformPassword.includes(operator)
                )
            ) {
                setF_errorCICP("Not allow to use these character $ ! % ^ | ( ) ");
            } else if (!/\d/.test(f_changeInputConformPassword)) {
                setF_errorCICP("Password must be contain number");
            } else if (
                !["@", "#", "-", ".", "/"].some((operator) =>
                    f_changeInputConformPassword.includes(operator)
                )
            ) {
                setF_errorCICP("Password must be contain special character");
            } else if (!/[A-Z]/.test(f_changeInputConformPassword)) {
                setF_errorCICP("Password must contain at least one capital letter");
            } else if (f_changeInputPassword !== f_changeInputConformPassword) {
                setF_errorCICP("Password Not Same");
            } else {
                setF_errorCICP("Seems Like All Set For Login You Account");
            }
        } else if (f_changeInputConformPassword === "") {
            setF_errorCICP("");
        }
    }, [f_inputActiveCP, f_changeInputConformPassword, f_changeInputPassword]);

    useEffect(() => {
        if (f_otpValidFromDataBase) {
            setTimeout(() => {
                setF_isChangePasswordSectionOpen(true);
            }, 1500);
        }
        //  else {
        //     setIsChangePasswordSectionOpen(false);
        // }
    }, [f_otpValidFromDataBase]);

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
            <div className="main_center_element_forget">
                <div className="top_element_forget">
                    <div className="logo_icon_forget">
                        <img src={Logo_dark} alt="" />
                    </div>
                </div>
                <div className="bottom_element_forget">
                    <div className="login_box_forget">
                        <div className="login_left_forget">
                            <div className="login_left_forget_inter">
                                <div className="left_tagline_top_forget">
                                    <p id="left_tagline_top_forget_text">Simple, Free</p>
                                    <p id="left_tagline_top_forget_text">Investing.</p>
                                </div>
                                <div className="left_tagline_bottom_forget">
                                    <div id="interval"></div>
                                    <p id="left_tagline_bottom_forget_text">Mutual Funds</p>
                                </div>
                            </div>
                        </div>
                        <div className="login_right_forget">
                            {!f_isChangePasswordSectionOpen ? (
                                <div className="login_right_forget_arrange">
                                    <div className="login_with_forget">
                                        <div className="lwg_title_forget">
                                            <p>Forget Password</p>
                                        </div>
                                        <div className="lwg_box_forget">
                                            <div className="lwg_wrap_image_forget">
                                                <img src={Forget_amico} alt="icon" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ............ */}
                                    {!f_emailValidFromDataBase ? (
                                        <div className="login_with_id_forget_email">
                                            <div className="input_email_div_forget_email">
                                                <div className="ied_center_forget_email">
                                                    <label
                                                        id={
                                                            f_inputActive
                                                                ? "placeholder_move_email"
                                                                : "placeholder_static_email"
                                                        }
                                                    >
                                                        Your Email Address
                                                    </label>
                                                    <input
                                                        id={
                                                            f_inputActive
                                                                ? "inputActive_email"
                                                                : "inputDeactivate_email"
                                                        }
                                                        type="email"
                                                        onFocus={() => {
                                                            checkInputFocus();
                                                        }}
                                                        onBlur={handleBlur}
                                                        value={f_userEmailId}
                                                        onChange={(e) => {
                                                            setF_userEmailId(e.target.value);
                                                        }}
                                                    />
                                                    <div className="email_error_div">
                                                        {f_incorrectEmail ? (
                                                            <label id="email_incorrect_error_forget">
                                                                Incorrect email
                                                            </label>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {<br />}
                                                        {f_emailNotFoundError ? (
                                                            <label id="email_invalid_error">
                                                                Invalid Email , First create your account
                                                            </label>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="continue_btn_div_forget">
                                                <button
                                                    id="cnt_btn"
                                                    onClick={() => {
                                                        if (!f_incorrectEmail && f_userEmailId !== "") {
                                                            setF_inputActive(false);
                                                            setF_emailValidFromDataBase(true);
                                                        }
                                                    }}
                                                >
                                                    Send OTP
                                                </button>
                                            </div>
                                            <div className="company_terms_div_forget">
                                                <p>
                                                    Opps, i just remind my password ?{" "}
                                                    <Link to="/login">Login Account</Link>{" "}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="login_with_id_forget_otp">
                                            <div className="input_email_div_forget_otp">
                                                <div className="ied_center_forget_otp">
                                                    <label
                                                        id={
                                                            f_inputActive
                                                                ? "placeholder_move_otp"
                                                                : "placeholder_static_otp"
                                                        }
                                                    >
                                                        Enter OTP
                                                    </label>
                                                    <input
                                                        id={
                                                            f_inputActive
                                                                ? "inputActive_otp"
                                                                : "inputDeactivate_otp"
                                                        }
                                                        type="number"
                                                        onFocus={() => {
                                                            checkInputFocus();
                                                        }}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            setF_userInputOtp(e.target.value);
                                                        }}
                                                        value={f_userInputOtp}
                                                    />
                                                    {f_otpValidFromDataBase ? (
                                                        <div className="email_error_div">
                                                            {f_otpValidFromDataBase ? (
                                                                f_otpValidFromDataBase ? (
                                                                    <label
                                                                        id="email_invalid_error"
                                                                        style={{ color: "green" }}
                                                                    >
                                                                        OTP Verified Successfully
                                                                    </label>
                                                                ) : (
                                                                    ""
                                                                )
                                                            ) : (
                                                                <label id="email_invalid_error">
                                                                    Incorrect Input OTP
                                                                </label>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                            <div className="continue_btn_div_forget">
                                                <button
                                                    id="cnt_btn"
                                                    onClick={() => {
                                                        if (f_userInputOtp !== "") {
                                                            setF_otpValidFromDataBase(true);
                                                        }
                                                    }}
                                                >
                                                    Validate
                                                </button>
                                            </div>
                                            <div className="company_terms_div_forget">
                                                <p>
                                                    {" "}
                                                    Still not getting OTP ?{" "}
                                                    <a href="https://google.com">Resend it</a>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="login_right_forget_arrange">
                                    <div className="cretePass_heading">
                                        <div className="cp_title">
                                            <p>Create Password</p>
                                        </div>
                                        <div className="cp_icon_box">
                                            <div className="cp_icon_image" id="createImageHandel">
                                                <img src={Create_password_amico} alt="icon" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="Create_password_section">
                                        <div className="input_createPass_div">
                                            <div className="ied_center_forget_set_pass">
                                                <label
                                                    id={
                                                        f_inputActiveEP
                                                            ? "placeholder_move_set_pass"
                                                            : "placeholder_static_set_pass"
                                                    }
                                                >
                                                    Enter Your Password
                                                </label>
                                                <input
                                                    id={
                                                        f_inputActiveEP
                                                            ? "inputActive_set_pass"
                                                            : "inputDeactivate_set_pass"
                                                    }
                                                    type={isUpdatePassHide ? "password" : "text"}
                                                    onFocus={() => {
                                                        checkInputFocusEP();
                                                    }}
                                                    onBlur={handleBlurEP}
                                                    onChange={(e) => {
                                                        setF_changeInputPassword(e.target.value);
                                                    }}
                                                    value={f_changeInputPassword}
                                                />
                                                {/* .........  */}

                                                <div
                                                    className="ied_center_forget_set_pass_password_hide_and_view"
                                                    onClick={() => {
                                                        setIsUpdatePassHide(!isUpdatePassHide);
                                                    }}
                                                >
                                                    {!isUpdatePassHide ? (
                                                        <svg
                                                            id="ied_center_forget_set_pass_password_hide_and_view_svg_see"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="17"
                                                            height="17"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-eye"
                                                        >
                                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            id="ied_center_forget_set_pass_password_hide_and_view_svg_notSee"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="17"
                                                            height="17"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-eye-off"
                                                        >
                                                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                                            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                                            <path d="m2 2 20 20" />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* .........  */}
                                                <div className="conformPass_error_div_set_pass">
                                                    {
                                                        <label
                                                            id="email_incorrect_error_forget"
                                                            style={{
                                                                color:
                                                                    f_errorCIP ===
                                                                        "Seems Like All Set For Login You Account"
                                                                        ? "#39ac13"
                                                                        : "#d50707",
                                                            }}
                                                        >
                                                            {f_errorCIP}
                                                        </label>
                                                    }
                                                </div>
                                            </div>
                                            <div className="ied_center_forget_conf_pass">
                                                <label
                                                    id={
                                                        f_inputActiveCP
                                                            ? "placeholder_move_conf_pass"
                                                            : "placeholder_static_conf_pass"
                                                    }
                                                >
                                                    Conform Password
                                                </label>
                                                <input
                                                    id={
                                                        f_inputActiveCP
                                                            ? "inputActive_conf_pass"
                                                            : "inputDeactivate_conf_pass"
                                                    }
                                                    type={isUpdateConfPassHide ? "password" : "text"}
                                                    onFocus={() => {
                                                        checkInputFocusCP();
                                                    }}
                                                    onBlur={handleBlurCP}
                                                    onChange={(e) => {
                                                        setF_changeInputConformPassword(e.target.value);
                                                    }}
                                                    value={f_changeInputConformPassword}
                                                />

                                                {/* ......................  */}

                                                <div
                                                    className="ied_center_forget_conf_pass_password_hide_and_view"
                                                    onClick={() => {
                                                        setIsUpdateConfPassHide(!isUpdateConfPassHide);
                                                    }}
                                                >
                                                    {!isUpdateConfPassHide ? (
                                                        <svg
                                                            id="ied_center_forget_conf_pass_password_hide_and_view_svg_see"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="17"
                                                            height="17"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-eye"
                                                        >
                                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            id="ied_center_forget_conf_pass_password_hide_and_view_svg_notSee"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="17"
                                                            height="17"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-eye-off"
                                                        >
                                                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                                            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                                                            <path d="m2 2 20 20" />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* ......................  */}
                                                <div className="conformPass_error_div_conf_pass">
                                                    {
                                                        <label
                                                            id="email_incorrect_error_forget"
                                                            style={{
                                                                color:
                                                                    f_errorCICP ===
                                                                        "Seems Like All Set For Login You Account"
                                                                        ? "#39ac13"
                                                                        : "#d50707",
                                                            }}
                                                        >
                                                            {f_errorCICP}
                                                        </label>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="createPass_continue_btn_div_forget">
                                            <button
                                                id="cnt_btn"
                                                onClick={() => {
                                                    if (!f_incorrectEmail && f_userEmailId !== "") {
                                                        setF_inputActive(false);
                                                        setF_emailValidFromDataBase(true);
                                                    }
                                                }}
                                            >
                                                Change
                                            </button>
                                        </div>
                                        <div className="_createPass_company_terms_div_forget">
                                            <p>
                                                Issue in change password ?{" "}
                                                <Link to="#!" onClick={reloadPage}>
                                                    Go to Forget
                                                </Link>{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
