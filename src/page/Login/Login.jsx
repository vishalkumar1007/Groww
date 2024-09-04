import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo_dark from "../../assets/svg/groww-logo-dark.svg";
import google_svg from "../../assets/svg/google.icon.svg";

const Login = () => {
  const [inputActive, setInputActive] = useState(false);
  const [userEmailId, setUserEmailId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [emailValidFromDataBase, setEmailValidFromDataBase] = useState(false);
  const [passwordValidFromDataBase, setPasswordValidFromDataBase] =
    useState(false);
  const [passwordErrorAlert, setPasswordErrorAlert] = useState("");
  const [isLoginPasswordHide, setIsLoginPasswordHide] = useState(true);

  const checkInputFocus = () => {
    setInputActive(true);
  };
  const handleBlur = (event) => {
    if (event.target.value === "") {
      setInputActive(false);
    }
  };

  useEffect(() => {
    if (inputActive) {
      if (userPassword.length < 7 || userPassword.length > 20) {
        setPasswordErrorAlert("Password length must be between 7 to 20");
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userPassword.includes(operator)
        )
      ) {
        setPasswordErrorAlert(
          "Not allow to use these character $ ! % ^ | ( ) "
        );
      } else if (!/\d/.test(userPassword)) {
        setPasswordErrorAlert("Password must be contain number");
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userPassword.includes(operator)
        )
      ) {
        setPasswordErrorAlert("Password must be contain special character");
      } else if (!/[A-Z]/.test(userPassword)) {
        setPasswordErrorAlert(
          "Password must contain at least one capital letter"
        );
      } else {
        setPasswordErrorAlert("Seems Like All Set For Login You Account");
      }
    } else if (userPassword === "") {
      setPasswordErrorAlert("");
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
                  <div id="interval"></div>
                  <p id="left_tagline_bottom_text">Mutual Funds</p>
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
                  <div className="login_with_id">
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
                          if (!incorrectEmail && userEmailId !== "") {
                            setInputActive(false);
                            setEmailValidFromDataBase(true);
                          }
                        }}
                      >
                        Continue
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
                  <div className="login_with_id">
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
                            {passwordValidFromDataBase ? (
                              <label id="email_invalid_error">
                                Your Password is Incorrect
                              </label>
                            ) : (
                              <label
                                id="email_incorrect_error"
                                style={{
                                  color:
                                    passwordErrorAlert ===
                                    "Seems Like All Set For Login You Account"
                                      ? "#39ac13"
                                      : "#d50707",
                                }}
                              >
                                {passwordErrorAlert}
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="continue_btn_div">
                      <button id="cnt_btn">Login</button>
                    </div>
                    <div className="company_terms_div">
                      <p>
                        Don't remember Password ?{" "}
                        <Link to="/forget">Forget Password</Link>
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
