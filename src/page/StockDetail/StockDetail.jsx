import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./StockDetail.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import PageNotFound from "../../component/PageNotFound/PageNotFound";
import StockData from "../../jsonDummyData/stockData.json";
import useImage from "../../hooks/useImage";
import BuyStockCard from "../../component/BuyStockCard/BuyStockCard";
import ShareholdingPatternCard from "../../component/ShareholdingPatternCard/ShareholdingPatternCard";

const StockDetail = () => {
  const location = useLocation();
  const [checkForPageFound, setCheckForPageFound] = useState(true);
  const [companyLogoUrlName, setCompanyLogoUrlName] = useState(null);
  const [companyName, setCompanyName] = useState("Name");
  const [companyCost, setCompanyCost] = useState("186.37");
  const [companyCostPerRate, setCompanyCostPerRate] = useState("-8.45 (4.34%)");
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);
  const [activeShareholdingPatternDay , setActiveShareholdingPatternDay] = useState('day1');
  const { image } = useImage(companyLogoUrlName);

  const [shareHolderPercentageRange1 , setShareHolderPercentageRange1 ] = useState(0);
  const [shareHolderPercentageRange2 , setShareHolderPercentageRange2 ] = useState(0);
  const [shareHolderPercentageRange3 , setShareHolderPercentageRange3 ] = useState(0);

  useEffect(()=>{
      if(activeShareholdingPatternDay==='day1'){
        setShareHolderPercentageRange1(32.91);
        setShareHolderPercentageRange2(72.65);
        setShareHolderPercentageRange3(42.88);
      }
      else if(activeShareholdingPatternDay==='day2'){
        setShareHolderPercentageRange1(52.72);
        setShareHolderPercentageRange2(61.81);
        setShareHolderPercentageRange3(25.72);
      }
      else if(activeShareholdingPatternDay==='day3'){
        setShareHolderPercentageRange1(42.1);
        setShareHolderPercentageRange2(72.81);
        setShareHolderPercentageRange3(14.71);
      }
      else if(activeShareholdingPatternDay==='day4'){
        setShareHolderPercentageRange1(82.71);
        setShareHolderPercentageRange2(32.61);
        setShareHolderPercentageRange3(49.61);
      }
  },[activeShareholdingPatternDay])

  const queryParams = new URLSearchParams(location.search);
  const stockName = queryParams.keys().next().value;

  useEffect(() => {
    for (const stockDataCheck of StockData) {
      if (stockName === stockDataCheck.id) {
        setCheckForPageFound(true);
        setCompanyName(stockDataCheck.name);
        setCompanyLogoUrlName(stockDataCheck.logo_url);
        setCompanyCost(stockDataCheck.cost);
        setCompanyCostPerRate(stockDataCheck.costPerRate);
        break;
      }
    }
  }, [companyLogoUrlName, stockName]);

  useEffect(() => {
    if (companyCostPerRate.length) {
      for (const cprData of companyCostPerRate) {
        if (cprData === "-") {
          setIsCostPerRateNegative(true);
          break;
        } else {
          setIsCostPerRateNegative(false);
        }
      }
    }
  }, [companyCostPerRate, stockName]);

  return (
    <>
      {!checkForPageFound ? (
        <div className="stock_detail_main_page_not_found">
          <PageNotFound />
        </div>
      ) : (
        <>
          <div className="stock_detail_main">
            <Navbar />
            <div className="stock_detail_main_arrange_width">
              <div className="stock_detail_company_information_main">
                {/* ........... company Head ............... */}
                <div className="stock_detail_company_information_head">
                  <div className="stock_detail_company_information_head_left">
                    <div className="stock_detail_company_information_head_left_logo">
                      <span id="stock_detail_company_logo_span">
                        <img src={image} alt="logo" />
                      </span>
                    </div>
                    <div className="stock_detail_company_information_head_left_title_and_cost">
                      <div className="stock_detail_company_information_head_left_title">
                        <span id="stock_detail_company_name">
                          {companyName || "NBCC (India)"}
                        </span>
                      </div>
                      <div className="stock_detail_company_information_head_left_cost_and_CostPerRate">
                        <span id="stock_detail_company_information_head_left_cost">
                          ₹{companyCost}
                        </span>
                        <span
                          id="stock_detail_company_information_head_left_CostPerRate"
                          style={{
                            color: isCostPerRateNegative
                              ? "#EB5B3C"
                              : "#00B386",
                          }}
                        >
                          {companyCostPerRate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="stock_detail_company_information_head_right">
                    <button className="stock_detail_company_information_head_right_alert">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="13" r="8" />
                        <path d="M12 9v4l2 2" />
                        <path d="M5 3 2 6" />
                        <path d="m22 6-3-3" />
                        <path d="M6.38 18.7 4 21" />
                        <path d="M17.64 18.67 20 21" />
                      </svg>
                      <span>Create Alert</span>
                    </button>
                    <button className="stock_detail_company_information_head_right_watchlist">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.8"
                        height="16.8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                      <span>Watchlist</span>
                    </button>
                  </div>
                </div>
                <div className="stock_detail_company_graph_main"></div>
                <div className="stock_detail_company_performance_main">
                  <div className="stock_detail_company_performance_low_and_heigh">
                    <div className="stock_detail_company_performance_low_and_heigh_title">
                      <span id="stock_detail_company_performance_title_span">
                        Performance
                      </span>
                    </div>
                    <div className="stock_detail_company_performance_low_and_heigh_stats">
                      <div className="stock_detail_company_performance_low_and_heigh_stats_todays">
                        <div className="stock_detail_company_performance_low_and_heigh_stats_todays_low">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_todays_low_title">
                            Today's Low
                          </span>
                          <span id="stock_detail_company_performance_low_and_heigh_stats_todays_low_data">
                            117.21
                          </span>
                        </div>
                        <div className="stock_detail_company_performance_low_and_heigh_stats_graph_line">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_graph_line_span_view"></span>
                        </div>
                        <div className="stock_detail_company_performance_low_and_heigh_stats_todays_high">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_todays_high_title">
                            Today's High
                          </span>
                          <span id="stock_detail_company_performance_low_and_heigh_stats_todays_high_data">
                            122.95
                          </span>
                        </div>
                      </div>
                      <div className="stock_detail_company_performance_low_and_heigh_stats_52w">
                        <div className="stock_detail_company_performance_low_and_heigh_stats_52w_low">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_low_title">
                            52W Low
                          </span>
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_low_data">
                            99.2
                          </span>
                        </div>
                        <div className="stock_detail_company_performance_low_and_heigh_stats_52w_graph_line">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_graph_line_span_view"></span>
                        </div>
                        <div className="stock_detail_company_performance_low_and_heigh_stats_52w_high">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_high_title">
                            52W High
                          </span>
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_high_data">
                            32.54
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stock_detail_company_performance_data">
                    <div className="stock_detail_company_performance_data_top">
                      <span id="stock_detail_company_performance_data_top_open">
                        <p id="perform_title_x">Open</p>
                        <p id="perform_value_y">121.03</p>
                      </span>
                      <span id="stock_detail_company_performance_data_top_prev">
                        <p id="perform_title_x">Prev. Close</p>
                        <p id="perform_value_y">120.27</p>
                      </span>
                      <span id="stock_detail_company_performance_data_top_volume">
                        <p id="perform_title_x">Volume</p>
                        <p id="perform_value_y">22,42,076</p>
                      </span>
                    </div>
                    <div className="stock_detail_company_performance_data_bottom">
                      <span id="stock_detail_company_performance_data_bottom_tread_value">
                        <p id="perform_title_x">Total traded value</p>
                        <p id="perform_value_y">26.45 Cr</p>
                      </span>
                      <span id="stock_detail_company_performance_data_bottom_upper_circuit">
                        <p id="perform_title_x">Upper Circuit</p>
                        <p id="perform_value_y">128.63</p>
                      </span>
                      <span id="stock_detail_company_performance_data_bottom_lower_circuit">
                        <p id="perform_title_x">Lower Circuit</p>
                        <p id="perform_value_y">172.21</p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="stock_detail_company_fundamental_main">
                  <div className="stock_detail_company_fundamental_main_title">
                    <span>Fundamentals</span>
                  </div>
                  <div className="stock_detail_company_fundamental_main_data">
                    <div className="stock_detail_company_fundamental_main_data_left">
                      <div className="stock_detail_company_fundamental_main_data_left_arrange_width">
                        <div className="stock_detail_company_fundamental_main_data_left_market_cap">
                          <span id="fundamental_title_x">Market Cap</span>
                          <span id="fundamental_cost_x">₹52,043Cr</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_pe_ratio">
                          <span id="fundamental_title_x">P/E Ratio(TTM)</span>
                          <span id="fundamental_cost_x">-32.87</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_pb_ratio">
                          <span id="fundamental_title_x">P/B Ratio</span>
                          <span id="fundamental_cost_x">8.25</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_industry_pe">
                          <span id="fundamental_title_x">Industry P/E</span>
                          <span id="fundamental_cost_x">24.05</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_debt_equity">
                          <span id="fundamental_title_x">Debt to Equity</span>
                          <span id="fundamental_cost_x">1.34</span>
                        </div>
                      </div>
                    </div>
                    <div className="stock_detail_company_fundamental_main_data_right">
                      <div className="stock_detail_company_fundamental_main_data_right_arrange_width">
                        <div className="stock_detail_company_fundamental_main_data_right_ROE">
                          <span id="fundamental_title_x">ROE</span>
                          <span id="fundamental_cost_x">-78.43</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_EPS">
                          <span id="fundamental_title_x">EPS(TTM)</span>
                          <span id="fundamental_cost_x">-32.87</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_Dividend_Yield">
                          <span id="fundamental_title_x">Dividend Yield</span>
                          <span id="fundamental_cost_x">8.25</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_Book_Value">
                          <span id="fundamental_title_x">Book Value</span>
                          <span id="fundamental_cost_x">24.05</span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_Face_Value">
                          <span id="fundamental_title_x">Face Value</span>
                          <span id="fundamental_cost_x">10.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stock_detail_company_financial_main"></div>
                <div className="stock_detail_company_shareholding_pattern_main">
                  <div className="stock_detail_company_shareholding_pattern_title_div">
                    <span id="stock_detail_company_pattern_title_div_title">
                      Shareholding Pattern
                    </span>
                  </div>
                  <div className="stock_detail_company_shareholding_pattern_graph_div">
                    <div className="stock_detail_company_shareholding_pattern_graph_main">
                      <div className="stock_detail_company_shareholding_pattern_graph_main_arrange_width">
                        <div className="stock_detail_company_shareholding_pattern_graph_main_top">
                          <button id={activeShareholdingPatternDay==='day1'?'shareholding_pattern_top_day_active':null} className="stock_detail_company_shareholding_pattern_top_day1" onClick={()=>{setActiveShareholdingPatternDay('day1')}}>Day 1</button>
                          <button id={activeShareholdingPatternDay==='day2'?'shareholding_pattern_top_day_active':null} className="stock_detail_company_shareholding_pattern_top_day2" onClick={()=>{setActiveShareholdingPatternDay('day2')}}>Day 2</button>
                          <button id={activeShareholdingPatternDay==='day3'?'shareholding_pattern_top_day_active':null} className="stock_detail_company_shareholding_pattern_top_day3" onClick={()=>{setActiveShareholdingPatternDay('day3')}}>Day 3</button>
                          <button id={activeShareholdingPatternDay==='day4'?'shareholding_pattern_top_day_active':null} className="stock_detail_company_shareholding_pattern_top_day4" onClick={()=>{setActiveShareholdingPatternDay('day4')}}>Day 4</button>
                        </div>
                        <div className="stock_detail_company_shareholding_pattern_graph_main_bottom">
                            <ShareholdingPatternCard title={'Promoters'} percentage={shareHolderPercentageRange1}/>
                            <ShareholdingPatternCard title={'Retail And Others'} percentage={shareHolderPercentageRange2}/>
                            <ShareholdingPatternCard title={'Other Domestic Industry'} percentage={shareHolderPercentageRange3}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ........... Buy Stock ............... */}
              <div className="stock_detail_buy_stock_main">
                <div className="stock_detail_buy_stock_main_buy_card_div">
                  <BuyStockCard
                    companyName={companyName}
                    cost={companyCost}
                    costPerRate={companyCostPerRate}
                  />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default StockDetail;
