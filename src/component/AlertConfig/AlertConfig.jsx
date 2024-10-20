import "./AlertConfig.css";
import hello_user_icon from "../../assets/svg/am_icon/Hello-pana-with-flower.svg";


const AlertConfig = ({requestToClose , headText="" , msgText="" , extraInfoText=""}) => {

  const actionFroUser = (res)=>{
    requestToClose(res);
  }


  return (
    <div className="AlertConfig_main">
      <div className="AlertConfig_arrange_width">
        <div className="AlertConfig_top_main">
          <div className="AlertConfig_top_main_left">
            <img id="AlertConfig_Hello_user_icon" src={hello_user_icon} alt="" />
          </div>
          <div className="AlertConfig_top_main_rigth">
            <p>{headText || `Hey, User`}</p>
          </div>
        </div>
        <div className="AlertConfig_bottom_main">
          <div className="AlertConfig_bottom_main_design">
            <div className="AlertConfig_bottom_main_design_internal"></div>
          </div>
          <div className="AlertConfig_bottom_main_design_1"></div>
          <div className="AlertConfig_bottom_main_title">
            <p>{msgText || `Oops ...`}</p>
          </div>
          <div className="AlertConfig_bottom_main_disclaimer">
            <p>
              {extraInfoText || `we have nothing to inform you please close it`}
            </p>
          </div>
          <div className="AlertConfig_bottom_main_button">
            <button
              id="AlertConfig_bottom_main_button_close_btn"
              onClick={() => {
                actionFroUser(false);
              }}
            >
              No
            </button>
            <button
              id="AlertConfig_bottom_main_button_open_btn"
              onClick={() => {
                actionFroUser(true);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertConfig;
