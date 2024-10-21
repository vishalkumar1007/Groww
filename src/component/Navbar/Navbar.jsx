import { useState, useRef, useEffect } from "react";
import CompanyLogo from "../../assets/svg/groww-logo-light.svg";
import AlertConfig from "../AlertConfig/AlertConfig";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserCartValue } from "../../features/userCart/centralExportUserCart";
import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";
import {addUserDetail} from "../../features/userProfileData/centralExportUserProfileData";

const Navbar = ({ callFrom = "" }) => {
  const dispatch = useDispatch();
  const userCardCount = useSelector(selectUserCartValue);
  const navigate = useNavigate();
  const [activeFeture, setActiveFeture] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userTokenData, setUserTokenData] = useState();
  const [openAlertConfig, setOpenAlertConfig] = useState(false);

  const removeActivePagePreview = () => {
    setActiveFeture("");
  };

  useEffect(() => {
    if (callFrom === "Dashboard") {
      setActiveFeture("Explore");
    } else {
      setActiveFeture(callFrom);
    }
  }, [callFrom]);

  const openNavSection = (data) => {
    if (data === "Explore") {
      navigate("/dashboard");
    } else {
      navigate("/user/investments");
    }
  };

  const userActionOnLogOut = (userResponse) => {
    if (userResponse) {
      setOpenAlertConfig(false);
      handelToRemoveJWTFromLocalStorage();
      dispatch(
        fireTheMessagePopUp({
          messageShow: "user log out successful",
          positiveResponse: true,
          makeFire: true,
        })
      );
      navigate("/");
    } else {
      setOpenAlertConfig(false);
    }
  };

  const handelToRemoveJWTFromLocalStorage = async () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const data = JSON.parse(window.atob(base64));
    setUserTokenData(data);
    dispatch(addUserDetail(data))
  }, [dispatch, navigate]);


  const profileSectionRef = useRef(null);

  useEffect(() => {
    if (isProfileOpen) {
      profileSectionRef.current.style.height = `${profileSectionRef.current.scrollHeight}px`;
      profileSectionRef.current.style.border = "1.5px solid #dfdfdf";
    } else {
      profileSectionRef.current.style.height = "0px";
      profileSectionRef.current.style.border = "0px solid #dfdfdf";
    }
  }, [isProfileOpen]);

  return (
    <>
      {openAlertConfig ? (
        <AlertConfig
          requestToClose={(userResponse) => userActionOnLogOut(userResponse)}
          headText={
            userTokenData ? `Hey, ${userTokenData.userFirstName}` : "User"
          }
          msgText="Are you sure you want to log out your account ?"
          extraInfoText="Thank you , Hope you like this Groww , if you are facing any issue please report us..."
        />
      ) : null}
      <div className="Navbar_main">
        <div className="Navbar_content_limit_width">
          <div className="Navbar_logo">
            <div className="Navbar_logo_groww">
              <img src={CompanyLogo} alt="" />
            </div>
          </div>

          {/* ........... */}

          <div className="Navbar_feature">
            <div className="Navbar_feature_explore">
              <p
                style={{
                  color: activeFeture === "Explore" ? "#00B386" : "#7c7e8c",
                }}
                onClick={() => {
                  setActiveFeture("Explore");
                  openNavSection("Explore");
                }}
              >
                Explore
              </p>
            </div>
            <div className="Navbar_feature_investment">
              <p
                style={{
                  color: activeFeture === "Investments" ? "#00B386" : "#7c7e8c",
                }}
                onClick={() => {
                  setActiveFeture("Investments");
                  openNavSection("Investments");
                }}
              >
                Investments
              </p>
            </div>
          </div>

          {/* .......... */}

          <div className="Navbar_search">
            <div className="Navbar_search_action">
              <div className="Navbar_search_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7e7e7e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <div className="Navbar_search_action_main">
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                />
              </div>
            </div>
          </div>

          {/* ........... */}

          <div className="Navbar_activity">
            <div className="Navbar_activity_notification">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#454545"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bell"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </div>
            <div
              className="Navbar_activity_wallet"
              onClick={() => {
                navigate("/wallet");
                removeActivePagePreview();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#454545"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-wallet"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
            </div>
            <div
              className="Navbar_activity_shop"
              onClick={() => {
                navigate("/shop_cart");
                removeActivePagePreview();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#454545"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {userCardCount.length === 0 ? null : (
                <div className="navbar_cart_count_div_main">
                  {userCardCount.length}
                </div>
              )}
            </div>
            <div
              className="Navbar_activity_profile"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
              }}
            >
              <div
                className="Navbar_activity_profile_image"
                style={{
                  backgroundColor: userTokenData
                    ? userTokenData.userColorCode
                    : null,
                }}
              >
                <p>
                  {userTokenData
                    ? userTokenData.userFirstName[0].toUpperCase()
                    : "X"}
                </p>
              </div>
              <div
                className="Navbar_activity_profile_activate_deactivate_icon"
                id={
                  isProfileOpen ? "Navbar_activate_deactivate_icon_rotate" : ""
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9c9c9c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* profile absolute div  */}

            <div
              ref={profileSectionRef}
              className={`Navbar_user_Profile_section ${
                isProfileOpen ? "open" : ""
              }`}
            >
              <div className="Navbar_user_Profile_section_user_about">
                <div className="Navbar_user_Profile_section_user_about_arrange">
                  <div className="Navbar_user_Profile_section_user_about_arrange_user_data">
                    <p id="Navbar_user_Profile_section_user_about_arrange_user_data_name">
                      {userTokenData
                        ? `${userTokenData.userFirstName} ${userTokenData.userLastName}`
                        : "User Name"}
                    </p>
                    <p id="Navbar_user_Profile_section_user_about_arrange_user_data_email">
                      {userTokenData
                        ? `${userTokenData.userEmail}`
                        : "user@gmail.com"}
                    </p>
                  </div>
                  <div className="Navbar_user_Profile_section_user_about_setting">
                    <div className="Navbar_user_Profile_section_user_about_setting_main_div">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9e9e9e"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-settings"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Navbar_user_Profile_section_service">
                <div className="Navbar_user_Profile_section_feature">
                  <div className="Navbar_user_Profile_section_feature_arrange">
                    <div className="Navbar_user_Profile_section_service_arrange_pointer_allOrder">
                      <div className="Navbar_user_Profile_section_service_allOrder">
                        <div className="Navbar_user_Profile_section_service_allOrder_icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6d6d6d"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-bell"
                          >
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                          </svg>
                        </div>
                        <div className="Navbar_user_Profile_section_service_allOrder_title">
                          <p>Notification</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8e8e8e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      className="Navbar_user_Profile_section_service_arrange_pointer_bankDetail"
                      onClick={() => {
                        navigate("/wallet");
                      }}
                    >
                      <div className="Navbar_user_Profile_section_service_bankDetail">
                        <div className="Navbar_user_Profile_section_service_bankDetail_icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6d6d6d"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-wallet"
                          >
                            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                          </svg>
                        </div>
                        <div className="Navbar_user_Profile_section_service_bankDetail_title">
                          <p>Wallet</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8e8e8e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      className="Navbar_user_Profile_section_service_arrange_pointer_customerSupport"
                      onClick={() => {
                        navigate("/shop_cart");
                      }}
                    >
                      <div className="Navbar_user_Profile_section_service_customerSupport">
                        <div className="Navbar_user_Profile_section_service_customerSupport_icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6d6d6d"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-shopping-cart"
                          >
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                          </svg>
                        </div>
                        <div className="Navbar_user_Profile_section_service_customerSupport_title">
                          <p>Order Item</p>
                          {userCardCount.length === 0 ? null : (
                            <p id="user_order_card_counter_ui">
                              {userCardCount.length}
                            </p>
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8e8e8e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* .....................  */}

                <div className="Navbar_user_Profile_section_service_arrange">
                  <div className="Navbar_user_Profile_section_service_arrange_pointer_allOrder"
                    onClick={() => {
                      navigate("/dashboard/watchlist");
                    }}
                  >
                    <div className="Navbar_user_Profile_section_service_allOrder">
                      <div className="Navbar_user_Profile_section_service_allOrder_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6d6d6d"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="7" height="7" x="3" y="3" rx="1" />
                          <rect width="7" height="7" x="3" y="14" rx="1" />
                          <path d="M14 4h7" />
                          <path d="M14 9h7" />
                          <path d="M14 15h7" />
                          <path d="M14 20h7" />
                        </svg>
                      </div>
                      <div className="Navbar_user_Profile_section_service_allOrder_title">
                        <p>Watchlist</p>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8e8e8e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className="Navbar_user_Profile_section_service_arrange_pointer_bankDetail"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <div className="Navbar_user_Profile_section_service_bankDetail">
                      <div className="Navbar_user_Profile_section_service_bankDetail_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6d6d6d"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-layout-dashboard"
                        >
                          <rect width="7" height="9" x="3" y="3" rx="1" />
                          <rect width="7" height="5" x="14" y="3" rx="1" />
                          <rect width="7" height="9" x="14" y="12" rx="1" />
                          <rect width="7" height="5" x="3" y="16" rx="1" />
                        </svg>
                      </div>
                      <div className="Navbar_user_Profile_section_service_bankDetail_title">
                        <p>Dashboard</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8e8e8e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className="Navbar_user_Profile_section_service_arrange_pointer_customerSupport"
                    onClick={() => {
                      navigate("/user/investments");
                    }}
                  >
                    <div className="Navbar_user_Profile_section_service_customerSupport">
                      <div className="Navbar_user_Profile_section_service_customerSupport_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="25px"
                          viewBox="0 -960 960 960"
                          width="25px"
                          fill="#6d6d6d"
                        >
                          <path d="M660-570q-25 0-42.5-17.5T600-630q0-25 17.5-42.5T660-690q25 0 42.5 17.5T720-630q0 25-17.5 42.5T660-570Zm-360 0q-25 0-42.5-17.5T240-630q0-25 17.5-42.5T300-690q25 0 42.5 17.5T360-630q0 25-17.5 42.5T300-570Zm180 110q-25 0-42.5-17.5T420-520q0-25 17.5-42.5T480-580q25 0 42.5 17.5T540-520q0 25-17.5 42.5T480-460Zm0-220q-25 0-42.5-17.5T420-740q0-25 17.5-42.5T480-800q25 0 42.5 17.5T540-740q0 25-17.5 42.5T480-680Zm0 520q-20 0-40.5-3t-39.5-8v-143q0-35 23.5-60.5T480-400q33 0 56.5 25.5T560-314v143q-19 5-39.5 8t-40.5 3Zm-140-32q-20-8-38.5-18T266-232q-28-20-44.5-52T205-352q0-26-5.5-48.5T180-443q-10-13-37.5-39.5T92-532q-11-11-11-28t11-28q11-11 28-11t28 11l153 145q20 18 29.5 42.5T340-350v158Zm280 0v-158q0-26 10-51t29-42l153-145q12-11 28.5-11t27.5 11q11 11 11 28t-11 28q-23 23-50.5 49T780-443q-14 20-19.5 42.5T755-352q0 36-16.5 68.5T693-231q-16 11-34.5 21T620-192Z" />
                        </svg>
                      </div>
                      <div className="Navbar_user_Profile_section_service_customerSupport_title">
                        <p>Investments</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8e8e8e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Navbar_user_Profile_section_footer">
                <div className="Navbar_user_Profile_section_footer_arrange">
                  <div className="Navbar_user_Profile_section_footer_arrange_Darkmode">
                    {/* <div className="Navbar_user_Profile_section_footer_arrange_Darkmode_svg_div">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </div> */}
                  </div>
                  <div className="Navbar_user_Profile_section_footer_arrange_logout">
                    <p
                      onClick={() => {
                        setOpenAlertConfig(!openAlertConfig);
                        setIsProfileOpen(false);
                      }}
                    >
                      Log out
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
