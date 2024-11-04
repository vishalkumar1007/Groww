import { useEffect } from "react";
import "./InvestmentStock.css";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useSelector } from "react-redux";
import { useState } from "react";
import StockCard from "../../component/StockCard/StockCard";
import EmptyDataSvg from "../../assets/svg/am_icon/Empty_data_bro.svg";

const InvestmentStock = () => {
  const userProfileData = useSelector(selectUserProfileData);
  const [userStockBuyData, setUserStockBuyData] = useState([]);

  useEffect(() => {
    const fetchUserBuyData = async () => {
      try {
        const buyStockData = "http://localhost:8080/api/user/getUserBuyData";
        const token = localStorage.getItem("token");

        const response = await fetch(buyStockData, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: userProfileData.userEmail }),
        });
        if (!response) {
          console.log("response is not ok");
          return;
        }

        if (response.status === 200) {
          const jsonData = await response.json();
          setUserStockBuyData(jsonData.ownStocks);
        }
      } catch (error) {
        console.log("error while fetch data", error);
      }
    };

    if (userProfileData.userEmail) {
      fetchUserBuyData();
    }
  }, [userProfileData.userEmail]);

  return (
    <div className="InvestmentStock_main">
      <div className="InvestmentStock_main_width">
        {userStockBuyData.length > 0 ? (
          <div className="InvestmentStock_main_title">
            <p>Your all buy stocks</p>
          </div>
        ) : null}
        <div className="InvestmentStock_main_buy_stock_cards">
          {userStockBuyData.length > 0 ? (
            userStockBuyData.map((data, index) => (
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
