import { useEffect, useState } from "react";
import "./StockMarketCap.css";
import { useNavigate } from "react-router-dom";

import {
  addToWatchlist,
  removeFromWatchlist,
  selectUserWatchlistValue,
} from "../../features/userWatchlist/centralExportUserWatchlist";

import { useDispatch, useSelector } from "react-redux";

const StockMarketCap = ({
  _id = "",
  stock_id = "",
  stockCost = "",
  stockCostPerRate = "",
  name = "",
  logoUrl = "",
  RemoveAddToCardFeature = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAddToWatchList, setIsAddToWatchList] = useState(false);
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);

  // handel to add and remove stocks from watchlist using redux

  const userWatchlistData = useSelector(selectUserWatchlistValue);

  const addStockToWatchlist = () => {
    if (isAddToWatchList) {
      dispatch(removeFromWatchlist({ stock_id }));
      setIsAddToWatchList(false);
    } else {
      dispatch(
        addToWatchlist({ _id, stock_id, name, stockCost, stockCostPerRate, logoUrl })
      );
    }
  };

  useEffect(() => {
    for (let i = 0; i < userWatchlistData.length; i++) {
      if (userWatchlistData[i].stock_id === stock_id) {
        setIsAddToWatchList(true);
        break;
      }
    }
  }, [stock_id, userWatchlistData]);

  // ---------------

  useEffect(() => {
    if (stockCostPerRate.length > 0) {
      for (const element of stockCostPerRate) {
        if (element === "-") {
          setIsCostPerRateNegative(true);
          break;
        } else {
          setIsCostPerRateNegative(false);
        }
      }
    }
  }, [stockCostPerRate]);

  return (
    <div className="stock_market_cap_main">
      <div className="stock_market_cap_main_arrange_width">
        <div className="stock_market_cap_main_title_section_company_and_graph">
          <div className="stock_market_cap_main_title_section_company">
            <button
              onClick={() => {
                navigate(`/stock_detail?${stock_id}`);
              }}
            >
              {name || "Company Name"}
            </button>
          </div>
        </div>
        <div className="stock_market_cap_main_title_section_price_and_watchlist">
          <div className="stock_market_cap_main_title_section_price_main"
            style={{
              // RemoveAddToCardFeature
              maxWidth:`${RemoveAddToCardFeature?'95%':'82px'}`,
              minWidth:`${RemoveAddToCardFeature?'95%':'82px'}`
            }}
          >
            <div className="stock_market_cap_main_title_section_price">
              <span id="stock_market_cap_price_value">
                {stockCost || "₹0,000.00"}
              </span>
              <span
                id="stock_market_cap_price_valuePerRate"
                style={{
                  color:
                    stockCostPerRate === ""
                      ? "#717171"
                      : isCostPerRateNegative
                      ? "#e84e2c"
                      : "#00B386",
                }}
              >
                {stockCostPerRate || "0.00 (0.00%)"}
              </span>
            </div>
          </div>

          {RemoveAddToCardFeature ? null : (
            <div className="stock_market_cap_main_title_section_watchlist">
              <button
                onClick={() => {
                  // setIsAddToWatchList(!isAddToWatchList);
                  addStockToWatchlist();
                }}
              >
                {isAddToWatchList ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    viewBox="0 0 24 24"
                    fill="#00B386"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-check"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-plus"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockMarketCap;
