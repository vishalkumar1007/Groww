import { useState } from "react";
import CompanyLogo from "../../assets/svg/groww-logo-light.svg";
import "./Navbar.css";

const Navbar = () => {
  const [activeFeture, setActiveFeture] = useState("Explore");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
            <div className="Navbar_activity_profile_image"></div>
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
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* profile absolute div  */}

          {isProfileOpen ? 
            <div className="Navbar_user_Profile_section">
                <div className="Navbar_user_Profile_section_user_about">
                    <div className="Navbar_user_Profile_section_user_about_arrange">

                    </div>
                </div>
                <div className="Navbar_user_Profile_section_service">
                    <div className="Navbar_user_Profile_section_service_arrange">

                    </div>

                </div>
                <div className="Navbar_user_Profile_section_feature">
                    <div className="Navbar_user_Profile_section_feature_arrange">

                    </div>

                </div>
                <div className="Navbar_user_Profile_section_logout">
                    <div className="Navbar_user_Profile_section_logout_arrange">
                        
                    </div>

                </div>
            </div>
           : 
            ""
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
