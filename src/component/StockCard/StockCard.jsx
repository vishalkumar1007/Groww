import { useEffect, useState } from "react";
import "./StocksCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  selectUserWatchlistValue,
} from "../../features/userWatchlist/centralExportUserWatchlist";

const StocksCard = ({
  uniqueId = "",
  stockId = "",
  logoUrl = "",
  title = "",
  cost = "",
  costPerRate = "",
}) => {
  const dispatch = useDispatch();
  const user_watchlist_data = useSelector(selectUserWatchlistValue);
  const navigate = useNavigate();
  const [isCostPerRateNegative, setIsCostPerRateNegative] = useState(false);
  const [isCardAddToWatchList, setIsCardAddToWatchList] = useState(false);
  // const [updatedTitleForUrl, setUpdatedTitleForUrl] = useState("");

  const HandelAddCardToWatchList = () => {
    if (isCardAddToWatchList) {
      dispatch(removeFromWatchlist({ stockId }));
      setIsCardAddToWatchList(false);
    } else {
      dispatch(
        addToWatchlist({ uniqueId, stockId, title, cost, costPerRate, logoUrl })
      );
    }
  };


  useEffect(() => {
    for (let i = 0; i < user_watchlist_data.length; i++) {
      if (user_watchlist_data[i].stockId === stockId) {
        setIsCardAddToWatchList(true);
        break;
      }
    }
  }, [stockId, user_watchlist_data]);

  useEffect(() => {
    if (costPerRate.length > 0) {
      for (const element of costPerRate) {
        if (element === "-") {
          setIsCostPerRateNegative(true);
          break;
        } else {
          setIsCostPerRateNegative(false);
        }
      }
    }
  }, [costPerRate]);

  // useEffect(() => {
  //   let updatedTitle = title;
  //   for (let i = 0; i < updatedTitle.length; i++) {
  //     if (updatedTitle[i] === " ") {
  //       updatedTitle =
  //         updatedTitle.substring(0, i) + "-" + updatedTitle.substring(i + 1);
  //     }
  //     if (/[ `!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(updatedTitle[i])) {
  //       updatedTitle =
  //         updatedTitle.substring(0, i) + "" + updatedTitle.substring(i + 1);
  //     }
  //     if (
  //       updatedTitle.charCodeAt(i) >= 65 &&
  //       updatedTitle.charCodeAt(i) <= 90
  //     ) {
  //       updatedTitle =
  //         updatedTitle.substring(0, i) +
  //         updatedTitle[i].toLowerCase() +
  //         updatedTitle.substring(i + 1);
  //     }
  //   }
  //   setUpdatedTitleForUrl(updatedTitle);
  // }, [title]);

  return (
    <div className="stocksCard_main">
      <div className="stocksCard_main_top">
        <div className="stocksCard_main_top_logo_and_add">
          <div
            className="stocksCard_main_top_logo"
            onClick={() => {
              navigate(`/stock_detail?${stockId}`);
            }}
          >
            <img src={logoUrl} alt="" />
          </div>
          <div className="stocksCard_main_top_add">
            <div className="stocksCard_main_top_add_arrange_width">
              <button
                className="stocksCard_main_top_add_circle"
                onClick={() => {
                  HandelAddCardToWatchList();
                }}
              >
                {isCardAddToWatchList ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="svg_remove"
                    width="28"
                    height="28"
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
                    id="svg_add"
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00B386"
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
          </div>
        </div>
        <div
          className="stocksCard_main_top_left_title"
          onClick={() => {
            navigate(`/stock_detail?${stockId}`);
          }}
        >
          {title || "Stock Title"}
        </div>
      </div>
      <div
        className="stocksCard_main_bottom"
        onClick={() => {
          navigate(`/stock_detail?${stockId}`);
        }}
      >
        <div className="stocksCard_main_bottom_cost">₹{cost || "000.00"}</div>
        <div
          className="stocksCard_main_bottom_costPerRate"
          style={{
            color: isCostPerRateNegative
              ? "#EB5B3C"
              : costPerRate === ""
              ? "#4a4a4a"
              : "#00B386",
          }}
        >
          {costPerRate || "0.00 (0.00%)"}
        </div>
      </div>
    </div>
  );
};

export default StocksCard;
