import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./StockDetail.css";
// ............... hooks ..................
// import useImage from "../../hooks/useImage";
// ............... components ..................
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import PageNotFound from "../../component/PageNotFound/PageNotFound";
import BuyStockCard from "../../component/BuyStockCard/BuyStockCard";
import ShareholdingPatternCard from "../../component/ShareholdingPatternCard/ShareholdingPatternCard";
import FinancialGraph from "../../component/StockDetailComponents/FinancialGraph/FinancialGraph";
import StockCard from "../../component/StockCard/StockCard";
// ............... json data ..............
// import StockData from "../../utils/stockData.json";
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
  const [companyCost, setCompanyCost] = useState("000.00");
  const [companyCostPerRate, setCompanyCostPerRate] = useState("0.0 (0.0%)");
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);
  const [activeShareholdingPatternDay, setActiveShareholdingPatternDay] =
    useState("day1");
  const [financialActiveReason, setFinancialActiveReason] = useState("revenue");
  const [
    financialActiveQuarterlyOrYearly,
    setFinancialActiveQuarterlyOrYearly,
  ] = useState("quarterly");

  const [isBuyAndSellOpenInMobile, setIsBuyAndSellOpenInMobile] =
    useState(false);
  // const { image } = useImage(companyLogoUrlName);

  const [shareHolderPercentageRange1, setShareHolderPercentageRange1] =
    useState(0);
  const [shareHolderPercentageRange2, setShareHolderPercentageRange2] =
    useState(0);
  const [shareHolderPercentageRange3, setShareHolderPercentageRange3] =
    useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [companyName]);

  // variables of Stock Api data
  const [APIstockData, setAPIStockData] = useState("");

  // Get stock name from url
  const queryParams = new URLSearchParams(location.search);
  const stockName = queryParams.keys().next().value;

  
  // API call


  useEffect(() => {
    const fetchData = async () => {
      const stockDetailApi = `http://localhost:8080/api/stock/getById?stock_id=${stockName}`;

      try {
        const response = await fetch(stockDetailApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Api error in stockDetail ", await response.json());
          setCheckForPageFound(true);
          return;
        }
        const jsonData = await response.json();

        //  what if not found data
        if(jsonData.length===0){
          setCheckForPageFound(false);
          return;
        }

        // adding data into useState variable
        setCompanyLogoUrlName(jsonData[0].logoUrl);
        setCompanyName(jsonData[0].name);
        setCompanyCost(jsonData[0].stockCost);
        setCompanyCostPerRate(jsonData[0].stockCostPerRate);

        //
        setAPIStockData(jsonData);
      } catch (error) {
        //  what if not found data
        setCheckForPageFound(false);
        console.log("error while fetching stockData ", error);
      }
    };

    fetchData();
  }, [stockName]);

  // useEffect(()=>{
  //  console.log(APIstockData[0].logoUrl);
  // },[APIstockData])

  useEffect(() => {
    if (activeShareholdingPatternDay === "day1") {
      setShareHolderPercentageRange1(APIstockData[0]?.shareHolderPattern.Day1.promotersPercent);
      setShareHolderPercentageRange2(APIstockData[0]?.shareHolderPattern.Day1.retailAndOtherPercent);
      setShareHolderPercentageRange3(APIstockData[0]?.shareHolderPattern.Day1.otherDomesticIndustryPercent);

    } else if (activeShareholdingPatternDay === "day2") {
      setShareHolderPercentageRange1(APIstockData[0]?.shareHolderPattern.Day2.promotersPercent);
      setShareHolderPercentageRange2(APIstockData[0]?.shareHolderPattern.Day2.retailAndOtherPercent);
      setShareHolderPercentageRange3(APIstockData[0]?.shareHolderPattern.Day2.otherDomesticIndustryPercent);
      
    } else if (activeShareholdingPatternDay === "day3") {
      setShareHolderPercentageRange1(APIstockData[0]?.shareHolderPattern.Day3.promotersPercent);
      setShareHolderPercentageRange2(APIstockData[0]?.shareHolderPattern.Day3.retailAndOtherPercent);
      setShareHolderPercentageRange3(APIstockData[0]?.shareHolderPattern.Day3.otherDomesticIndustryPercent);
      
    } else if (activeShareholdingPatternDay === "day4") {
      setShareHolderPercentageRange1(APIstockData[0]?.shareHolderPattern.Day4.promotersPercent);
      setShareHolderPercentageRange2(APIstockData[0]?.shareHolderPattern.Day4.retailAndOtherPercent);
      setShareHolderPercentageRange3(APIstockData[0]?.shareHolderPattern.Day4.otherDomesticIndustryPercent);
      
    }
  }, [APIstockData, activeShareholdingPatternDay]);

  // useEffect(() => {
  //   for (const stockDataCheck of StockData) {
  //     if (stockName === stockDataCheck.id) {
  //       setCheckForPageFound(true);
  //       setCompanyName(stockDataCheck.name);
  //       setCompanyLogoUrlName(stockDataCheck.logo_url);
  //       setCompanyCost(stockDataCheck.cost);
  //       setCompanyCostPerRate(stockDataCheck.costPerRate);
  //       break;
  //     }
  //   }
  // }, [companyLogoUrlName, stockName]);

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
                        <img src={companyLogoUrlName} alt="logo" />
                      </span>
                    </div>
                    <div className="stock_detail_company_information_head_left_title_and_cost">
                      <div className="stock_detail_company_information_head_left_title">
                        <span id="stock_detail_company_name">
                          {companyName || "Company Name"}
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
                            {APIstockData[0]?.performance.todayLow || "000.00"}
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
                            {APIstockData[0]?.performance.todayHigh || "000.00"}
                          </span>
                        </div>
                      </div>
                      <div className="stock_detail_company_performance_low_and_heigh_stats_52w">
                        <div className="stock_detail_company_performance_low_and_heigh_stats_52w_low">
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_low_title">
                            52W Low
                          </span>
                          <span id="stock_detail_company_performance_low_and_heigh_stats_52w_low_data">
                            {APIstockData[0]?.performance.FTW_low || "00.00"}
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
                            {APIstockData[0]?.performance.FTW_high || "000.00"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stock_detail_company_performance_data">
                    <div className="stock_detail_company_performance_data_top">
                      <span id="stock_detail_company_performance_data_top_open">
                        <p id="perform_title_x">Open</p>
                        <p id="perform_value_y">
                          {APIstockData[0]?.performance.open || "000.00"}
                        </p>
                      </span>
                      <span id="stock_detail_company_performance_data_top_prev">
                        <p id="perform_title_x">Prev. Close</p>
                        <p id="perform_value_y">
                          {APIstockData[0]?.performance.close || "000.00"}
                        </p>
                      </span>
                      <span id="stock_detail_company_performance_data_top_volume">
                        <p id="perform_title_x">Volume</p>
                        <p id="perform_value_y">
                          {APIstockData[0]?.performance.volume || "000.00"}
                        </p>
                      </span>
                    </div>
                    <div className="stock_detail_company_performance_data_bottom">
                      <span id="stock_detail_company_performance_data_bottom_tread_value">
                        <p id="perform_title_x">Total traded value</p>
                        <p id="perform_value_y">
                          {APIstockData[0]?.performance.totalTradeValue ||
                            "000.00 Cr"}
                        </p>
                      </span>
                      <span id="stock_detail_company_performance_data_bottom_upper_circuit">
                        <p id="perform_title_x">Upper Circuit</p>
                        <p id="perform_value_y">
                          {APIstockData[0]?.performance.upperCircuit ||
                            "000.00"}
                        </p>
                      </span>
                      <span id="stock_detail_company_performance_data_bottom_lower_circuit">
                        <p id="perform_title_x">Lower Circuit</p>
                        <p id="perform_value_y">
                          {APIstockData[0]?.performance.lowerCircuit ||
                            "000.00"}
                        </p>
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
                          <span id="fundamental_cost_x">
                            ₹
                            {APIstockData[0]?.fundamentals.marketCap ||
                              "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_pe_ratio">
                          <span id="fundamental_title_x">P/E Ratio(TTM)</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.PE_ratio || "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_pb_ratio">
                          <span id="fundamental_title_x">P/B Ratio</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.PB_ratio || "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_industry_pe">
                          <span id="fundamental_title_x">Industry P/E</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.Industry || "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_left_debt_equity">
                          <span id="fundamental_title_x">Debt to Equity</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.debtToEquity ||
                              "000.00"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="stock_detail_company_fundamental_main_data_right">
                      <div className="stock_detail_company_fundamental_main_data_right_arrange_width">
                        <div className="stock_detail_company_fundamental_main_data_right_ROE">
                          <span id="fundamental_title_x">ROE</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.ROE || "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_EPS">
                          <span id="fundamental_title_x">EPS(TTM)</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.EPS || "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_Dividend_Yield">
                          <span id="fundamental_title_x">Dividend Yield</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.dividendYield ||
                              "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_Book_Value">
                          <span id="fundamental_title_x">Book Value</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.bookValue ||
                              "000.00"}
                          </span>
                        </div>
                        <div className="stock_detail_company_fundamental_main_data_right_Face_Value">
                          <span id="fundamental_title_x"> Face Value</span>
                          <span id="fundamental_cost_x">
                            {APIstockData[0]?.fundamentals.faceValue ||
                              "000.00"}
                          </span>
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
                                  value={APIstockData[0]?.financial.revenueGraph.quarterly.graph1.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.quarterly.graph1.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.quarterly.graph2.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.quarterly.graph2.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.quarterly.graph3.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.quarterly.graph3.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.quarterly.graph4.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.quarterly.graph4.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.quarterly.graph5.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.quarterly.graph5.graphPercent || 1}
                                />
                              </>
                            ) : (
                              <>
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.yearly.graph1.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.yearly.graph1.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.yearly.graph2.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.yearly.graph2.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.yearly.graph3.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.yearly.graph3.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.yearly.graph4.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.yearly.graph4.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.revenueGraph.yearly.graph5.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.revenueGraph.yearly.graph5.graphPercent || 1}
                                />
                              </>
                            )
                          ) : null}

                          {financialActiveReason === "profit" ? (
                            financialActiveQuarterlyOrYearly === "quarterly" ? (
                              <>
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.quarterly.graph1.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.quarterly.graph1.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.quarterly.graph2.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.quarterly.graph2.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.quarterly.graph3.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.quarterly.graph3.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.quarterly.graph4.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.quarterly.graph4.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.quarterly.graph5.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.quarterly.graph5.graphPercent || 1}
                                />
                              </>
                            ) : (
                              <>
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.yearly.graph1.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.yearly.graph1.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.yearly.graph2.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.yearly.graph2.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.yearly.graph3.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.yearly.graph3.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.yearly.graph4.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.yearly.graph4.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.profitGraph.yearly.graph5.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.profitGraph.yearly.graph5.graphPercent || 1}
                                />
                              </>
                            )
                          ) : null}

                          {financialActiveReason === "net_worth" ? (
                            financialActiveQuarterlyOrYearly === "quarterly" ? (
                              <>
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.quarterly.graph1.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.quarterly.graph1.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.quarterly.graph2.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.quarterly.graph2.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.quarterly.graph3.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.quarterly.graph3.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.quarterly.graph4.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.quarterly.graph4.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.quarterly.graph5.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.quarterly.graph5.graphPercent || 1}
                                />
                              </>
                            ) : (
                              <>
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.yearly.graph1.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.yearly.graph1.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.yearly.graph2.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.yearly.graph2.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.yearly.graph3.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.yearly.graph3.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.yearly.graph4.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.yearly.graph4.graphPercent || 1}
                                />
                                <FinancialGraph
                                  value={APIstockData[0]?.financial.netWorthGraph.yearly.graph5.rateInCr || '000'}
                                  bar_percentage={APIstockData[0]?.financial.netWorthGraph.yearly.graph5.graphPercent || 1}
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
                            {
                              financialActiveReason === "revenue"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.revenueGraph.quarterly.graph1.date || 'month':APIstockData[0]?.financial.revenueGraph.yearly.graph1.date || 'year'):(financialActiveReason === "profit"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.profitGraph.quarterly.graph1.date || 'month':APIstockData[0]?.financial.profitGraph.yearly.graph1.date || 'year'):(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.netWorthGraph.quarterly.graph1.date || 'month':APIstockData[0]?.financial.netWorthGraph.yearly.graph1.date || 'year'))
                            }
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            {
                              financialActiveReason === "revenue"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.revenueGraph.quarterly.graph2.date || 'month':APIstockData[0]?.financial.revenueGraph.yearly.graph2.date || 'year'):(financialActiveReason === "profit"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.profitGraph.quarterly.graph2.date || 'month':APIstockData[0]?.financial.profitGraph.yearly.graph2.date || 'year'):(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.netWorthGraph.quarterly.graph2.date || 'month':APIstockData[0]?.financial.netWorthGraph.yearly.graph2.date || 'year'))
                            }
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            {
                              financialActiveReason === "revenue"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.revenueGraph.quarterly.graph3.date || 'month':APIstockData[0]?.financial.revenueGraph.yearly.graph3.date || 'year'):(financialActiveReason === "profit"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.profitGraph.quarterly.graph3.date || 'month':APIstockData[0]?.financial.profitGraph.yearly.graph3.date || 'year'):(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.netWorthGraph.quarterly.graph3.date || 'month':APIstockData[0]?.financial.netWorthGraph.yearly.graph3.date || 'year'))
                            }
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            {
                              financialActiveReason === "revenue"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.revenueGraph.quarterly.graph4.date || 'month':APIstockData[0]?.financial.revenueGraph.yearly.graph4.date || 'year'):(financialActiveReason === "profit"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.profitGraph.quarterly.graph4.date || 'month':APIstockData[0]?.financial.profitGraph.yearly.graph4.date || 'year'):(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.netWorthGraph.quarterly.graph4.date || 'month':APIstockData[0]?.financial.netWorthGraph.yearly.graph4.date || 'year'))
                            }
                          </span>
                          <span id="stock_detail_company_financial_main_data_visualization_mid_graph_show_bottom_Day_span">
                            {
                              financialActiveReason === "revenue"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.revenueGraph.quarterly.graph5.date || 'month':APIstockData[0]?.financial.revenueGraph.yearly.graph5.date || 'year'):(financialActiveReason === "profit"?(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.profitGraph.quarterly.graph5.date || 'month':APIstockData[0]?.financial.profitGraph.yearly.graph5.date || 'year'):(financialActiveQuarterlyOrYearly === "quarterly"?APIstockData[0]?.financial.netWorthGraph.quarterly.graph5.date || 'month':APIstockData[0]?.financial.netWorthGraph.yearly.graph5.date || 'year'))
                            }
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
                            {
                              APIstockData[0]?.shareHolderPattern.Day1.date || 'Day 1'
                            }
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
                            {
                              APIstockData[0]?.shareHolderPattern.Day2.date || 'Day 2'
                            }
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
                            {
                              APIstockData[0]?.shareHolderPattern.Day3.date || 'Day 3'
                            }
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
                            {
                              APIstockData[0]?.shareHolderPattern.Day4.date || 'Day 4'
                            }
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
              {/* ........... Buy Stock on mobile ............... */}

              <button
                className="stock_detail_buy_stock_on_mobile_main"
                onClick={() => {
                  setIsBuyAndSellOpenInMobile(!isBuyAndSellOpenInMobile);
                }}
              >
                {isBuyAndSellOpenInMobile ? (
                  <>
                    {/* <span id="stock_detail_buy_stock_on_mobile_main_buy">Close option</span> */}
                    <span
                      id="stock_detail_buy_stock_on_mobile_main_sell"
                      style={{ fontSize: "12px" }}
                    >
                      Close
                    </span>
                  </>
                ) : (
                  <>
                    <span id="stock_detail_buy_stock_on_mobile_main_buy">
                      Buy{" "}
                    </span>
                    <span id="stock_detail_buy_stock_on_mobile_main_X">/</span>
                    <span id="stock_detail_buy_stock_on_mobile_main_sell">
                      Sell
                    </span>
                  </>
                )}
              </button>
            </div>

            <Footer />
            {isBuyAndSellOpenInMobile ? (
              <div className="buy_and_sell_option_open_in_mobile_view_main_div">
                <div className="buy_and_sell_option_open_in_mobile_view_main_div_arrange_width">
                  <BuyStockCard
                    companyName={companyName}
                    cost={companyCost}
                    costPerRate={companyCostPerRate}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default StockDetail;
