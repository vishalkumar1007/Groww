import "./IntroAlert.css";
import { useNavigate } from "react-router-dom";
import hello_user_icon from "../../assets/svg/am_icon/Hello-pana-with-flower.svg";
const IntroAlert = ({requestToClose}) => {
  const navigate = useNavigate();

  const actionOfClose = ()=>{
    requestToClose(true);
  }

  return (
    <div className="inter_alert_main">
      <div className="intro_alert_arrange_width">
        <div className="inter_alert_top_main">
          <div className="inter_alert_top_main_left">
            <img id="Hello_user_icon" src={hello_user_icon} alt="" />
          </div>
          <div className="inter_alert_top_main_rigth">
            <p>Hey ,you know ? </p>
          </div>
        </div>
        <div className="inter_alert_bottom_main">
          <div className="inter_alert_bottom_main_design">
            <div className="inter_alert_bottom_main_design_internal"></div>
          </div>
          <div className="inter_alert_bottom_main_design_1"></div>
          <div className="inter_alert_bottom_main_title">
            <p>Open Dashboard Page</p>
            <p>For Now You Have Directly Access of It</p>
          </div>
          <div className="inter_alert_bottom_main_disclaimer">
            <p>
              Currently, our backend server is not connected, We make it live
              very soon. But{" "}
              <span id="inter_alert_bottom_main_disclaimer_highlight">
                you can also access dashboard from 'footer section'
              </span>{" "}
              link.{" "}
            </p>
          </div>
          <div className="inter_alert_bottom_main_button">
            <button
              id="inter_alert_bottom_main_button_close_btn"
              onClick={() => {
                actionOfClose();
              }}
            >
              Close
            </button>
            <button
              id="inter_alert_bottom_main_button_open_btn"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAlert;
