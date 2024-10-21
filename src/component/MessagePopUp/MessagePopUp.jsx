import "./MessagePopUp.css";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectorMsgPopUpMessageData,
  selectorMsgPopUpPositiveResponse,
  selectorMsgPopUpMakeFire,
} from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";

import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";

const MessagePopUp = () => {
  const dispatch = useDispatch();
  const notificationMessage = useSelector(selectorMsgPopUpMessageData);
  const notificationResponse = useSelector(selectorMsgPopUpPositiveResponse);
  const notificationFireActive = useSelector(selectorMsgPopUpMakeFire);

  // useEffect(() => {
  //   console.log("notification msg ", notificationMessage);
  //   console.log("notification res", notificationResponse);
  //   console.log("notification fire", notificationFireActive);
  // }, [notificationFireActive, notificationMessage, notificationResponse]);

  useEffect(() => {
    const timeout = setTimeout(()=>{
      dispatch(
        fireTheMessagePopUp({
          messageShow: "No msg",
          positiveResponse: true,
          makeFire: false,
        })
      );
    },3700)

    return ()=> clearTimeout(timeout);
  }, [dispatch, notificationFireActive]);


  return (
    <>
      {notificationFireActive ? (
        <div className="messagePopUp_hide_div">
          <div
            className={
              notificationResponse ? "msg_poop_up_main" : "msg_poop_up_main_err"
            }
          >
            <div
              className={
                notificationResponse
                  ? "msg_poop_up_main_status_icon"
                  : "msg_poop_up_main_status_icon_err"
              }
            >
              {notificationResponse ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="31px"
                  viewBox="0 -960 960 960"
                  width="31px"
                  fill="#4bb543"
                >
                  <path d="M419.67-279.33 715.33-576l-71.66-73-224 224-108.34-108.33-72 73 180.34 181Zm60.12 228.66q-88.43 0-167.26-33.27-78.82-33.27-137.07-91.52-58.25-58.25-91.52-137.07-33.27-78.82-33.27-167.38 0-89.24 33.33-167.66 33.33-78.43 91.69-136.95 58.37-58.52 136.97-92T479.56-910q89.33 0 168.03 33.43 78.71 33.42 137.04 91.87t91.85 137.02Q910-569.12 910-479.61q0 88.79-33.48 167.16-33.48 78.37-92 136.75Q726-117.33 647.57-84q-78.43 33.33-167.78 33.33Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26px"
                  viewBox="0 -960 960 960"
                  width="26px"
                  fill="#df3f34"
                >
                  <path d="m-9-87 489-845L969-87H-9Zm489-146q21 0 35.5-14.5T530-283q0-20-14.5-34.5T480-332q-20 0-35 14.5T430-283q0 21 15 35.5t35 14.5Zm-45-125h90v-191h-90v191Z" />
                </svg>
              )}
            </div>
            <div
              className={
                notificationResponse
                  ? "msg_poop_up_main_status_text"
                  : "msg_poop_up_main_status_text_err"
              }
            >
              <p>{notificationMessage}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default MessagePopUp;
