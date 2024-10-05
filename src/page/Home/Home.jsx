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
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
// import IntroAlert from "../../component/IntroAlert/IntroAlert";

const Home = () => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);


  useEffect(()=>{
    const localStorageToken = localStorage.getItem('token');

    if(localStorageToken){
      const api = 'http://localhost:8080/api/user/verify/token';
  
      fetch(api , {
        method:'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorageToken}`
        }
      })
      .then(async (response)=>{
        if(!response.ok){
          console.log('response is not ok');
          return await response.json();
        }

        if(response.status===200){
          navigate('/dashboard');
        }
        console.log('Auto login declined with status', response.status);
      })
      .then((data)=>{
          // save data to redux
      })
      .catch((err)=>{
        console.log('Error on fetching auto login' , err);
      })

    }

  },[navigate])

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
      let timeInterval ;
      if(!isShowAlertOption){
        timeInterval = setTimeout(()=>{
          setIsShowAlertOption(true);
          console.log('true...');
          setPopUpInterval((pvrPopUpValue)=>{return Math.min(pvrPopUpValue*2,120_000)});
        },popUpInterval);
      }
      console.log('PASS...');

      return ()=> clearTimeout(timeInterval);
    },[popUpInterval,isShowAlertOption]);

  */


  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <>
      {
      //   isShowAlertOption?
      //   <div className="HomeMain_alert_show">
      //   <IntroAlert requestToClose={(val)=>{requestToClose(val)}} />
      // </div>:null
      }
      <div className="HomeMain">
        <div className="Home_navbar">
          <div className="Home_nav_logo">
            <div className="Home_nav_logo_handel">
              <img src={GrowwLogo} alt="" />
            </div>
          </div>
          <div className="Home_nav_search">
            <input type="text" placeholder="What are you looking for today" />
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
                stroke="currentColor"
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
          <div
            className="Home_three_menu_bar"
            id={menuActive ? "Home_three_menu_bar_animation" : null}
          >
            <div className="Home_nav_register_menu">
              <button
                onClick={() => {
                  navigate("login");
                }}
              >
                Login/Register
              </button>
            </div>
          </div>
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
                            <div className="Home_body_section_2_left_contain_stock_option_1_div_btn_arrange" onClick={()=>{navigate("dashboard")}}>
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
