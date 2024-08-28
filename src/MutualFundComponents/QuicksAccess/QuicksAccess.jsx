import "./QuicksAccess.css";


const QuicksAccess = ({ logoUrl = "", title = "Title" }) => {
  return (
    <div className="mutual_fund_quick_access_main">
      <div className="mutual_fund_quick_access_main_arrange_width">
        <div className="mutual_fund_quick_access_main_icon_div">
          <div className="mutual_fund_quick_access_main_icon_main">
            <img src={logoUrl} alt="" />
          </div>
        </div>
        <div className="mutual_fund_quick_access_main_title_div">
          <p>{title || "new fund offering"}</p>
        </div>
      </div>
    </div>
  );
};

export default QuicksAccess;
