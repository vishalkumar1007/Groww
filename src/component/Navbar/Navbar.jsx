import { useState, useRef, useEffect } from "react";
import CompanyLogo from "../../assets/svg/groww-logo-light.svg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeFeture, setActiveFeture] = useState("Explore");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [screenWidthUpdate, setScreenWidthUpdate] = useState(true);
  // const [screenWidthUpdateLong, setScreenWidthUpdateLong] = useState(null);
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
          <div className="Navbar_activity_wallet">
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
          <div className="Navbar_activity_shop">
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
          </div>
          <div
            className="Navbar_activity_profile"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
            }}
          >
            <div className="Navbar_activity_profile_image">
              <p>V</p>
            </div>
            <div
              className="Navbar_activity_profile_activate_deactivate_icon"
              id={isProfileOpen ? "Navbar_activate_deactivate_icon_rotate" : ""}
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
                    Vishal Kumar
                  </p>
                  <p id="Navbar_user_Profile_section_user_about_arrange_user_data_email">
                    vishalkumarnke93@gmail.com
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
                  <div className="Navbar_user_Profile_section_service_arrange_pointer_bankDetail">
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
                  <div className="Navbar_user_Profile_section_service_arrange_pointer_customerSupport">
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
                <div className="Navbar_user_Profile_section_service_arrange_pointer_allOrder">
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
                        <line x1="10" x2="21" y1="6" y2="6" />
                        <line x1="10" x2="21" y1="12" y2="12" />
                        <line x1="10" x2="21" y1="18" y2="18" />
                        <path d="M4 6h1v4" />
                        <path d="M4 10h2" />
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                      </svg>
                    </div>
                    <div className="Navbar_user_Profile_section_service_allOrder_title">
                      <p>All Orders</p>
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
                <div className="Navbar_user_Profile_section_service_arrange_pointer_bankDetail">
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
                      >
                        <line x1="3" x2="21" y1="22" y2="22" />
                        <line x1="6" x2="6" y1="18" y2="11" />
                        <line x1="10" x2="10" y1="18" y2="11" />
                        <line x1="14" x2="14" y1="18" y2="11" />
                        <line x1="18" x2="18" y1="18" y2="11" />
                        <polygon points="12 2 20 7 4 7" />
                      </svg>
                    </div>
                    <div className="Navbar_user_Profile_section_service_bankDetail_title">
                      <p>Bank Details</p>
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
                <div className="Navbar_user_Profile_section_service_arrange_pointer_customerSupport">
                  <div className="Navbar_user_Profile_section_service_customerSupport">
                    <div className="Navbar_user_Profile_section_service_customerSupport_icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="23px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#6d6d6d"
                      >
                        <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" />
                      </svg>
                    </div>
                    <div className="Navbar_user_Profile_section_service_customerSupport_title">
                      <p>24 x 7 Customer Support</p>
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
                  <div className="Navbar_user_Profile_section_footer_arrange_Darkmode_svg_div">
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
                  </div>
                </div>
                <div className="Navbar_user_Profile_section_footer_arrange_logout">
                    <p
                      onClick={() => {
                        navigate("/");
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
  );
};

export default Navbar;
