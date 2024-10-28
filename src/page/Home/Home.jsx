import "./Home.css";
import GrowwLogo from "../../assets/svg/groww-logo-light.svg";
import Home_img from "../../assets/img/home_image_intro.png";
import Mobile_image from "../../assets/img/stocksBuy.5382418f.webp";
import indian_market_building from "../../assets/img/indianMarketBuilding.a399b6f2.webp";
import Stocks_icon from "../../assets/img/stocksHistogram.1c5dd346.webp";
import Mutual_icon from "../../assets/img/mutualFundBlocks.ee53101c.webp";
import Future_icon from "../../assets/img/fnoClock.0c7a0775.webp";
import Credit_building from "../../assets/img/creditBuilding.c26d1ba5.webp";
import Personal_loan from "../../assets/img/personalLoan.9d5e746c.webp";
import General_store from "../../assets/img/generalStore.ab44242a.webp";
import Pay_bill from "../../assets/img/payBillsComp.86cfc514.webp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import SearchStock from "../../component/SearchStock/SearchStock";
// import IntroAlert from "../../component/IntroAlert/IntroAlert";

import { useDispatch } from "react-redux";

// import { useDispatch} from "react-redux";
// import { addUserInformation, removeUserInformation } from "../../features/userInformation/userInformationSlice";

