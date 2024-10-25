import "./Profile.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import {addUserDetail} from '../../features/userProfileData/centralExportUserProfileData'
import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";
import { addUserDetail } from "../../features/userProfileData/centralExportUserProfileData";

const Profile = () => {
  const userProfileData = useSelector(selectUserProfileData);
  const [userFirstName, setUserName] = useState("User");
  const [userLaseName, setUserLastName] = useState("");
  const [profileViewFeatureSection, setProfileViewFeatureSection] =
    useState("basicDetail");

  const handelProfileActiveFeatureSection = (makeActive) => {
    setProfileViewFeatureSection(makeActive);
  };

  const handelToOpenSection = (section)=>{
    setProfileViewFeatureSection(section);
  }

  useEffect(() => {
    setUserName(userProfileData.userFirstName);
    setUserLastName(userProfileData.userLastName);
  }, [userProfileData]);

  return (
    <>
      <Navbar />
      <div className="user_profile_main_arrange_width">
        <div className="user_profile_main_make_center_contain_box">
          <div className="user_profile_left_container">
            <div className="user_profile_left_image_box_main">
              <div
                className="user_profile_left_image_circle"
                style={{ backgroundColor: `${userProfileData?.userColorCode || '#47a778'}` }}
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
              <BasicDetail userProfileData={userProfileData} />
            ) : (
              <UpdateProfile userProfileData={userProfileData}  openSection={(section)=>handelToOpenSection(section)} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const BasicDetail = ({ userProfileData = "" }) => {
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
              {userProfileData
                ? `${
                    userProfileData.userFirstName
                      ? userProfileData.userFirstName
                      : "update now"
                  }`
                : "user first name"}
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
              {userProfileData
                ? `${
                    userProfileData.userLastName
                      ? userProfileData.userLastName
                      : "update now"
                  }`
                : "user last name"}
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
              {userProfileData
                ? `${
                    userProfileData.userEmail
                      ? userProfileData.userEmail
                      : "update now"
                  }`
                : "user@gmail.com"}
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
              {userProfileData
                ? `${
                    userProfileData.userMobileNumber
                      ? userProfileData.userMobileNumber
                      : "update now"
                  }`
                : "+91 6205594943"}
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
              {userProfileData
                ? `${
                    userProfileData.userDateOfBirth
                      ? userProfileData.userDateOfBirth
                      : "update now"
                  }`
                : "17 July 2003"}
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
              {userProfileData
                ? `${
                    userProfileData.userGender
                      ? userProfileData.userGender
                      : "update now"
                  }`
                : "Male"}
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
              {userProfileData
                ? `${
                    userProfileData.userMaritalStatus
                      ? userProfileData.userMaritalStatus
                      : "update now"
                  }`
                : "Single"}
            </div>
          </div>
          <div
            className="user_profile_basic_detail_component_detail_user_name_main"
            id="basicDetail_name_main"
          >
            <label htmlFor="basicDetail_name_main" id="basicDetail_name_lable">
              PROFILE COLOR CODE
            </label>
            <div id="basicDetail_name_showData">
              {userProfileData
                ? `${
                    userProfileData.userColorCode
                      ? userProfileData.userColorCode
                      : "update now"
                  }`
                : "#000000"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateProfile = ({ userProfileData = "" , openSection}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeUpdateButton, setActiveUpdateButton] = useState(false);
  const [userCredentialValid, setUserCredentialValid] = useState(false);
  //
  const [updateUserFirstName, setUpdateUserFirstName] = useState("");
  const [updateUserLastName, setUpdateUserLastName] = useState("");
  const [updateUserDateOfBirth, setUpdateUserDateOfBirth] = useState("");
  const [updateUserGender, setUpdateUserGender] = useState("");
  const [updateUserMaritalStatus, setUpdateUserMaritalStatus] = useState("");
  const [updateUserMobileNumber, setUpdateUserMobileNumber] = useState("");
  const [updateUserProfileColorCode, setUpdateUserProfileColorCode] =
    useState("");



  // handel to update userProfile.
  const handelToUpdateUserProfile = async () => {
    // deactivate update btn
    setActiveUpdateButton(false);

    // updating process start
    const updatedData = {
      userColorCode: updateUserProfileColorCode,
      userEmail: userProfileData.userEmail,
      userFirstName: updateUserFirstName,
      userLastName: updateUserLastName,
      userDateOfBirth: updateUserDateOfBirth,
      userGender: updateUserGender,
      userMaritalStatus: updateUserMaritalStatus,
      userMobileNumber: updateUserMobileNumber,
    };

    const UpdateProfileApi = "http://localhost:8080/api/user/updateProfile";
    const response = await fetch(UpdateProfileApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      if (response.status === 404) {
        dispatch(
          fireTheMessagePopUp({
            messageShow: "Not Found 404",
            positiveResponse: false,
            makeFire: true,
          })
        );
      } else if (response.status === 401) {
        dispatch(
          fireTheMessagePopUp({
            messageShow: "Credential required 401",
            positiveResponse: false,
            makeFire: true,
          })
        );
      } else {
        dispatch(
          fireTheMessagePopUp({
            messageShow: "Server Error, Report Us",
            positiveResponse: false,
            makeFire: true,
          })
        );
      }
    }

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      //---------------

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const dispatchData = JSON.parse(window.atob(base64));
      dispatch(addUserDetail(dispatchData));

      // -----------------
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Profile Update Successful , Login again",
          positiveResponse: true,
          makeFire: true,
        })
      );

      //-------- reload the page
    }
    // activate update button
    setActiveUpdateButton(true);
    openSection('basicDetail')
    // window.location.reload();
  };

  // First useEffect to set the values from userProfileData
  useEffect(() => {
    setUpdateUserFirstName(userProfileData?.userFirstName ?? "");
    setUpdateUserLastName(userProfileData?.userLastName ?? "");
    setUpdateUserDateOfBirth(userProfileData?.userDateOfBirth ?? "");
    setUpdateUserGender(userProfileData?.userGender ?? "");
    setUpdateUserMaritalStatus(userProfileData?.userMaritalStatus ?? "");
    setUpdateUserMobileNumber(userProfileData?.userMobileNumber ?? "");
    setUpdateUserProfileColorCode(userProfileData?.userColorCode ?? "");
  }, [userProfileData]);

  // Second useEffect to validate the user inputs
  useEffect(() => {
    let isValidUserInputs = true;

    if (
      updateUserFirstName &&
      !(updateUserFirstName.length >= 4 && updateUserFirstName.length <= 20)
    ) {
      isValidUserInputs = false;
    } else if (
      updateUserLastName &&
      !(updateUserLastName.length > 2 && updateUserLastName.length < 10)
    ) {
      isValidUserInputs = false;
    } else if (
      updateUserDateOfBirth &&
      !(updateUserDateOfBirth.length > 4 && updateUserDateOfBirth.length < 20)
    ) {
      isValidUserInputs = false;
    } else if (
      updateUserGender &&
      !(updateUserGender.length > 3 && updateUserGender.length < 7)
    ) {
      isValidUserInputs = false;
    } else if (
      updateUserMaritalStatus &&
      !(
        updateUserMaritalStatus.length > 4 &&
        updateUserMaritalStatus.length < 20
      )
    ) {
      isValidUserInputs = false;
    } else if (updateUserMobileNumber && updateUserMobileNumber.length !== 10) {
      isValidUserInputs = false;
    } else if (
      updateUserProfileColorCode &&
      !(
        updateUserProfileColorCode.startsWith("#") &&
        updateUserProfileColorCode.length >= 7 &&
        updateUserProfileColorCode.length <= 9
      )
    ) {
      isValidUserInputs = false;
    }

    // Update user credential validation status
    setUserCredentialValid(isValidUserInputs);
  }, [
    updateUserFirstName,
    updateUserLastName,
    updateUserDateOfBirth,
    updateUserGender,
    updateUserMaritalStatus,
    updateUserMobileNumber,
    updateUserProfileColorCode,
  ]);

  useEffect(() => {
    if (
      updateUserFirstName !== (userProfileData?.userFirstName ?? "") &&
      updateUserFirstName !== "" &&
      userCredentialValid
    ) {

      setActiveUpdateButton(true);
    } else if (
      updateUserLastName !== (userProfileData?.userLastName ?? "") &&
      updateUserLastName !== "" &&
      userCredentialValid
    ) {
      setActiveUpdateButton(true);
    } else if (
      updateUserDateOfBirth !== (userProfileData?.userDateOfBirth ?? "") &&
      updateUserDateOfBirth !== "" &&
      userCredentialValid
    ) {
      setActiveUpdateButton(true);
    } else if (
      updateUserGender !== (userProfileData?.userGender ?? "") &&
      updateUserGender !== "" &&
      userCredentialValid
    ) {
      setActiveUpdateButton(true);
    } else if (
      updateUserMaritalStatus !== (userProfileData?.userMaritalStatus ?? "") &&
      updateUserMaritalStatus !== "" &&
      userCredentialValid
    ) {
      setActiveUpdateButton(true);
    } else if (
      updateUserMobileNumber !== (userProfileData?.userMobileNumber ?? "") &&
      updateUserMobileNumber !== "" &&
      userCredentialValid
    ) {
      setActiveUpdateButton(true);
    } else if (
      updateUserProfileColorCode !== (userProfileData?.userColorCode ?? "") &&
      updateUserProfileColorCode !== "" &&
      userCredentialValid
    ) {
      setActiveUpdateButton(true);
    } else {
      setActiveUpdateButton(false);
    }
  }, [
    updateUserMaritalStatus,
    updateUserDateOfBirth,
    updateUserFirstName,
    updateUserGender,
    updateUserLastName,
    updateUserMobileNumber,
    updateUserProfileColorCode,
    userCredentialValid,
    userProfileData?.userColorCode,
    userProfileData?.userDateOfBirth,
    userProfileData?.userFirstName,
    userProfileData?.userGender,
    userProfileData?.userLastName,
    userProfileData?.userMaritalStatus,
    userProfileData?.userMobileNumber,
  ]);
  

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
          activeUpdateButton
            ? "user_profile_update_profile_component_update_userData_enable_btn"
            : "user_profile_update_profile_component_update_userData_disable_btn"
        }
        disabled={!activeUpdateButton}
        onClick={() => {
          handelToUpdateUserProfile();
        }}
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
                onChange={(e) => setUpdateUserFirstName(e.target.value)}
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
                onChange={(e) => setUpdateUserLastName(e.target.value)}
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
                disabled={true}
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
                onChange={(e) => setUpdateUserMobileNumber(e.target.value)}
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
                onChange={(e) => setUpdateUserDateOfBirth(e.target.value)}
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
                onChange={(e) => setUpdateUserGender(e.target.value)}
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
                onChange={(e) => setUpdateUserMaritalStatus(e.target.value)}
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
                onChange={(e) => setUpdateUserProfileColorCode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
