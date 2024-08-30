import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./StockDetail.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import PageNotFound from "../../component/PageNotFound/PageNotFound";
import StockData from "../../jsonDummyData/stockData.json";
import useImage from "../../hooks/useImage";
import BuyStockCard from '../../component/BuyStockCard/BuyStockCard';

const StockDetail = () => {
  const location = useLocation();
  const [checkForPageFound, setCheckForPageFound] = useState(true);
  const [companyLogoUrlName, setCompanyLogoUrlName] = useState(null);
  const [companyName, setCompanyName] = useState("Name");
  const [companyCost, setCompanyCost] = useState("186.37");
  const [companyCostPerRate, setCompanyCostPerRate] = useState("-8.45 (4.34%)");
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);
  const { image } = useImage(companyLogoUrlName);

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
              </div>
              {/* ........... Buy Stock ............... */}
              <div className="stock_detail_buy_stock_main">
                <div className="stock_detail_buy_stock_main_buy_card_div">
                  <BuyStockCard/>
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
