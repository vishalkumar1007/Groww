import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Logo_dark from "../../assets/svg/groww-logo-dark.svg";
import MessagePopUp from "../../component/MessagePopUp/MessagePopUp";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/LoaderComponent/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputActiveFirstName, setInputActiveFirstName] = useState(false);
  const [inputActiveLastName, setInputActiveLastName] = useState(false);
  const [inputActiveEmailId, setInputActiveEmailId] = useState(false);
  const [inputActivePassword, setInputActivePassword] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmailId, setUserEmailId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [firstNameInputError, setFirstNameError] = useState("");
  const [lastNameInputError, setLastNameError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [isSignUpPasswordHide, setIsSignUpPasswordHide] = useState(true);
  const [animationTextChangeSignUp, setAnimationTextChangeSignUp] =
    useState("Mutual Funds");

  const [showMsg, setShowMsg] = useState(false);
  const [successMsgStatus, setSuccessMsgStatus] = useState(true);
  const [msgContent, setMsgContent] = useState("OK Checking With Dummy Data");

  const [isValidForm, SetIsValidForm] = useState(true);
  const [loaderActive, setLoaderActive] = useState(false);

  useEffect(() => {
    if (
      !(
        userFirstName.length &&
        userLastName.length &&
        userEmailId.length &&
        userPassword.length
      )
    ) {
      SetIsValidForm(false);
      return;
    }

    if (
      firstNameInputError.length > 0 ||
      lastNameInputError.length > 0 ||
      emailInputError.length > 0 ||
      passwordInputError.length > 0
    ) {
      SetIsValidForm(false);
      return;
    }
    SetIsValidForm(true);
  }, [
    userFirstName,
    userLastName,
    userEmailId,
    userPassword,
    firstNameInputError,
    lastNameInputError,
    emailInputError,
    passwordInputError,
  ]);

  const submitForm = async () => {
    if (
      !(
        userFirstName.length &&
        userLastName.length &&
        userEmailId.length &&
        userPassword.length
      )
    ) {
      userFirstName.length > 0
        ? setFirstNameError("")
        : setFirstNameError("Enter your first name");
      userLastName.length > 0
        ? setLastNameError("")
        : setLastNameError("Enter your last name");
      userEmailId.length > 0
        ? setEmailInputError("")
        : setEmailInputError("Enter email id");
      userPassword.length > 0
        ? setPasswordInputError("")
        : setPasswordInputError("Create Your password");
      return;
    }

    if (
      firstNameInputError.length > 0 ||
      lastNameInputError.length > 0 ||
      emailInputError.length > 0 ||
      passwordInputError.length > 0
    ) {
      return;
    }

    setLoaderActive(true);

    const userSignUpData = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmailId,
      password: userPassword,
    };

    const SignUpAPI = "http://localhost:8080/api/user/signup";

    fetch(SignUpAPI, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userSignUpData),
    })
      .then(async (response) => {
        if (!response.ok) {
          // const errorData = await response.json();
          // console.log(errorData);
          ShowQuickMsg(response.status);
          setLoaderActive(false);
          return;
        }
        ShowQuickMsg(response.status);
        setLoaderActive(false);
      })
      .catch((err) => {
        setLoaderActive(false);
        ShowQuickMsg(500);
        console.log("error on POST request", err);
      });

    setUserFirstName("");
    setInputActiveFirstName(false);
    setUserLastName("");
    setInputActiveLastName(false);
    setUserEmailId("");
    setInputActiveEmailId(false);
    setUserPassword("");
    setInputActivePassword(false);
  };

  const handleBlurFirstName = (event) => {
    if (event.target.value === "") {
      setInputActiveFirstName(false);
    }
  };
  const handleBlurLastName = (event) => {
    if (event.target.value === "") {
      setInputActiveLastName(false);
    }
  };
  const handleBlurEmail = (event) => {
    if (event.target.value === "") {
      setInputActiveEmailId(false);
    }
  };
  const handleBlurPassword = (event) => {
    if (event.target.value === "") {
      setInputActivePassword(false);
    }
  };

  useState(() => {
    const interval2 = setInterval(() => {
      setAnimationTextChangeSignUp((pvrState) => {
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

  useEffect(() => {
    if (inputActiveFirstName) {
      if (userFirstName.length < 4 || userFirstName.length > 12) {
        setFirstNameError("Length of name must be between 4 to 12");
      } else if (/[0-9]/.test(userFirstName)) {
        setFirstNameError("Name does not contain any number");
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|", "@", "#", "-", ".", "/"].some(
          (ele) => userFirstName.includes(ele)
        )
      ) {
        setFirstNameError("Name does not any special character");
      } else {
        setFirstNameError("");
      }
    } else {
      setFirstNameError("");
    }
  }, [userFirstName, inputActiveFirstName]);

  useEffect(() => {
    if (inputActiveLastName) {
      if (userLastName.length < 2 || userLastName.length > 10) {
        setLastNameError("Length of name must be between 2 to 10");
      } else if (/[0-9]/.test(userLastName)) {
        setLastNameError("Name does not contain any number");
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|", "@", "#", "-", ".", "/"].some(
          (ele) => userLastName.includes(ele)
        )
      ) {
        setLastNameError("Name does not any special character");
      } else {
        setLastNameError("");
      }
    } else {
      setLastNameError("");
    }
  }, [userLastName, inputActiveLastName]);

  useEffect(() => {
    if (inputActivePassword) {
      if (userPassword.length < 7 || userPassword.length > 20) {
        setPasswordInputError("Password length must be between 7 to 20");
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userPassword.includes(operator)
        )
      ) {
        setPasswordInputError(
          "Not allow to use these character $ ! % ^ | ( ) "
        );
      } else if (!/\d/.test(userPassword)) {
        setPasswordInputError("Password must be contain number");
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userPassword.includes(operator)
        )
      ) {
        setPasswordInputError("Password must be contain special character");
      } else if (!/[A-Z]/.test(userPassword)) {
        setPasswordInputError(
          "Password must contain at least one capital letter"
        );
      } else {
        setPasswordInputError("");
      }
    } else if (userPassword === "") {
      setPasswordInputError("");
    }
  }, [inputActivePassword, userPassword]);

  useEffect(() => {
    if (inputActiveEmailId) {
      if (!userEmailId.length) {
        setEmailInputError("Enter your email id");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmailId)) {
        setEmailInputError("Incorrect email format");
      } else {
        setEmailInputError("");
      }
    } else {
      setEmailInputError("");
    }
  }, [inputActiveEmailId, userEmailId]);

  const ShowQuickMsg = async (statusCode) => {
    if (statusCode === 401) {
      setSuccessMsgStatus(false);
      setMsgContent("All fields are required.");
    } else if (statusCode === 409) {
      setSuccessMsgStatus(false);
      setMsgContent("User already registered. Please log in.");
    } else if (statusCode === 201) {
      setSuccessMsgStatus(true);
      setMsgContent("User sign-up successful.");
    } else if (statusCode === 400) {
      setSuccessMsgStatus(false);
      setMsgContent("Please verify your input.");
    } else if (statusCode === 500) {
      setSuccessMsgStatus(false);
      setMsgContent("Server error. Please try again later.");
    }

    let timeOut;
    if (!showMsg) {
      SetIsValidForm(false);
      timeOut = setShowMsg(true);
      setTimeout(() => {
        if (statusCode === 201) {
          navigate("/Dashboard");
        }
        setShowMsg(false);
        SetIsValidForm(true);
      }, 5000);
    }

    return clearTimeout(timeOut);
  };

  return (
    <div className="main_view_sign_up">
      {showMsg ? (
        <div className="msg_pop_up">
          <MessagePopUp isSuccess={successMsgStatus} message={msgContent} />
        </div>
      ) : null}
      <div className="main_center_element_sign_up">
        <div className="top_element_sign_up">
          <div className="logo_icon_sign_up">
            <img src={Logo_dark} alt="" />
          </div>
        </div>
        <div className="bottom_element_sign_up">
          <div className="sign_up_box">
            <div className="sign_up_left">
              <div className="sign_up_left_inter">
                <div className="left_tagline_top_sign_up">
                  <p id="left_tagline_top_sign_up_text">Simple, Free</p>
                  <p id="left_tagline_top_sign_up_text">Investing.</p>
                </div>
                <div className="left_tagline_bottom_sign_up">
                  <div id="interval_signUp"></div>
                  <p id="left_tagline_bottom_text">
                    {animationTextChangeSignUp}
                  </p>
                </div>
              </div>
            </div>
            <div className="sign_up_right">
              <div className="sign_up_right_arrange">
                <div className="with_sign_up">
                  <div className="lwg_title_sign_up">
                    <p>Welcome to Groww</p>
                  </div>
                </div>

                  <div className="sign_up_with_id"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); 
                        submitForm(); 
                      }
                    }}
                  
                  >
                    <div className="input_email_div_sign_up">
                      <div className="ied_center_sign_up_first_name">
                        <label
                          className={
                            inputActiveFirstName
                              ? "placeholder_move_sign_up_first_name"
                              : "placeholder_static_sign_up_first_name"
                          }
                        >
                          First Name
                        </label>
                        <input
                          className={
                            inputActiveFirstName
                              ? "inputActive_first_name"
                              : "inputDeactivate_first_name"
                          }
                          type="name"
                          onFocus={() => {
                            setInputActiveFirstName(true);
                          }}
                          onBlur={handleBlurFirstName}
                          onChange={(e) => {
                            setUserFirstName(e.target.value);
                          }}
                          value={userFirstName}
                        />
                        {/* <div className="email_error_div_sign_up"> */}
                        <div className="email_error_div_sign_up_first_name">
                          {firstNameInputError !== "" ? (
                            // <label id="error_sign_up_label">
                            <label id="error_sign_up_label_first_name">
                              {firstNameInputError}
                            </label>
                          ) : null}
                        </div>
                      </div>
                      <div className="ied_center_sign_up_second_name">
                        <label
                          className={
                            inputActiveLastName
                              ? "placeholder_move_sign_up_second_name"
                              : "placeholder_static_sign_up_second_name"
                          }
                        >
                          Last Name
                        </label>
                        <input
                          className={
                            inputActiveLastName
                              ? "inputActive_second_name"
                              : "inputDeactivate_second_name"
                          }
                          type="name"
                          onFocus={() => {
                            setInputActiveLastName(true);
                          }}
                          onBlur={handleBlurLastName}
                          onChange={(e) => {
                            setUserLastName(e.target.value);
                          }}
                          value={userLastName}
                        />
                        <div className="email_error_div_sign_up_second_name">
                          {lastNameInputError !== "" ? (
                            <label id="error_sign_up_label_second_name">
                              {lastNameInputError}
                            </label>
                          ) : null}
                        </div>
                      </div>
                      <div className="ied_center_sign_up_email_add">
                        <label
                          className={
                            inputActiveEmailId
                              ? "placeholder_move_sign_up_email_add"
                              : "placeholder_static_sign_up_email_add"
                          }
                        >
                          Email Address
                        </label>
                        <input
                          className={
                            inputActiveEmailId
                              ? "inputActive_email_add"
                              : "inputDeactivate_email_add"
                          }
                          type="email"
                          onFocus={() => {
                            setInputActiveEmailId(true);
                          }}
                          onBlur={handleBlurEmail}
                          onChange={(e) => {
                            setUserEmailId(e.target.value);
                          }}
                          value={userEmailId}
                        />
                        <div className="email_error_div_sign_up_email_add">
                          {emailInputError !== "" ? (
                            <label id="error_sign_up_label_email_add">
                              {emailInputError}
                            </label>
                          ) : null}
                        </div>
                      </div>
                      <div className="ied_center_sign_up_enter_pass">
                        <label
                          className={
                            inputActivePassword
                              ? "placeholder_move_sign_up_enter_pss"
                              : "placeholder_static_sign_up_enter_pss"
                          }
                        >
                          Enter Password
                        </label>
                        <input
                          className={
                            inputActivePassword
                              ? "inputActive_enter_pass"
                              : "inputDeactivate_enter_pass"
                          }
                          type={isSignUpPasswordHide ? "password" : "text"}
                          onFocus={() => {
                            setInputActivePassword(true);
                          }}
                          onBlur={handleBlurPassword}
                          onChange={(e) => {
                            setUserPassword(e.target.value);
                          }}
                          value={userPassword}
                        />
                        <div
                          className="ied_center_sign_up_password_hide_and_view"
                          onClick={() => {
                            setIsSignUpPasswordHide(!isSignUpPasswordHide);
                          }}
                        >
                          {!isSignUpPasswordHide ? (
                            <svg
                              id="ied_center_sign_up_password_hide_and_view_svg_see"
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
                              id="ied_center_sign_up_password_hide_and_view_svg_notSee"
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

                        <div className="email_error_div_sign_up__enter_pass">
                          {passwordInputError ? (
                            <label id="error_sign_up_label__enter_pass">
                              {passwordInputError}
                            </label>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="continue_btn_div_sign_up">
                      <button
                        id="cnt_btn"
                        onClick={() => {
                          submitForm();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            console.log("ok dev");
                          }
                        }}
                        style={{
                          backgroundColor: isValidForm ? null : "#22b892cf",
                          cursor: isValidForm ? null : "no-drop",
                        }}
                      >
                        {loaderActive ? <Loader /> : <p>Sign Up</p>}
                      </button>
                    </div>
                    <div className="company_terms_div_sign_up">
                      <p>
                        Have already account ?{" "}
                        <Link to={"/login"}>Login account</Link>
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
