

import Motilal_Oswal from "../../assets/img/Mutual_Fund/Motilal_Oswal_Midcap Fund_Direct_Growth.webp";
import Quant_Small from "../../assets/img/Mutual_Fund/Quant_Small_Cap_Fund Direct_Plan_Growth.webp";
import Parag_Parikh from "../../assets/img/Mutual_Fund/Parag_Parikh_Flexi_Cap Fund_Direct_Growth.webp";
import Nippon_India from "../../assets/img/Mutual_Fund/Nippon_India_Large_Cap_Fund_Direct_Growth.png";
import Groww_logo from "../../assets/img/Mutual_Fund/groww/indiabulls_groww.webp";
import High_return from '../../assets/img/Mutual_Fund/collection/high_returns.svg'
import SIP_with_500 from '../../assets/img/Mutual_Fund/collection/sip_with_500.svg'
import Tax_Saving from '../../assets/img/Mutual_Fund/collection/tax_saving.svg'
import Large_Cap from '../../assets/img/Mutual_Fund/collection/large_cap.svg'
import Mid_Cap from '../../assets/img/Mutual_Fund/collection/mid_cap.svg'
import Small_Cap from '../../assets/img/Mutual_Fund/collection/small_cap.svg'
import new_fund_offering from "../../assets/img/Mutual_Fund/quick_access/nfo.svg";
import import_fund from "../../assets/img/Mutual_Fund/quick_access/import_funds.svg";
import compare_fund from "../../assets/img/Mutual_Fund/quick_access/compare_funds.svg";
import sip_calculator from "../../assets/img/Mutual_Fund/quick_access/calculator.svg";



import "./MutualFund.css";
import StocksCard from "../../component/StockCard/StockCard";
import MutualFundCard from "../../MutualFundComponents/MutualFundCard/MutualFundCard";
import MutualFundCollectionCard from "../../MutualFundComponents/MutualFundCollectionCard/MutualFundCollectionCard";
import QuicksAccess from "../../MutualFundComponents/QuicksAccess/QuicksAccess";

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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M7 12h10" />
                  <path d="M10 18h4" />
                </svg>
                <p>SCREENER</p>
              </span>
            </div>
            <div className="mutual_fund_main_left_popular_fund_comp_div">
              <MutualFundCard
                logoUrl={Motilal_Oswal}
                title="Motilal Oswal Midcap Fund Direct Growth"
                percentage="40.0"
                year="3"
              />
              <MutualFundCard
                logoUrl={Quant_Small}
                title="Quant Small Cap Fund Direct Plan Growth"
                percentage="34.6"
                year="3"
              />
              <MutualFundCard
                logoUrl={Parag_Parikh}
                title="Parag Parikh Flexi Cap Fund Direct Growth"
                percentage="20.4"
                year="3"
              />
              <MutualFundCard
                logoUrl={Nippon_India}
                title="Nippon India Large Cap Fund Direct Growth"
                percentage="24.9"
                year="3"
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
              <MutualFundCollectionCard logoUrl={High_return} title='High return'/>
              <MutualFundCollectionCard logoUrl={SIP_with_500} title='SIP with 500'/>
              <MutualFundCollectionCard logoUrl={Tax_Saving} title='Tax Saving'/>
              <MutualFundCollectionCard logoUrl={Large_Cap} title='Large Cap'/>
              <MutualFundCollectionCard logoUrl={Mid_Cap} title='Mid Cap'/>
              <MutualFundCollectionCard logoUrl={Small_Cap} title='Small Cap'/>
            </div>
          </div>
          <div className="mutual_fund_main_left_fund_by_groww">
            <div className="mutual_fund_main_left_fund_by_groww_head">
              <span id="mutual_fund_main_left_fund_by_groww_head_title">
                Funds by Groww
              </span>
              <span id="mutual_fund_main_left_fund_by_groww_view_all">
                <p>View all</p>
              </span>
            </div>
            <div className="mutual_fund_main_left_fund_by_groww_comp_div">
              <MutualFundCard
                logoUrl={Groww_logo}
                title="Groww Nifty EV & New Age Automotive ETF FoF Direct Growth"
                year="1"
              />
              <MutualFundCard
                logoUrl={Groww_logo}
                title="Groww Value Fund Direct Growth"
                year="1"
              />
              <MutualFundCard
                logoUrl={Groww_logo}
                title="Groww Nifty Total Market Index Fund Direct Growth"
                year="1"
              />
              <MutualFundCard
                logoUrl={Groww_logo}
                title="Groww Nifty Smallcap 250 Index Fund Direct Growth"
                year="1"
              />
            </div>
          </div>
          <div className="mutual_fund_main_left_quick_access">
            <div className="mutual_fund_main_left_fund_by_groww_head">
              <span id="mutual_fund_main_left_fund_by_groww_head_title">
                Quick Access
              </span>
            </div>
            <div className="mutual_fund_main_left_quick_access_component">
              <QuicksAccess logoUrl={new_fund_offering} title="New Fund Offering"/>
              <QuicksAccess logoUrl={import_fund} title="Import Fund"/>
              <QuicksAccess logoUrl={compare_fund} title="Compare Funds"/>
              <QuicksAccess logoUrl={sip_calculator} title="SIP Calculator"/>
            </div>
          </div>
        </div>
        <div className="mutual_fund_main_right"></div>
      </div>
    </div>
  );
};
export default MutualFund;
