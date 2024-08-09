import CompanyLogo from "../../assets/svg/groww-logo-light.svg";
import "./Navbar.css";

const Header = () => {
  return (
    <div className="Header_main">
      <div className="Header_content_limit_width">
        <div className="Header_logo">
          <div className="Header_logo_groww">
            <img src={CompanyLogo} alt="" />
          </div>
        </div>

        {/* ........... */}

        <div className="Header_feature">
          <div className="Header_feature_explore">
            <p>Explore</p>
          </div>
          <div className="Header_feature_investment">
            <p>Investments</p>
          </div>
        </div>

        {/* .......... */}

        <div className="Header_search">
          <div className="Header_search_action">
            <div className="Header_search_icon">
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
                class="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div className="Header_search_action_main">
              <input
                type="text"
                placeholder="What are you looking for today?"
              />
            </div>
          </div>
        </div>

        {/* ........... */}

        <div className="Header_activity">
          <div className="Header_activity_notification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3d3d3d"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-bell"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
          <div className="Header_activity_wallet">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3d3d3d"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-wallet"
            >
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
          </div>
          <div className="Header_activity_shop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3d3d3d"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <div className="Header_activity_profile">
            <div className="Header_activity_profile_image"></div>
            <div className="Header_activity_profile_activate_deactivate_icon">
              {true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9c9c9c"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9c9c9c"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-up"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