import {
  deleteAllWatchlistData,
  // selectUserWatchlistValue,
} from "../../features/userWatchlist/centralExportUserWatchlist";
import {
  deleteAllCartData,
  // selectUserCartValue,
} from "../../features/userCart/centralExportUserCart";
import {
  deleteUserProfileDetail,
  // selectUserProfileData,
} from "../../features/userProfileData/centralExportUserProfileData";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [menuActive, setMenuActive] = useState(false);

  // const xUserWatchlistData = useSelector(selectUserWatchlistValue);
  // const xUserCartData = useSelector(selectUserCartValue);
  // const xUserProfileData = useSelector(selectUserProfileData);

  useEffect(() => {
    dispatch(deleteAllWatchlistData());
    dispatch(deleteAllCartData());
    dispatch(deleteUserProfileDetail());
  }, [dispatch]);

  // useEffect(()=>{
  //     console.log('xUserWatchlistData : ', xUserWatchlistData);
  //     console.log('xUserCartData : ', xUserCartData);
  //     console.log('xUserProfileData : ', xUserProfileData);
  // },[xUserCartData, xUserProfileData, xUserWatchlistData])

  useEffect(() => {
    const localStorageData = localStorage.getItem("existenceKey");

    if (!localStorageData) {
      // Don't change api localhost url to live api url -*
      const userVisitApi = "http://localhost:8080/api/activity/newVisit";

      fetch(userVisitApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          secretkeyauth: "authActivityNewVisit07",
        },
      })
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            const localData = data.existenceKey;
            localStorage.setItem("existenceKey", localData);
          }
        })
        .catch((err) => {
          console.log("Error on visit", err);
        });
    }
  }, []);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
      const tokenVerifyApi = "http://localhost:8080/api/user/verify/token";

      fetch(tokenVerifyApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            return await response.json();
          }

          if (response.status === 200) {
            navigate("/dashboard");
            return await response.json();
          }
          console.log("Auto login declined with status", response.status);
        })
        .then((data) => {
          // save data to redux
          // if(data.msg === 'Token Expired' && data.status === 'access denied'){
          //   dispatch(removeUserInformation());
          // }else{
          //   dispatch(addUserInformation(data));
          // }
        })
        .catch((err) => {
          console.log("Error on fetching auto login", err);
        });
    }
  }, [navigate]);

  /* alert popup  */

  /*
    const [isShowAlertOption , setIsShowAlertOption] = useState(false);
    const [popUpInterval , setPopUpInterval] = useState(5000);

    const requestToClose = (value)=>{
      if(value){
        setIsShowAlertOption(false);
      }
    }

    useEffect(()=>{
      let timeout ;
      if(!isShowAlertOption){
        timeout = setTimeout(()=>{
          setIsShowAlertOption(true);
          console.log('true...');
          setPopUpInterval((pvrPopUpValue)=>{return Math.min(pvrPopUpValue*2,120_000)});
        },popUpInterval);
      }
      console.log('PASS...');

      return ()=> clearTimeout(timeout);
    },[popUpInterval,isShowAlertOption]);

  */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {
        //   isShowAlertOption?
        //   <div className="HomeMain_alert_show">
        //   <IntroAlert requestToClose={(val)=>{requestToClose(val)}} />
        // </div>:null
      }

      <div
        className="HomeMain"
        style={{ overflow: menuActive ? "hidden" : "scroll" }}
        
      >
        <div className="Home_navbar">
          <div className="Home_nav_logo">
            <div className="Home_nav_logo_handel" id="make_groww_logo_z_index">
              {
                // menuActive?
                // <img src={GrowwLogoDark} alt="" id=''/>
                // :
                <img src={GrowwLogo} alt="" id="" />
              }
            </div>
          </div>
          <div className="Home_nav_search">
            {/* <input type="text" placeholder="What are you looking for today" /> */}
            <SearchStock MoveTop={70} RemoveAddToCardFeature={true} />
          </div>
          <div className="Home_nav_register">
            <button
              onClick={() => {
                navigate("login");
              }}
            >
              Login/Register
            </button>
          </div>
          <button
            className="Home_three_line_nav"
            onClick={() => {
              setMenuActive(!menuActive);
            }}
          >
            {menuActive ? (
              <svg
                id="svgMenu1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                id="svgMenu2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
          {menuActive ? (
            <div
              className="Home_three_menu_bar"
              // id={menuActive ? "Home_three_menu_bar_animation" : null}
            >
              {/* <div className="Home_nav_register_menu"></div> */}
              <div className="home_three_menu_sign_in_login">
                <div className="home_three_menu_sign_in_login_btn">
                  <button
                    onClick={() => {
                      navigate("login");
                    }}
                  >
                    login
                  </button>
                </div>
              </div>
              <div className="home_three_menu_search_bar">
                <SearchStock MoveTop={70} RemoveAddToCardFeature={true} />
              </div>
            </div>
          ) : null}
        </div>
        <div className="Home_body">
          <div className="Home_body_section_1">
            <div className="Home_body_section_1_text">
              <div className="Home_body_section_1_text_top">
                <p>All things finance,</p>
                <p>Right here.</p>
              </div>
              <div className="Home_body_section_1_text_mid">
                <p>Build for growing India</p>
              </div>
              <div className="Home_body_section_1_text_btn">
                <button
                  onClick={() => {
                    navigate("login");
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="Home_body_section_1_image">
              <div className="Home_body_section_1_image_arrange">
                <img src={Home_img} alt="" />
              </div>
            </div>
          </div>
          <div className="Home_body_section_2">
            <div className="Home_body_section_2_pd_horizontal">
              <div className="Home_body_section_2_left">
                <div className="Home_body_section_2_left_contain">
                  <div className="Home_body_section_2_left_contain_icon_div">
                    <div className="Home_body_section_2_left_contain_icon_div_img">
                      <img src={indian_market_building} alt="" />
                    </div>
                  </div>
                  <div className="Home_body_section_2_left_contain_title_div">
                    <div className="Home_body_section_2_left_contain_title">
                      <p>Indian markets at </p>
                      <p>your fingertips.</p>
                    </div>
                  </div>
                  <div className="Home_body_section_2_left_contain_tagline_div">
                    <div className="Home_body_section_2_left_contain_tagline">
                      <p>
                        Long-term or short-term, high risk or low risk. Be the
                        kind of investor you want to be.
                      </p>
                    </div>
                  </div>
                  <div className="Home_body_section_2_left_contain_stock_option_div">
                    <div className="Home_body_section_2_left_contain_stock_option_div_arrange">
                      <div className="Home_body_section_2_left_contain_stock_option_1">
                        <div className="Home_body_section_2_left_contain_stock_option_1_div">
                          <button className="Home_body_section_2_left_contain_stock_option_1_div_btn">
                            <div
                              className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrange"
                              onClick={() => {
                                navigate("dashboard");
                              }}
                            >
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_icon">
                                <img src={Stocks_icon} alt="" />
                              </div>
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_title">
                                <p>Stocks & Intraday</p>
                              </div>
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrow">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-chevron-right"
                                >
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="Home_body_section_2_left_contain_stock_option_2">
                        <div className="Home_body_section_2_left_contain_stock_option_1_div">
                          <button className="Home_body_section_2_left_contain_stock_option_1_div_btn">
                            <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrange">
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_icon">
                                <img src={Mutual_icon} alt="" />
                              </div>
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_title">
                                <p>Mutual funds & SIPs</p>
                              </div>
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrow">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-chevron-right"
                                >
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="Home_body_section_2_left_contain_stock_option_3">
                        <div className="Home_body_section_2_left_contain_stock_option_1_div">
                          <button className="Home_body_section_2_left_contain_stock_option_1_div_btn">
                            <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrange">
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_icon">
                                <img src={Future_icon} alt="" />
                              </div>
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_title">
                                <p>Futures & Options</p>
                              </div>
                              <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrow">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-chevron-right"
                                >
                                  <path d="m9 18 6-6-6-6" />
                                </svg>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Home_body_section_2_right">
                <div className="Home_body_section_2_right_mobile_div">
                  <img src={Mobile_image} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="Home_body_section_3">
            <div className="Home_body_section_2_pd_horizontal">
              <div className="Home_body_section_2_left" id="hbs3M_p1">
                <div className="Home_body_section_2_left_contain">
                  <div
                    className="Home_body_section_2_left_contain_icon_div"
                    id="hbs3_p1"
                  >
                    <div className="Home_body_section_2_left_contain_icon_div_img">
                      <img src={Credit_building} alt="" />
                    </div>
                  </div>
                  <div
                    className="Home_body_section_2_left_contain_title_div"
                    id="hbs3_p2"
                  >
                    <div className="Home_body_section_2_left_contain_title">
                      <p>Credit</p>
                      <p>when you need it.</p>
                    </div>
                  </div>
                  <div
                    className="Home_body_section_2_left_contain_tagline_div"
                    id="hbs3_p3"
                  >
                    <div className="Home_body_section_2_left_contain_tagline">
                      <p>Apply for a lone get it within minute</p>
                    </div>
                  </div>
                  <div
                    className="Home_body_section_2_left_contain_stock_option_div"
                    id="hbs3_p4"
                  >
                    <div className="Home_body_section_2_left_contain_stock_option_div_arrange">
                      <div className="Home_body_section_2_left_contain_stock_option_1">
                        <div className="Home_body_section_2_left_contain_stock_option_1_div">
                          <div
                            className="Home_body_section_1_text_btn"
                            id="hbs3_button"
                          >
                            <button>Know More</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Home_body_section_3_right" id="hbs3M_p2">
                <div className="Home_body_section_3_right_mobile_div">
                  <img src={Personal_loan} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="Home_body_section_4">
            <div className="Home_body_section_2_pd_horizontal">
              <div className="Home_body_section_2_left" id="hbs4M_p1">
                <div className="Home_body_section_2_left_contain">
                  <div
                    className="Home_body_section_2_left_contain_icon_div"
                    id="hbs3_p1"
                  >
                    <div className="Home_body_section_2_left_contain_icon_div_img">
                      <img src={General_store} alt="" />
                    </div>
                  </div>
                  <div
                    className="Home_body_section_2_left_contain_title_div"
                    id="hbs3_p2"
                  >
                    <div className="Home_body_section_2_left_contain_title">
                      <p>All Your bills in</p>
                      <p>one place.</p>
                    </div>
                  </div>
                  <div
                    className="Home_body_section_2_left_contain_tagline_div"
                    id="hbs3_p3"
                  >
                    <div className="Home_body_section_2_left_contain_tagline">
                      <p>Pay anyone,anytime,anywhere with Groww Pay</p>
                    </div>
                  </div>
                  <div
                    className="Home_body_section_2_left_contain_stock_option_div"
                    id="hbs3_p4"
                  >
                    <div className="Home_body_section_2_left_contain_stock_option_div_arrange">
                      <div className="Home_body_section_2_left_contain_stock_option_1">
                        <div className="Home_body_section_2_left_contain_stock_option_1_div">
                          <div
                            className="Home_body_section_1_text_btn"
                            id="hbs3_button"
                          >
                            <button>Know More</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Home_body_section_4_right" id="hbs4M_p2">
                <div
                  className="Home_body_section_3_right_mobile_div"
                  id="hbs4M_p2_img_div"
                >
                  <img src={Pay_bill} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="Home_body_section_5">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
