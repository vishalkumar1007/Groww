import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import Logo_dark from "../../assets/svg/groww-logo-dark.svg";

const SignUp = () => {
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

  return (
    <div className="main_view_sign_up">
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
                  <div id="interval"></div>
                  <p id="left_tagline_bottom_sign_up_text">Mutual Funds</p>
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

                <div className="sign_up_with_id">
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
                          inputActiveEmailId ? "inputActive_email_add" : "inputDeactivate_email_add"
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
                    <button id="cnt_btn">Sign up</button>
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
