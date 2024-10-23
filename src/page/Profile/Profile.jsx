import "./Profile.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { useSelector } from "react-redux";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useEffect, useState } from "react";

const Profile = () => {
  const userProfileData = useSelector(selectUserProfileData);
  const [userFirstName, setUserName] = useState("User");
  const [userLaseName, setUserLastName] = useState("");
  const [profileViewFeatureSection, setProfileViewFeatureSection] =
    useState("basicDetail");

  const handelProfileActiveFeatureSection = (makeActive) => {
    setProfileViewFeatureSection(makeActive);
  };

  useEffect(() => {
    console.log(userProfileData);
  }, [userProfileData]);

  useEffect(() => {
    setUserName(userProfileData.userFirstName);
    setUserLastName(userProfileData.userLastName);
  }, [userProfileData]);

  return (
    <div className="user_profile_main">
      <Navbar />
      <div className="user_profile_main_arrange_width">
        <div className="user_profile_left_container">
          <div className="user_profile_left_image_box_main">
            <div
              className="user_profile_left_image_circle"
              style={{ backgroundColor: `${userProfileData?.userColorCode}` }}
            >
              {userFirstName[0]}
            </div>
            <div className="user_profile_left_image_user_name">
              <span>{`${userFirstName} ${userLaseName}`}</span>
            </div>
          </div>
          <div className="user_profile_left_option_box_main">
            <div
              className="user_profile_left_option_box_main_basic_detail_section"
              onClick={() => {
                handelProfileActiveFeatureSection("basicDetail");
              }}
              style={{
                backgroundColor:
                  profileViewFeatureSection === "basicDetail"
                    ? "#f0f0f0ea"
                    : null,
              }}
            >
              <div className="user_profile_left_option_box_main_section_heading">
                <span>Basic Details</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#515151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
            <div
              className="user_profile_left_option_box_main_edit_profile_section"
              onClick={() => {
                handelProfileActiveFeatureSection("updateProfile");
              }}
              style={{
                backgroundColor:
                  profileViewFeatureSection === "updateProfile"
                    ? "#f0f0f0ea"
                    : null,
              }}
            >
              <div className="user_profile_left_option_box_main_section_heading">
                <span>Update Profile</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#515151"
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
        <div className="user_profile_right_container">
          {profileViewFeatureSection === "basicDetail" ? (
            <BasicDetail userProfileData={userProfileData}/>
          ) : (
            <UpdateProfile userProfileData={userProfileData} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const BasicDetail = ({userProfileData=""}) => {
  return (
    <div className="user_profile_basic_detail_component_main">
      <div className="user_profile_basic_detail_component_main_design_1"></div>
      <div className="user_profile_basic_detail_component_main_design_2"></div>
      <div className="user_profile_basic_detail_component_main_design_3"></div>
      <div className="user_profile_basic_detail_component_main_design_4"></div>
      <div className="user_profile_basic_detail_component_main_design_5"></div>

      <div className="user_profile_basic_detail_component_arrange_width">
        <div className="user_profile_basic_detail_component_detail_container_left">
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              FIRST NAME
            </label>
            <div id="basicDetail_name_showData">
                {
                    userProfileData
                    ? `${
                        userProfileData.userFirstName
                          ? userProfileData.userFirstName
                          : "update now"
                      }`
                    : "user first name"
                }
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              LAST NAME
            </label>
            <div id="basicDetail_name_showData">
                {
                    userProfileData
                    ? `${
                        userProfileData.userLastName
                          ? userProfileData.userLastName
                          : "update now"
                      }`
                    : "user last name"
                }
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              EMAIL
            </label>
            <div id="basicDetail_name_showData">
                {
                    userProfileData
                    ? `${
                        userProfileData.userEmail
                          ? userProfileData.userEmail
                          : "update now"
                      }`
                    : "user@gmail.com"
                }
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              MOBILE NUMBER
            </label>
            <div id="basicDetail_name_showData">
                {
                     userProfileData
                     ? `${
                         userProfileData.userMobileNumber
                           ? userProfileData.userMobileNumber
                           : "update now"
                       }`
                     : "+91 6205594943"
                }
            </div>
          </div>
        </div>
        <div className="user_profile_basic_detail_component_detail_container_right">
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              DATE OF BIRTH
            </label>
            <div id="basicDetail_name_showData">
                {
                    userProfileData
                    ? `${
                        userProfileData.userDateOfBirth
                          ? userProfileData.userDateOfBirth
                          : "update now"
                      }`
                    : "17 July 2003"
                }
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              GENDER
            </label>
            <div id="basicDetail_name_showData">
                {
                    userProfileData
                    ? `${
                        userProfileData.userGender
                          ? userProfileData.userGender
                          : "update now"
                      }`
                    : "Male"
                }
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              MARITAL STATUS
            </label>
            <div id="basicDetail_name_showData">
                {
                    userProfileData
                    ? `${
                        userProfileData.userMaritalStatus
                          ? userProfileData.userMaritalStatus
                          : "update now"
                      }`
                    : "Single"
                }
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              PROFILE COLOR CODE
            </label>
            <div id="basicDetail_name_showData">#a5174ff5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateProfile = ({ userProfileData = "" }) => {
  return (
    <div className="user_profile_update_profile_component_main">
      <div className="user_profile_update_profile_component_main_design_1"></div>
      <div className="user_profile_update_profile_component_main_design_2"></div>
      <div className="user_profile_update_profile_component_main_design_3"></div>
      <div className="user_profile_update_profile_component_main_design_4"></div>
      <div className="user_profile_update_profile_component_main_design_5"></div>
      <div className="user_profile_update_profile_component_main_design_6"></div>
      <div className="user_profile_update_profile_component_main_design_7"></div>
      <button
        className={
          true
            ? "user_profile_update_profile_component_update_userData_disable_btn"
            : "user_profile_update_profile_component_update_userData_enable_btn"
        }
        disabled={true}
      >
        Update
      </button>
      <div className="user_profile_update_profile_component_arrange_width">
        <div className="user_profile_update_profile_component_detail_container_left">
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              FIRST NAME
            </label>
            <div id="updateDetail_name_showData">
              <input
                type="text"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userFirstName
                          ? userProfileData.userFirstName
                          : "update now"
                      }`
                    : "user first name"
                }
              />
            </div>
          </div>
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              LAST NAME
            </label>
            <div id="updateDetail_name_showData">
              <input
                type="text"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userLastName
                          ? userProfileData.userLastName
                          : "update now"
                      }`
                    : "user last name"
                }
              />
            </div>
          </div>
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              EMAIL
            </label>
            <div id="updateDetail_name_showData">
              {/* vishalkumarnke93@gmail.com */}
              <input
                type="email"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userEmail
                          ? userProfileData.userEmail
                          : "update now"
                      }`
                    : "user@gmail.com"
                }
              />
            </div>
          </div>
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              MOBILE NUMBER
            </label>
            <div id="updateDetail_name_showData">
              {/* +91 6205594943 */}
              <input
                type="number"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userMobileNumber
                          ? userProfileData.userMobileNumber
                          : "update now"
                      }`
                    : "+91 6205594943"
                }
              />
            </div>
          </div>
        </div>
        <div className="user_profile_update_profile_component_detail_container_right">
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              DATE OF BIRTH
            </label>
            <div id="updateDetail_name_showData">
              {/* 17 July 2003 */}
              <input
                type="text"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userDateOfBirth
                          ? userProfileData.userDateOfBirth
                          : "update now"
                      }`
                    : "17 July 2003"
                }
              />
            </div>
          </div>
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              GENDER
            </label>
            <div id="updateDetail_name_showData">
              {/* Male */}
              <input
                type="text"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userGender
                          ? userProfileData.userGender
                          : "update now"
                      }`
                    : "Male"
                }
              />
            </div>
          </div>
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              MARITAL STATUS
            </label>
            <div id="updateDetail_name_showData">
              {/* Single */}
              <input
                type="text"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userMaritalStatus
                          ? userProfileData.userMaritalStatus
                          : "update now"
                      }`
                    : "Single"
                }
              />
            </div>
          </div>
          <div
            className="user_profile_update_profile_component_detail_user_name_main"
            id="updateDetail_name_main"
          >
            <label
              htmlFor="updateDetail_name_main"
              id="updateDetail_name_lable"
            >
              PROFILE COLOR CODE
            </label>
            <div id="updateDetail_name_showData">
              {/* #a5174ff5 */}
              <input
                type="text"
                placeholder={
                  userProfileData
                    ? `${
                        userProfileData.userColorCode
                          ? userProfileData.userColorCode
                          : "update now"
                      }`
                    : "#000000"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
