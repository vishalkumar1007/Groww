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
import FinancialGraph from "../../StockDetailComponents/FinancialGraph/FinancialGraph";
import StockCard from "../../component/StockCard/StockCard";
// ............... image ..................

import aloakIndustries from "../../assets/img/top_gainer/small_aloak_industry_icon.webp";
import pnbHouse from "../../assets/img/top_gainer/small_pnb_house_finance_icon.webp";
import centuryTextile from "../../assets/img/top_gainer/small_century_textiles_icon.webp";
import castrolIndia from "../../assets/img/top_gainer/small_castrol_india_icon.webp";

import ola_logo from "../../assets/svg/ola_logo.svg";
import GTL_logo from "../../assets/svg/GTL_logo.webp";
import MD_ship_logo from "../../assets/svg/GSTK_logo.webp";
import Angel_one_logo from "../../assets/svg/angel_one_logo.webp";

import profit_graph_image from "../../assets/img/profit_graph.png";
import loss_graph_image from "../../assets/img/loss_graph.png";

const StockDetail = () => {
  const location = useLocation();
  const [checkForPageFound, setCheckForPageFound] = useState(true);
  const [companyLogoUrlName, setCompanyLogoUrlName] = useState(null);
  const [companyName, setCompanyName] = useState("Name");
  const [companyCost, setCompanyCost] = useState("186.37");
  const [companyCostPerRate, setCompanyCostPerRate] = useState("-8.45 (4.34%)");
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);
  const [activeShareholdingPatternDay, setActiveShareholdingPatternDay] =
    useState("day1");
  const [financialActiveReason, setFinancialActiveReason] = useState("revenue");
  const [
    financialActiveQuarterlyOrYearly,
    setFinancialActiveQuarterlyOrYearly,
  ] = useState("quarterly");
  const { image } = useImage(companyLogoUrlName);

  const [shareHolderPercentageRange1, setShareHolderPercentageRange1] =
    useState(0);
  const [shareHolderPercentageRange2, setShareHolderPercentageRange2] =
    useState(0);
  const [shareHolderPercentageRange3, setShareHolderPercentageRange3] =
    useState(0);


  useEffect(()=>{
    window.scrollTo(0,0);
  },[companyName])

  useEffect(() => {
    if (activeShareholdingPatternDay === "day1") {
      setShareHolderPercentageRange1(32.91);
      setShareHolderPercentageRange2(72.65);
      setShareHolderPercentageRange3(42.88);
    } else if (activeShareholdingPatternDay === "day2") {
      setShareHolderPercentageRange1(52.72);
      setShareHolderPercentageRange2(61.81);
      setShareHolderPercentageRange3(25.72);
    } else if (activeShareholdingPatternDay === "day3") {
      setShareHolderPercentageRange1(42.1);
      setShareHolderPercentageRange2(72.81);
      setShareHolderPercentageRange3(14.71);
    } else if (activeShareholdingPatternDay === "day4") {
      setShareHolderPercentageRange1(52.71);
      setShareHolderPercentageRange2(42.61);
      setShareHolderPercentageRange3(100);
    }
  }, [activeShareholdingPatternDay]);

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
                <div className="stock_detail_company_graph_main">
                  <div className="stock_detail_company_graph_main_image_box">
                    {isCostPerRateNegative ? (
                      <img src={loss_graph_image} alt="" />
                    ) : (
                      <img src={profit_graph_image} alt="" />
                    )}
                  </div>
                </div>
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
                          <span id="fundamental_title_x"> Face Value</span>
                          <span id="fundamental_cost_x">10.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stock_detail_company_financial_main">
                  <div className="stock_detail_company_financial_main_head">
                    <span id="stock_detail_company_financial_main_head_title">
                      Financials
                    </span>
                  </div>
                  <div className="stock_detail_company_financial_main_data_visualization">
                    <div className="stock_detail_company_financial_main_data_visualization_top">
                      <div className="stock_detail_company_financial_main_data_visualization_top_arrange_width">
                        <div className="stock_detail_company_financial_main_data_visualization_top_title_box">
                          <button
                            id="stock_detail_financial_revenue_title"
                            style={{
                              color:
                                financialActiveReason === "revenue"
                                  ? "#00b386"
                                  : null,
                            }}
                            onClick={() => {
                              setFinancialActiveReason("revenue");
                            }}
                          >
                            Revenue
                          </button>
                          <button
                            id="stock_detail_financial_profit_title"
                            style={{
                              color:
                                financialActiveReason === "profit"
                                  ? "#00b386"
                                  : null,
                            }}
                            onClick={() => {
                              setFinancialActiveReason("profit");
                            }}
                          >
                            Profit
                          </button>
                          <button
                            id="stock_detail_financial_net_worth_title"
                            style={{
                              color:
                                financialActiveReason === "net_worth"
                                  ? "#00b386"
                                  : null,
                            }}
                            onClick={() => {
                              setFinancialActiveReason("net_worth");
                            }}
                          >
                            Net Worth
                          </button>
                        </div>
                        <div className="stock_detail_company_financial_main_data_visualization_top_active_box">
                          <span
                            className={`stock_detail_data_visualization_active`}
                            id={`stock_detail_data_visualization_active_${financialActiveReason}`}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="stock_detail_company_financial_main_data_visualization_mid">
                      <div className="stock_detail_company_financial_main_data_visualization_mid_top_notify">
                        <span>*All Value are in Rs. Cr</span>
                      </div>
                      <div className="stock_detail_company_financial_main_data_visualization_mid_graph_show">
                        <div className="stock_detail_company_financial_main_data_visualization_mid_graph_show_top">
                          {financialActiveReason === "revenue" ? (
                            financialActiveQuarterlyOrYearly === "quarterly" ? (
                              <>
                                <FinancialGraph
                                  value="221"
                                  bar_percentage={71}
                                />
                                <FinancialGraph
                                  value="41"
                                  bar_percentage={62}
                                />
                                <FinancialGraph
                                  value="71"
                                  bar_percentage={53}
                                />
                                <FinancialGraph
                                  value="111"
                                  bar_percentage={76}
                                />
                                <FinancialGraph
                                  value="-921"
                                  bar_percentage={45}
                                />
                              </>
                            ) : (
                              <>
                                <FinancialGraph
                                  value="-121"
                                  bar_percentage={31}
                                />
                                <FinancialGraph
                                  value="-41"
                                  bar_percentage={42}
                                />
                                <FinancialGraph
                                  value="71"
                                  bar_percentage={53}
                                />
                                <FinancialGraph
                                  value="921"
                                  bar_percentage={85}
                                />
                                <FinancialGraph
                                  value="111"
                                  bar_percentage={66}
                                />
                              </>
                            )
                          ) : null}

                          {financialActiveReason === "profit" ? (
                            financialActiveQuarterlyOrYearly === "quarterly" ? (
                              <>
                                <FinancialGraph
                                  value="41"
                                  bar_percentage={71}
                                />
                                <FinancialGraph
                                  value="-21"
                                  bar_percentage={42}
                                />
                                <FinancialGraph
                                  value="671"
                                  bar_percentage={33}
                                />
                                <FinancialGraph
                                  value="311"
                                  bar_percentage={86}
                                />
                                <FinancialGraph
                                  value="91"
                                  bar_percentage={95}
                                />
                              </>
                            ) : (
                              <>
                                <FinancialGraph
                                  value="11"
                                  bar_percentage={81}
                                />
                                <FinancialGraph
                                  value="41"
                                  bar_percentage={42}
                                />
                                <FinancialGraph
                                  value="-81"
                                  bar_percentage={23}
                                />
                                <FinancialGraph
                                  value="-88"
                                  bar_percentage={31}
                                />
                                <FinancialGraph
                                  value="321"
                                  bar_percentage={75}
                                />
                              </>
                            )
                          ) : null}

                          {financialActiveReason === "net_worth" ? (
                            financialActiveQuarterlyOrYearly === "quarterly" ? (
                              <>
                                <FinancialGraph
                                  value="-31"
                                  bar_percentage={61}
                                />
                                <FinancialGraph
                                  value="21"
                                  bar_percentage={49}
                                />
                                <FinancialGraph
                                  value="571"
                                  bar_percentage={73}
                                />
                                <FinancialGraph
                                  value="21"
                                  bar_percentage={59}
                                />
                                <FinancialGraph
                                  value="111"
                                  bar_percentage={95}
                                />
                              </>
                            ) : (
                              <>
                                <FinancialGraph
                                  value="11"
                                  bar_percentage={61}
                                />
                                <FinancialGraph
                                  value="-11"
                                  bar_percentage={52}
                                />
                                <FinancialGraph
                                  value="81"
                                  bar_percentage={73}
                                />
                                <FinancialGraph
                                  value="71"
                                  bar_percentage={81}
                                />
                                <FinancialGraph
                                  value="-21"
                                  bar_percentage={90}
                                />
                              </>
                            )
                          ) : null}
                        </div>
                        <div className="stock_detail_company_financial_main_data_visualization_mid_graph_show_mid">
                          <div id="stock_detail_company_financial_main_data_visualization_mid_graph_show_mid_line_id"></div>
                        </div>
                        <div className="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom">
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            Jun'23
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            Nov'23
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            Feb'24
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            July'24
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            sep'24
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="stock_detail_company_financial_main_data_visualization_bottom">
                      <div className="stock_detail_company_financial_main_data_visualization_bottom_arrange_width">
                        <button
                          className="stock_detail_company_financial_main_data_visualization_bottom_title_btn"
                          id={
                            financialActiveQuarterlyOrYearly === "quarterly"
                              ? "stock_detail_company_financial_main_data_visualization_bottom_quarterly"
                              : null
                          }
                          onClick={() => {
                            setFinancialActiveQuarterlyOrYearly("quarterly");
                          }}
                        >
                          Quarterly
                        </button>
                        <button
                          className="stock_detail_company_financial_main_data_visualization_bottom_title_btn"
                          id={
                            financialActiveQuarterlyOrYearly === "yearly"
                              ? "stock_detail_company_financial_main_data_visualization_bottom_yearly"
                              : null
                          }
                          onClick={() => {
                            setFinancialActiveQuarterlyOrYearly("yearly");
                          }}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
                          <button
                            id={
                              activeShareholdingPatternDay === "day1"
                                ? "shareholding_pattern_top_day_active"
                                : null
                            }
                            className="stock_detail_company_shareholding_pattern_top_day1"
                            onClick={() => {
                              setActiveShareholdingPatternDay("day1");
                            }}
                          >
                            Day 1
                          </button>
                          <button
                            id={
                              activeShareholdingPatternDay === "day2"
                                ? "shareholding_pattern_top_day_active"
                                : null
                            }
                            className="stock_detail_company_shareholding_pattern_top_day2"
                            onClick={() => {
                              setActiveShareholdingPatternDay("day2");
                            }}
                          >
                            Day 2
                          </button>
                          <button
                            id={
                              activeShareholdingPatternDay === "day3"
                                ? "shareholding_pattern_top_day_active"
                                : null
                            }
                            className="stock_detail_company_shareholding_pattern_top_day3"
                            onClick={() => {
                              setActiveShareholdingPatternDay("day3");
                            }}
                          >
                            Day 3
                          </button>
                          <button
                            id={
                              activeShareholdingPatternDay === "day4"
                                ? "shareholding_pattern_top_day_active"
                                : null
                            }
                            className="stock_detail_company_shareholding_pattern_top_day4"
                            onClick={() => {
                              setActiveShareholdingPatternDay("day4");
                            }}
                          >
                            Day 4
                          </button>
                        </div>
                        <div className="stock_detail_company_shareholding_pattern_graph_main_bottom">
                          <ShareholdingPatternCard
                            title={"Promoters"}
                            percentage={shareHolderPercentageRange1}
                          />
                          <ShareholdingPatternCard
                            title={"Retail And Others"}
                            percentage={shareHolderPercentageRange2}
                          />
                          <ShareholdingPatternCard
                            title={"Other Domestic Industry"}
                            percentage={shareHolderPercentageRange3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stock_detail_company_similar_stock">
                  <div className="stock_detail_company_similar_stock_title">
                    <span id="stock_detail_company_similar_stock_title_id">
                      Similar Stocks
                    </span>
                  </div>
                  <div className="stock_detail_company_similar_stock_comp">
                    <StockCard
                      logoUrl={pnbHouse}
                      title="PNB Housing Finance"
                      cost="892.21"
                      costPerRate="17.21 (0.61%)"
                    />
                    <StockCard
                      logoUrl={castrolIndia}
                      title="Castrol India"
                      cost="268.90"
                      costPerRate="17.80 (7.10%)"
                    />
                    <StockCard
                      logoUrl={aloakIndustries}
                      title="Alok Industries"
                      cost="28.32"
                      costPerRate="2.10 (10.7%)"
                    />
                    <StockCard
                      logoUrl={centuryTextile}
                      title="Century Textiles"
                      cost="2,300.10"
                      costPerRate="152.66 (7.91%)"
                    />
                  </div>
                </div>
                <div className="stock_detail_company_recently_viewed">
                  <div className="stock_detail_company_recently_viewed_title">
                    <span id="stock_detail_company_recently_viewed_title_id">
                      Recently Viewed
                    </span>
                  </div>
                  <div className="stock_detail_company_recently_viewed_comp">
                    <StockCard
                      logoUrl={ola_logo}
                      title="Ola Electric Mobility"
                      cost="2.77"
                      costPerRate="0.26 (0.19%)"
                    />
                    <StockCard
                      logoUrl={GTL_logo}
                      title="GTL Infrastructure"
                      cost="123.19"
                      costPerRate="-0.04 (1.42%)"
                    />
                    <StockCard
                      logoUrl={MD_ship_logo}
                      title="Mazagon Dock Ship"
                      cost="4,539.65"
                      costPerRate="240.1 (5.52%)"
                    />
                    <StockCard
                      logoUrl={Angel_one_logo}
                      title="Angel One"
                      cost="2,699.90"
                      costPerRate="-3.00 (0.11%)"
                    />
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
