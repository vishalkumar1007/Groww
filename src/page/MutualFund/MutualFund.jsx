import aloakIndustries from "../../assets/img/top_gainer/small_aloak_industry_icon.webp";
import pnbHouse from "../../assets/img/top_gainer/small_pnb_house_finance_icon.webp";
import centuryTextile from "../../assets/img/top_gainer/small_century_textiles_icon.webp";
import castrolIndia from "../../assets/img/top_gainer/small_castrol_india_icon.webp";

import "./MutualFund.css";
import StocksCard from "../../component/StockCard/StockCard";

const MutualFund = () => {
  return (
    <div className="mutual_fund_main">
      <div className="mutual_fund_main_arrange_width">
        <div className="mutual_fund_main_left">
          <div className="mutual_fund_main_left_popular_fund">
            <div className="mutual_fund_main_left_popular_fund_head">
              <span id="mutual_fund_main_left_popular_fund_head_title">
                Popular Funds
              </span>
              <span id="mutual_fund_main_left_popular_fund_head_screener">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M7 12h10" />
                  <path d="M10 18h4" />
                </svg>
                <p>SCREENER</p>
              </span>
            </div>
            <div className="mutual_fund_main_left_popular_fund_comp_div">
              <StocksCard
                logoUrl={aloakIndustries}
                title="Alok Industries"
                cost="28.32"
                costPerRate="2.10 (10.7%)"
              />
              <StocksCard
                logoUrl={pnbHouse}
                title="PNB Housing Finance"
                cost="892.21"
                costPerRate="17.21 (0.61%)"
              />
              <StocksCard
                logoUrl={centuryTextile}
                title="Century Textiles"
                cost="2,300.10"
                costPerRate="152.66 (7.91%)"
              />
              <StocksCard
                logoUrl={castrolIndia}
                title="Castrol India"
                cost="268.90"
                costPerRate="17.80 (7.10%)"
              />
            </div>
          </div>
          <div className="mutual_fund_main_left_collection">
            <div className="mutual_fund_main_left_collection_head">
              <span id="mutual_fund_main_left_collection_head_title">
                Collection
              </span>
            </div>
            <div className="mutual_fund_main_left_collection_comp_div">
              <StocksCard
                logoUrl={aloakIndustries}
                title="Alok Industries"
                cost="28.32"
                costPerRate="2.10 (10.7%)"
              />
              <StocksCard
                logoUrl={pnbHouse}
                title="PNB Housing Finance"
                cost="892.21"
                costPerRate="17.21 (0.61%)"
              />
              <StocksCard
                logoUrl={centuryTextile}
                title="Century Textiles"
                cost="2,300.10"
                costPerRate="152.66 (7.91%)"
              />
              <StocksCard
                logoUrl={castrolIndia}
                title="Castrol India"
                cost="268.90"
                costPerRate="17.80 (7.10%)"
              />
            </div>
          </div>
          <div className="mutual_fund_main_left_fund_by_groww"></div>
          <div className="mutual_fund_main_left_quick_access"></div>
        </div>
        <div className="mutual_fund_main_right"></div>
      </div>
    </div>
  );
};
export default MutualFund;
