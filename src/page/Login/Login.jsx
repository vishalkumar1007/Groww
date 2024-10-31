import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo_dark from "../../assets/svg/groww-logo-dark.svg";
import google_svg from "../../assets/svg/google.icon.svg";
// import MessagePopUp from "../../component/MessagePopUp/MessagePopUp";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/LoaderComponent/Loader";
import { useDispatch } from "react-redux";
import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";
// import { addUserInformation, removeUserInformation } from "../../features/userInformation/userInformationSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputActive, setInputActive] = useState(false);
  const [userEmailId, setUserEmailId] = useState("");
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [emailValidFromDataBase, setEmailValidFromDataBase] = useState(false);
  const [passwordValidFromDataBase, setPasswordValidFromDataBase] =
    useState(true);
  const [passwordErrorAlert, setPasswordErrorAlert] = useState(false);
  const [isLoginPasswordHide, setIsLoginPasswordHide] = useState(true);
  const [animationTextChangeLogin, setAnimationTextChangeLogin] =
    useState("Mutual Funds");

  const [allowContinueEmailVerify, setAllowContinueEmailVerify] =
    useState(true);
  const [allowToLogin, setAllowToLogin] = useState(true);

  const [loaderActive, setLoaderActive] = useState(false);

  useEffect(() => {
    if (!(userEmailId.length > 0)) {
      setAllowContinueEmailVerify(false);
      return;
    }

    if (incorrectEmail) {
      setAllowContinueEmailVerify(false);
      return;
    }
    setAllowContinueEmailVerify(true);
  }, [incorrectEmail, userEmailId]);

  const handelEmailValidation = async () => {
    if (!allowContinueEmailVerify) {
      return;
    }
    setLoaderActive(true);

    const EmailValidationApi = `https://groww-backend-omega.vercel.app/api/user/emailVerification?email=${userEmailId}`;

    fetch(EmailValidationApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          ShowQuickMsgForEmailValidation(response.status);
          setLoaderActive(false);
          return;
        }
        ShowQuickMsgForEmailValidation(response.status);
        setLoaderActive(false);
      })
      .catch((err) => {
        console.log("error ", err);
        ShowQuickMsgForEmailValidation(500);
        setLoaderActive(false);
      });
  };

  const ShowQuickMsgForEmailValidation = async (statusCode) => {
    if (statusCode === 401) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Authorization failed. Please try again.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 200) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Validation successful.",
          positiveResponse: true,
          makeFire: true,
        })
      );
      //..... fn
      setEmailValidFromDataBase(true); // open password section if true
      setInputActive(false); //  deactivate input field

    } else if (statusCode === 404) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Email not found.",
          positiveResponse: false,
          makeFire: true,
        })
      );
      //... fn
      setEmailNotFoundError(true); // enable create account msg
    } else if (statusCode === 500) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Server error. Try again later.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    }

    if(statusCode !== 200){
      setAllowContinueEmailVerify(false); // disable continue button
      const timeOut = setTimeout(() => {
        if (statusCode === 404) {
          setEmailNotFoundError(false); // disable create account msg after interval
        }
        setAllowContinueEmailVerify(true); // enable continue button
      }, 4000);
  
      return () => clearTimeout(timeOut);
    }
  };

  // PASSWORD
  useEffect(() => {
    if (!(userPassword.length > 0)) {
      setAllowToLogin(false);
      return;
    }

    if (passwordErrorAlert) {
      setAllowToLogin(false);
      return;
    }
    setAllowToLogin(true);
  }, [passwordErrorAlert, userPassword.length]);

  const handelLoginValidation = async () => {
    if (!allowToLogin) {
      return;
    }
    setLoaderActive(true);
    const LoginAPI = `https://groww-backend-omega.vercel.app/api/user/login?email=${userEmailId}&password=${userPassword}`;

    fetch(LoginAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log("response not ok", response.status);
          ShowQuickMsgForLogin(response.status);
          setLoaderActive(false);
          return;
        }

        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
        }

        ShowQuickMsgForLogin(response.status);
        setLoaderActive(false);
      })
      .catch((err) => {
        console.log("error ", err);
        ShowQuickMsgForLogin(500);
        setLoaderActive(false);
      });
  };

  const ShowQuickMsgForLogin = async (statusCode) => {
    if (statusCode === 401) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Unauthorized request. Please log in.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 400) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Incorrect password. Please try again.",
          positiveResponse: false,
          makeFire: true,
        })
      );
      //....fn
      setPasswordValidFromDataBase(false);

    } else if (statusCode === 200) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Login validation successful. Welcome!",
          positiveResponse: true,
          makeFire: true,
        })
      );
      //.... fn
      setInputActive(false);
      navigate("/dashboard");

    } else if (statusCode === 404) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "User not found. Check your credentials.",
          positiveResponse: false,
          makeFire: true,
        })
      );

      
    } else if (statusCode === 500) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Server error. Please try later.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    }

    if(statusCode !== 200){
      setAllowToLogin(false);
      const timeOut = setTimeout(() => {
        setAllowToLogin(true);
      }, 4000);
  
      return () => clearTimeout(timeOut);
    }

  };



  // ........ input focus 

  const checkInputFocus = () => {
    setInputActive(true);
  };
  const handleBlur = (event) => {
    if (event.target.value === "") {
      setInputActive(false);
    }
  };

  useState(() => {
    const interval = setInterval(() => {
      setAnimationTextChangeLogin((pvrState) => {
        if (pvrState === "Mutual Funds") {
          return "Stocks";
        } else if (pvrState === "Stocks") {
          return "EFT's";
        } else {
          return "Mutual Funds";
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (inputActive) {
      if (userPassword.length < 7 || userPassword.length > 20) {
        setPasswordErrorAlert(true);
      } else {
        setPasswordErrorAlert(false);
      }
    }
  }, [inputActive, userPassword]);

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
      <div className="main_center_element">
        <div className="top_element">
          <div className="logo_icon">
            <img src={Logo_dark} alt="" />
          </div>
        </div>
        <div className="bottom_element">
          <div className="login_box">
            <div className="login_left">
              <div className="login_left_inter">
                <div className="left_tagline_top">
                  <p id="left_tagline_top_text">Simple, Free</p>
                  <p id="left_tagline_top_text">Investing.</p>
                </div>
                <div className="left_tagline_bottom">
                  <div id="interval_login"></div>
                  <p id="left_tagline_bottom_text">
                    {animationTextChangeLogin}
                  </p>
                </div>
              </div>
            </div>
            <div className="login_right">
              <div className="login_right_arrange">
                <div className="login_with_google">
                  <div className="lwg_title">
                    <p>Welcome Back</p>
                  </div>
                  <div className="lwg_box">
                    <div className="lwg_btn">
                      <button className="lwg_btn_text">
                        <div id="lwg_img">
                          <img src={google_svg} alt="google" />
                        </div>
                        <p>Continue with Google</p>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="or_main">
                  <div className="or_box">
                    <div className="or_line"></div>
                    <div className="or_text">
                      <p>Or</p>
                    </div>
                    <div className="or_line"></div>
                  </div>
                </div>

                {!emailValidFromDataBase ? (
                  <div
                    className="login_with_id"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelEmailValidation();
                      }
                    }}
                  >
                    <div className="input_email_div">
                      <div className="ied_center">
                        <label
                          id={
                            inputActive
                              ? "placeholder_move"
                              : "placeholder_static"
                          }
                        >
                          Your Email Address
                        </label>
                        <input
                          id={inputActive ? "inputActive" : "inputDeactivate"}
                          type="email"
                          onFocus={() => {
                            checkInputFocus();
                          }}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setUserEmailId(e.target.value);
                          }}
                        />
                        <div className="email_error_div">
                          {incorrectEmail ? (
                            <label id="email_incorrect_error">
                              Enter your email id
                            </label>
                          ) : (
                            ""
                          )}
                          {<br />}
                          {emailNotFoundError ? (
                            <label id="email_invalid_error">
                              Email invalid Create your account
                            </label>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="continue_btn_div">
                      <button
                        id="cnt_btn"
                        onClick={() => {
                          handelEmailValidation();
                        }}
                        disabled={!allowContinueEmailVerify}
                        style={{
                          backgroundColor: allowContinueEmailVerify
                            ? null
                            : "#22b892cf",
                          cursor: allowContinueEmailVerify ? null : "no-drop",
                        }}
                      >
                        {loaderActive ? <Loader /> : <p>Continue</p>}
                      </button>
                    </div>
                    <div className="company_terms_div">
                      <p>
                        You don't have account ?{" "}
                        <Link to={"/signUp"}>Sign up account</Link>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="login_with_id"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelLoginValidation();
                      }
                    }}
                  >
                    <div className="input_email_div">
                      <div className="input_email_div">
                        <div className="ied_center">
                          <label
                            id={
                              inputActive
                                ? "placeholder_move"
                                : "placeholder_static"
                            }
                          >
                            Enter Password
                          </label>
                          <input
                            id={inputActive ? "inputActive" : "inputDeactivate"}
                            type={isLoginPasswordHide ? "password" : "text"}
                            onFocus={() => {
                              checkInputFocus();
                            }}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setUserPassword(e.target.value);
                            }}
                          />

                          <div
                            className="ied_center_password_hide_and_view"
                            onClick={() => {
                              setIsLoginPasswordHide(!isLoginPasswordHide);
                            }}
                          >
                            {!isLoginPasswordHide ? (
                              <svg
                                id="ied_center_password_hide_and_view_svg_see"
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
                                id="ied_center_password_hide_and_view_svg_notSee"
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

                          <div className="email_error_div">
                            {passwordValidFromDataBase ? null : (
                              <label id="password_invalid_error">
                                Password Incorrect
                              </label>
                            )}
                            {passwordErrorAlert ? (
                              <label id="password_invalid_error">
                                Password length must be between 7 to 20
                              </label>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="continue_btn_div">
                      <button
                        id="cnt_btn"
                        onClick={() => {
                          handelLoginValidation();
                        }}
                        disabled={!allowToLogin}
                        style={{
                          backgroundColor: allowToLogin ? null : "#22b892cf",
                          cursor: allowToLogin ? null : "no-drop",
                        }}
                      >
                        {loaderActive ? <Loader /> : <p>Login</p>}
                      </button>
                    </div>
                    <div className="company_terms_div">
                      <p>
                        Don't remember Password ?{" "}
                        <Link to="/forgot">Forgot Password</Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
