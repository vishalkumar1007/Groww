import "./InvestmentStock.css";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import StockCard from "../../component/StockCard/StockCard";
import EmptyDataSvg from "../../assets/svg/am_icon/Empty_data_bro.svg";
import {
  fetchUserBuyStockData,
  selectorUserBuyStockEmail,
  selectorUserBuyStockData,
} from "../../features/api_lab/userBuyStockData/centralExportUserBuyStockData";

import { selectorAllStockApiData } from "../../features/api_lab/allStockHeadApiData/centralExportAllStockHeadApiData";

const InvestmentStock = () => {
  const dispatch = useDispatch();
  const userProfileData = useSelector(selectUserProfileData);
  const allStockData = useSelector(selectorAllStockApiData);
  const userBuyStockData = useSelector(selectorUserBuyStockData);
  const userBuyStockEmail = useSelector(selectorUserBuyStockEmail);
  const [currentValueStockData, setCurrentValueStockData] = useState([]);

  useEffect(() => {
    if (allStockData.length > 0 && userBuyStockData.length > 0) {
      const arr = [];
      for (let i = 0; i < userBuyStockData.length; i++) {
        for (let x = 0; x < allStockData.length; x++) {
          if (userBuyStockData[i].stock_id === allStockData[x].stock_id) {
            arr.push(allStockData[x]);
            break;
          }
        }
      }
      setCurrentValueStockData(arr);
    }
  }, [allStockData, userBuyStockData]);

  useEffect(() => {
    if (userBuyStockEmail === null && userProfileData.userEmail) {
      dispatch(fetchUserBuyStockData(userProfileData.userEmail));
    }
  }, [dispatch, userBuyStockEmail, userProfileData.userEmail]);

  return (
    <div className="InvestmentStock_main">
      <div className="InvestmentStock_main_width">
        {userBuyStockData.length > 0 ? (
          <div className="InvestmentStock_main_preview_data_detail">
            <div className="InvestmentStock_main_title">
              <p>Your Investment Stock Chart</p>
            </div>
            <div className="InvestmentStock_main_preview_data_detail_arrange_width">
              <div className="InvestmentStock_main_preview_data_detail_container">
                <div className="InvestmentStock_main_preview_data_detail_container_stock_icon">
                  <p id="title">Logo</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_stock_name">
                  <p id="title">Stock Name</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_stock_buy_value">
                  <p id="title">Buy Value</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_stock_buy_value_per_rate">
                  <p id="title">BV Per Rate</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_stock_current_value">
                  <p id="title">Current Value</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_stock_current_value_per_rate">
                  <p id="title">CV Per Rate</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_no_of_stock_you_have">
                  <p id="title">No of stock you have</p>
                </div>
                <div className="InvestmentStock_main_preview_data_detail_container_stock_profits">
                  <p id="title">Profit's</p>
                </div>
              </div>
              {userBuyStockData.map((data, index) => (
                <div
                  className="InvestmentStock_main_preview_data_detail_container"
                  id="InvestmentStock_main_preview_data_detail_container_border"
                  key={index}
                >
                  <div className="InvestmentStock_main_preview_data_detail_container_stock_icon">
                    <div className="InvestmentStock_main_preview_data_detail_container_stock_icon_logo_div">
                      <img src={data.logoUrl} alt="" />
                    </div>
                  </div>
                  <div className="InvestmentStock_main_preview_data_detail_container_stock_name">
                    <p>{data.name}</p>
                  </div>
                  <div
                    className="InvestmentStock_main_preview_data_detail_container_stock_buy_value"
                    id="InvestmentStock_main_cost_style_buy"
                  >
                    <p>₹{data.stockCost}</p>
                  </div>
                  <div className="InvestmentStock_main_preview_data_detail_container_stock_buy_value_per_rate">
                    <p>{data.stockCostPerRate}</p>
                  </div>
                  <div
                    className="InvestmentStock_main_preview_data_detail_container_stock_current_value"
                    id="InvestmentStock_main_cost_style"
                  >
                    <p>
                      ₹
                      {currentValueStockData.length > 0
                        ? currentValueStockData[index].stockCost
                        : "0"}
                    </p>
                  </div>
                  <div className="InvestmentStock_main_preview_data_detail_container_stock_current_value_per_rate">
                    <p>
                      {currentValueStockData.length > 0
                        ? currentValueStockData[index].stockCostPerRate
                        : "0"}
                    </p>
                  </div>
                  <div className="InvestmentStock_main_preview_data_detail_container_no_of_stock_you_have">
                    <p>{data.stockQuantity}</p>
                  </div>
                  <div className="InvestmentStock_main_preview_data_detail_container_stock_profits">
                    {(
                      Number(
                        currentValueStockData.length > 0
                          ? currentValueStockData[index].stockCost
                          : "0"
                      ) - Number(data.stockCost)
                    ).toFixed(2) < 0 ? (
                      <p id="InvestmentStock_main_preview_data_detail_container_stock_profits_negative">
                        {(
                          Number(
                            currentValueStockData.length > 0
                              ? currentValueStockData[index].stockCost
                              : "0"
                          ) - Number(data.stockCost)
                        ).toFixed(2)}
                      </p>
                    ) : (
                      <p id="InvestmentStock_main_preview_data_detail_container_stock_profits_positive">
                        {(
                          Number(
                            currentValueStockData.length > 0
                              ? currentValueStockData[index].stockCost
                              : "0"
                          ) - Number(data.stockCost)
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {userBuyStockData.length > 0 ? (
          <div className="InvestmentStock_main_title">
            <p>All Buy Stock Navigator</p>
          </div>
        ) : null}

        <div className="InvestmentStock_main_buy_stock_cards">
          {userBuyStockData.length > 0 ? (
            userBuyStockData.map((data, index) => (
              <StockCard
                key={index}
                _id={data._id}
                stock_id={data.stock_id}
                logoUrl={data.logoUrl}
                name={data.name}
                stockCost={data.stockCost}
                stockCostPerRate={data.stockCostPerRate}
              />
            ))
          ) : (
            <div className="InvestmentStock_main_container_all_stock_add_card_svg">
              <img src={EmptyDataSvg} alt="" />
              <span>
                You don't buy any stock , it will show here after buy any stock
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentStock;
