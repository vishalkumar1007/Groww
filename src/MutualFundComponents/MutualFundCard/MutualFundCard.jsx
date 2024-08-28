import "./MutualFundCard.css";

const MutualFundCard = ({
  logoUrl = "",
  title = "",
  percentage = "",
  year = "",
}) => {
  return (
    <div className="mutual_fund_card_main">
      {/* .......................................  */}
      <div className="mutual_fund_card_main_top">
        <div className="mutual_fund_card_main_top_logo_and_add">
          <div className="mutual_fund_card_main_top_logo">
            <img src={logoUrl} alt="" />
          </div>
        </div>
        <div className="mutual_fund_card_main_top_left_title">
          <span id="mutual_fund_card_main_top_left_title_span">
            {title ||
              "Stock Title is the funny on the moon light on the black hole is the stars"}
          </span>
        </div>
      </div>
      <div className="mutual_fund_card_main_bottom">
        <div className="mutual_fund_card_main_bottom_costPerRate">
          <span id="mutual_fund_card_main_bottom_costPerRate_percentage">
            {percentage === "" ? null : `${percentage}%`}
          </span>
          <span id="mutual_fund_card_main_bottom_costPerRate_year">
            {year === "" ? null : `(${year}Y)`}
          </span>
        </div>
      </div>
      {/* .......................................  */}
    </div>
  );
};

export default MutualFundCard;
