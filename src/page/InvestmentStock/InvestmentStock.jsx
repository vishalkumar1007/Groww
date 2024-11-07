import "./InvestmentStock.css";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useSelector,useDispatch } from "react-redux";
import { useState , useEffect } from "react";
import StockCard from "../../component/StockCard/StockCard";
import EmptyDataSvg from "../../assets/svg/am_icon/Empty_data_bro.svg";
import {
  fetchUserBuyStockData,
  selectorUserBuyStockEmail,
  selectorUserBuyStockData,
  selectorUserBuyStockLoading
} from '../../features/api_lab/userBuyStockData/centralExportUserBuyStockData'
const InvestmentStock = () => {
  const dispatch = useDispatch();
  const userProfileData = useSelector(selectUserProfileData);

  const userBuyStockData = useSelector(selectorUserBuyStockData);
  const userBuyStockEmail = useSelector(selectorUserBuyStockEmail);

  useEffect(()=>{
    if(userBuyStockEmail===null && userProfileData.userEmail){
      dispatch(fetchUserBuyStockData(userProfileData.userEmail))
    }
  },[dispatch, userBuyStockEmail, userProfileData.userEmail])
  

  return (
    <div className="InvestmentStock_main">
      <div className="InvestmentStock_main_width">
        {userBuyStockData.length > 0 ? (
          <div className="InvestmentStock_main_title">
            <p>Your all buy stocks</p>
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
              <span>You don't buy any stock , it will show here after buy any stock</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentStock;
