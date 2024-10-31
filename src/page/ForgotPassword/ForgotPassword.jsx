import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import Logo_dark from "../../assets/svg/groww-logo-dark.svg";
import forgot_amico from "../../assets/svg/Forgot-password-bro-groww.svg";
import Create_password_amico from "../../assets/img/Create_password_icon_amico.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/LoaderComponent/Loader";
import { useDispatch } from "react-redux";
import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [f_changeInputPassword, setF_changeInputPassword] = useState("");
  const [f_errorCIP, setF_errorCIP] = useState("");
  const [f_errorCICP, setF_errorCICP] = useState("");
  const [f_changeInputConformPassword, setF_changeInputConformPassword] =
    useState("");

  const [isUpdatePassHide, setIsUpdatePassHide] = useState(true);
  const [isUpdateConfPassHide, setIsUpdateConfPassHide] = useState(true);
  const [animationTextChangeforgot, setAnimationTextChangeforgot] =
    useState("Mutual Funds");

  const [allowContinueEmailVerify, setAllowContinueEmailVerify] =
    useState(true);

  // activate button
  const [isActivateButton, setIsActivateButton] = useState(true);
  const [activeResendButtonOnOtp, setActiveResendButtonOnOtp] = useState(false);
  const [activeResendButtonCountDown, setActiveResendButtonCountDown] =
    useState(45);

  // otp
  const [allowContinueOtpVerify, setAllowContinueOtpVerify] = useState(true);
  const [
    successMessageFromDataBaseForOTP,
    setSuccessMessageFromDataBaseForOTP,
  ] = useState(false);
  const [otpResponseFromDataBase, setF_OtpResponseFromDataBase] =
    useState(false);

  // update user
  const [allowContinueUpdatePassword, setAllowContinueUpdatePassword] =
    useState(true);

  // msg show
  const [loaderActive, setLoaderActive] = useState(false);

  // Deactivate err
  const deactivateAfter2sec = (value) => {
    let timeOut;
    if (value === "email") {
      timeOut = setTimeout(() => {
        setF_incorrectEmail(false);
      }, 2000);
    } else if (value === "otp") {
      timeOut = setTimeout(() => {
        setAllowContinueOtpVerify(true);
      }, 2000);
    }
    return () => clearTimeout(timeOut);
  };

  // SEND OTP API
  useEffect(() => {
    if (!(f_userEmailId.length > 0)) {
      setAllowContinueEmailVerify(false);
      return;
    }

    if (f_incorrectEmail) {
      setAllowContinueEmailVerify(false);
      return;
    }
    setAllowContinueEmailVerify(true);
  }, [f_incorrectEmail, f_userEmailId]);

  const handelToSendMailToUserAPI = () => {
    if (!allowContinueEmailVerify) {
      setF_incorrectEmail(true);
      deactivateAfter2sec();
      return;
    }
    setLoaderActive(true);
    setActiveResendButtonOnOtp(false);
    setActiveResendButtonCountDown(46);
    console.log('activeResendButtonCountDown : ',activeResendButtonCountDown)
    const sendOtpApi = `https://groww-backend-omega.vercel.app/api/user/forgot?email=${f_userEmailId}`;

    fetch(sendOtpApi, {
      method: "GET",
      header: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("response is not ok");
          ShowQuickMsgForEmail(response.status);
          setLoaderActive(false);
          setActiveResendButtonOnOtp(true);
          console.log('activeResendButtonCountDown 1 : ',activeResendButtonCountDown)
          return;
        }
        ShowQuickMsgForEmail(response.status);
        scheduleTimeForEnableResendBtn(); // start timer for resent otp in opt section
        setLoaderActive(false);
      })
      .catch((err) => {
        console.log("error while fetching data");
        ShowQuickMsgForEmail(500);
        setLoaderActive(false);
        setActiveResendButtonOnOtp(true);
        console.log('activeResendButtonCountDown 2 : ',activeResendButtonCountDown)
      });
  };

  const ShowQuickMsgForEmail = async (statusCode) => {
    if (statusCode === 401) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Unauthorized request. check credential",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 200) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "OTP successfully send to registered email id",
          positiveResponse: true,
          makeFire: true,
        })
      );
      // .. fn
      setF_inputActive(false);
      setF_emailValidFromDataBase(true); // open otp component
    } else if (statusCode === 404) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Invalid email. Please check.",
          positiveResponse: false,
          makeFire: true,
        })
      );
      //.. fn
      setF_emailNotFoundError(true);
    } else if (statusCode === 500) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Server error. Report and Try again later.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 400) {
      // redux ...
      dispatch(
        fireTheMessagePopUp({
          messageShow: "OTP duplicate , Try again after 2 min",
          positiveResponse: false,
          makeFire: true,
        })
      );
    }

    if (statusCode !== 200) {
      setIsActivateButton(false);
      const timeOut = setTimeout(() => {
        setIsActivateButton(true);
      }, 4000);

      return () => clearTimeout(timeOut);
    }
  };

  // OTP VERIFICATION API
  const handelOtpVerificationAPI = () => {
    if (f_userInputOtp === "") {
      setAllowContinueOtpVerify(false);
      deactivateAfter2sec("otp");
      console.log("not allow with null otp");
      return;
    }
    setLoaderActive(true);
    const apiForOtpVerify = `https://groww-backend-omega.vercel.app/api/user/otpVerification?email=${f_userEmailId}&otp=${f_userInputOtp}`;

    fetch(apiForOtpVerify, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("response is not ok");
          ShowQuickMsgForOtpSend(response.status);
          setLoaderActive(false);
          return;
        }
        ShowQuickMsgForOtpSend(response.status);
        setLoaderActive(false);
      })
      .catch((err) => {
        ShowQuickMsgForOtpSend(500);
        console.log("error while fetching data");
        setLoaderActive(false);
      });
  };

  const ShowQuickMsgForOtpSend = async (statusCode) => {
    if (statusCode === 401) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Unauthorized request. check your credential",
          positiveResponse: false,
          makeFire: true,
        })
      );
      // ... fn
      setF_OtpResponseFromDataBase(false);
    } else if (statusCode === 200) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "OTP verification successful.",
          positiveResponse: true,
          makeFire: true,
        })
      );
      // ... fn
      setF_OtpResponseFromDataBase(true);
      setSuccessMessageFromDataBaseForOTP(true);
      setF_otpValidFromDataBase(true); // open change password component
      setF_inputActive(false);
    } else if (statusCode === 404) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Invalid OTP , try agin this process.",
          positiveResponse: false,
          makeFire: true,
        })
      );
      // ... fn
      setF_OtpResponseFromDataBase(false);
    } else if (statusCode === 403) {
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Incorrect OTP. Please try again.",
          positiveResponse: false,
          makeFire: true,
        })
      );
      // ... fn
      setF_OtpResponseFromDataBase(true);
      setSuccessMessageFromDataBaseForOTP(false);
    } else if (statusCode === 500) {
      setF_OtpResponseFromDataBase(false);
      //.... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Server error. Try again later.",
          positiveResponse: false,
          makeFire: true,
        })
      );
      // ... fn
    }

    if (statusCode !== 200) {
      setIsActivateButton(false);
      const timeOut = setTimeout(() => {
        setIsActivateButton(true);
      }, 4000);

      return () => clearTimeout(timeOut);
    }
  };

  // Update password
  useEffect(() => {
    if (
      !(
        f_changeInputPassword.length > 0 &&
        f_changeInputConformPassword.length > 0
      )
    ) {
      setAllowContinueUpdatePassword(false);
      return;
    }

    if (
      !(
        f_errorCIP === "Seems Like All Set For Update Password" &&
        f_errorCICP === "Seems Like All Set For Update Password"
      )
    ) {
      setAllowContinueUpdatePassword(false);
      return;
    }
    setAllowContinueUpdatePassword(true);
  }, [
    f_changeInputConformPassword.length,
    f_changeInputPassword.length,
    f_errorCICP,
    f_errorCIP,
  ]);

  const handelToUpdatePassword = () => {
    if (!allowContinueUpdatePassword) {
      ShowQuickMsgForUpdatePassword(888);
      console.log("input null error");
      return;
    }
    setLoaderActive(true);
    const updatePasswordAPI = "https://groww-backend-omega.vercel.app/api/user/updatePassword";

    const UpdateData = {
      email: f_userEmailId,
      password: f_changeInputPassword,
    };
    fetch(updatePasswordAPI, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdateData),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(" response not ok while update pass");
          ShowQuickMsgForUpdatePassword(response.status);
          setLoaderActive(false);
          return;
        }
        ShowQuickMsgForUpdatePassword(response.status);
        setLoaderActive(false);
      })
      .catch((err) => {
        ShowQuickMsgForUpdatePassword(500);
        console.log("server error while update data");
        setLoaderActive(false);
      });
  };

  const ShowQuickMsgForUpdatePassword = async (statusCode) => {
    if (statusCode === 401) {
      // setSuccessMsgStatus(false);
      // setMsgContent("Unauthorized request. Please log in.");
      // ... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Unauthorized request. Please log in.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 200) {
      // setSuccessMsgStatus(true);
      // setMsgContent("Password changed successfully.");
      // ... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Password changed successfully. login please",
          positiveResponse: true,
          makeFire: true,
        })
      );
      //... fn
      navigate("/login"); // redirect to login
      setF_inputActive(false);
    } else if (statusCode === 404) {
      // setSuccessMsgStatus(false);
      // setMsgContent("Invalid email. Please check.");
      // ... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Invalid email. Please check.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 500) {
      // setSuccessMsgStatus(false);
      // setMsgContent("Server error. Please try later.");
      // ... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Server error. Please try later.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    } else if (statusCode === 888) {
      // setSuccessMsgStatus(false);
      // setMsgContent("Invalid input or null error.");
      // ... redux
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Invalid input or null error.",
          positiveResponse: false,
          makeFire: true,
        })
      );
    }
    if (statusCode !== 200) {
      setIsActivateButton(false);
      const timeOut = setTimeout(() => {
        setIsActivateButton(true);
      }, 4000);

      return () => clearTimeout(timeOut);
    }
  };

  useState(() => {
    const interval2 = setInterval(() => {
      setAnimationTextChangeforgot((pvrState) => {
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
      clearInterval(interval2);
    };
  }, []);

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
        setF_errorCIP("Seems Like All Set For Update Password");
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
        setF_errorCICP("Seems Like All Set For Update Password");
      }
    } else if (f_changeInputConformPassword === "") {
      setF_errorCICP("");
    }
  }, [f_inputActiveCP, f_changeInputConformPassword, f_changeInputPassword]);

  useEffect(() => {
    if (f_inputActive) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setF_incorrectEmail(!emailPattern.test(f_userEmailId));
    } else {
      setF_incorrectEmail(false);
    }
  }, [f_inputActive, f_userEmailId]);

  const scheduleTimeForEnableResendBtn = (status) => {
    let time = 45;
    const timeInterval = setInterval(() => {
      setActiveResendButtonCountDown(time);
      if (time === 0) {
        setActiveResendButtonCountDown(time);
        setActiveResendButtonOnOtp(true);
        clearInterval(timeInterval);
      }
      time--;
    }, 1000);
  };

  return (
    <div className="main_view_forgot">
      <div className="main_center_element_forgot">
        <div className="top_element_forgot">
          <div className="logo_icon_forgot">
            <img src={Logo_dark} alt="" />
          </div>
        </div>
        <div className="bottom_element_forgot">
          <div className="login_box_forgot">
            <div className="login_left_forgot">
              <div className="login_left_forgot_inter">
                <div className="left_tagline_top_forgot">
                  <p id="left_tagline_top_forgot_text">Simple, Free</p>
                  <p id="left_tagline_top_forgot_text">Investing.</p>
                </div>
                <div className="left_tagline_bottom_forgot">
                  <div id="interval_forgot"></div>
                  <p id="left_tagline_bottom_text">
                    {animationTextChangeforgot}
                  </p>
                </div>
              </div>
            </div>
            <div className="login_right_forgot">
              {!f_otpValidFromDataBase ? (
                <div className="login_right_forgot_arrange">
                  <div className="login_with_forgot">
                    <div className="lwg_title_forgot">
                      <p>Forgot Password</p>
                    </div>
                    <div className="lwg_box_forgot">
                      <div className="lwg_wrap_image_forgot">
                        <img src={forgot_amico} alt="icon" />
                      </div>
                    </div>
                  </div>

                  {/* ............ */}
                  {!f_emailValidFromDataBase ? (
                    <div
                      className="login_with_id_forgot_email"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelToSendMailToUserAPI();
                        }
                      }}
                    >
                      <div className="input_email_div_forgot_email">
                        <div className="ied_center_forgot_email">
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
                              <label id="email_incorrect_error_forgot">
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

                      <div className="continue_btn_div_forgot">
                        <button
                          id="cnt_btn"
                          disabled={!isActivateButton}
                          onClick={() => {
                            handelToSendMailToUserAPI();
                          }}
                          style={{
                            backgroundColor: isActivateButton
                              ? null
                              : "#22b892cf",
                            cursor: isActivateButton ? null : "no-drop",
                          }}
                        >
                          {loaderActive ? <Loader /> : <p>Send OTP</p>}
                        </button>
                      </div>
                      <div className="company_terms_div_forgot_email">
                        <p>
                          i just remind my password ?{" "}
                          <Link to="/login">Login Account</Link>{" "}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="login_with_id_forgot_otp"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handelOtpVerificationAPI();
                        }
                      }}
                    >
                      <div className="input_email_div_forgot_otp">
                        <div className="ied_center_forgot_otp">
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
                          {allowContinueOtpVerify ? (
                            <div className="email_error_div">
                              {otpResponseFromDataBase ? (
                                <label
                                  id="email_invalid_error"
                                  style={{
                                    color: successMessageFromDataBaseForOTP
                                      ? "green"
                                      : "red",
                                  }}
                                >
                                  {successMessageFromDataBaseForOTP
                                    ? "OTP Verify Successfully"
                                    : "OTP Incorrect"}
                                </label>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <label id="email_invalid_error">
                              OTP does not to be null
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="continue_btn_div_forgot">
                        <button
                          id="cnt_btn"
                          disabled={!isActivateButton}
                          style={{
                            backgroundColor: isActivateButton
                              ? null
                              : "#22b892cf",
                            cursor: isActivateButton ? null : "no-drop",
                          }}
                          onClick={() => {
                            handelOtpVerificationAPI();
                          }}
                        >
                          {loaderActive ? <Loader /> : <p>Validate</p>}
                        </button>
                      </div>
                      <div className="company_terms_div_forgot">
                        <span id="company_terms_div_forgot_span_1">
                          {" "}
                          Still not getting OTP ?{" "}
                        </span>
                        <span id="company_terms_div_forgot_span_2">
                          {activeResendButtonOnOtp ? (
                            <button
                              onClick={() => {
                                handelToSendMailToUserAPI();
                              }}
                            >
                              Resend Otp
                            </button>
                          ) : (
                            <span>
                              {
                                activeResendButtonCountDown===46?
                                'Process':
                                `Resend in ${activeResendButtonCountDown} sec`
                              }
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="login_right_forgot_arrange">
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

                  <div
                    className="Create_password_section"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handelToUpdatePassword();
                      }
                    }}
                  >
                    <div className="input_createPass_div">
                      <div className="ied_center_forgot_set_pass">
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
                          className="ied_center_forgot_set_pass_password_hide_and_view"
                          onClick={() => {
                            setIsUpdatePassHide(!isUpdatePassHide);
                          }}
                        >
                          {!isUpdatePassHide ? (
                            <svg
                              id="ied_center_forgot_set_pass_password_hide_and_view_svg_see"
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
                              id="ied_center_forgot_set_pass_password_hide_and_view_svg_notSee"
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
                              id="email_incorrect_error_forgot"
                              style={{
                                color:
                                  f_errorCIP ===
                                  "Seems Like All Set For Update Password"
                                    ? "#39ac13"
                                    : "#d50707",
                              }}
                            >
                              {f_errorCIP}
                            </label>
                          }
                        </div>
                      </div>
                      <div className="ied_center_forgot_conf_pass">
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
                          className="ied_center_forgot_conf_pass_password_hide_and_view"
                          onClick={() => {
                            setIsUpdateConfPassHide(!isUpdateConfPassHide);
                          }}
                        >
                          {!isUpdateConfPassHide ? (
                            <svg
                              id="ied_center_forgot_conf_pass_password_hide_and_view_svg_see"
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
                              id="ied_center_forgot_conf_pass_password_hide_and_view_svg_notSee"
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
                              id="email_incorrect_error_forgot"
                              style={{
                                color:
                                  f_errorCICP ===
                                  "Seems Like All Set For Update Password"
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

                    <div className="createPass_continue_btn_div_forgot">
                      <button
                        id="cnt_btn"
                        disabled={!isActivateButton}
                        style={{
                          backgroundColor: isActivateButton
                            ? null
                            : "#22b892cf",
                          cursor: isActivateButton ? null : "no-drop",
                        }}
                        onClick={() => {
                          handelToUpdatePassword();
                        }}
                      >
                        {loaderActive ? <Loader /> : <p>Change</p>}
                      </button>
                    </div>
                    <div className="_createPass_company_terms_div_forgot">
                      <p>
                        Issue in change password ?{" "}
                        <Link to="#!" onClick={reloadPage}>
                          Go to Forgot
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
