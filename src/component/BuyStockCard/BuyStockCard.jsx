import "./BuyStockCard.css";
import { useState, useEffect } from "react";
import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/centralExportMegPopUpHandel";
import { useDispatch } from "react-redux";
import {
  fetchUserTransactionDataThunk,
  selectorUserTransactionWalletBalance,
} from "../../features/api_lab/userTransactionData/centralExportUserTransactionData";
import { useSelector } from "react-redux";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useNavigate } from "react-router-dom";
import Loader from "../LoaderComponent/Loader";
import {fetchUserBuyStockData,selectorUserBuyStockData} from '../../features/api_lab/userBuyStockData/centralExportUserBuyStockData'

const BuyStockCard = ({
  logoUrl,
  stock_id,
  companyName,
  stockCost,
  stockCostPerRate,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBuyOption, setIsBuyOption] = useState("buy");
  const [userInputQytValue, setUserInputQytValue] = useState(0);
  const [userInputPriceValue, setUserInputPriceValue] = useState(0);
  const [userInputQytValueSell, setUserInputQytValueSell] = useState(0);
  const [userInputPriceValueSell, setUserInputPriceValueSell] = useState(0);
  const userTransactionBalanceAmount = useSelector(
    selectorUserTransactionWalletBalance
  );
  const userProfileData = useSelector(selectUserProfileData);
  const [loader, setLoader] = useState(false);
  const userAllBuyStockData = useSelector(selectorUserBuyStockData);
  const [currentBuyStockData , setCurrentBuyStockData] = useState(null);
  const [numberOfBuyStockData , setNumberOfBuyStockData] = useState(0);

  useEffect(()=>{
    if(userAllBuyStockData.length>0){
      for(let i=0;i<userAllBuyStockData.length;i++){
        if(userAllBuyStockData[i].stock_id===stock_id){
          setCurrentBuyStockData(userAllBuyStockData[i]);
          break;
        }else{
          setCurrentBuyStockData(null);
        }
      }
    }
  },[stock_id, userAllBuyStockData])

  useEffect(() => {
    if (userTransactionBalanceAmount === null) {
      dispatch(fetchUserTransactionDataThunk(userProfileData.userEmail));
    }
    
    if(userAllBuyStockData.length===0){
      dispatch(fetchUserBuyStockData(userProfileData.userEmail));
    }
  },[dispatch, userAllBuyStockData.length, userProfileData.userEmail, userTransactionBalanceAmount]);


  const handelToBuyStock = async () => {
    setLoader(true);
    const newBuyStockData = {
      email: userProfileData.userEmail,
      logoUrl,
      name:companyName,
      stock_id,
      stockCost,
      stockCostPerRate,
      stockQuantity: userInputQytValue,
    };

    const buyStockApi = "http://localhost:8080/api/user/buyStock";
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: "You are not authorized , login again",
          positiveResponse: false,
          makeFire: true,
        })
      );
      navigate("/login");
      setLoader(false);
      return;
    }

    const responseBuyStock = await fetch(buyStockApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBuyStockData),
    });

    if (!responseBuyStock.ok) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Server error , make sure you are online ?",
          positiveResponse: false,
          makeFire: true,
        })
      );
      setLoader(false);
      return;
    }

    if (responseBuyStock.status === 200) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: `Congratulation, for own ${companyName} Stocks`,
          positiveResponse: true,
          makeFire: true,
        })
      );
      setUserInputQytValue(0);
      dispatch(fetchUserTransactionDataThunk(userProfileData.userEmail));
      dispatch(fetchUserBuyStockData(userProfileData.userEmail))
      setLoader(false);
    } else {
      dispatch(
        fireTheMessagePopUp({
          messageShow: `You are not authorized to own  ${companyName} stock`,
          positiveResponse: false,
          makeFire: true,
        })
      );
      setLoader(false);
    }
  };
  
  const authQytInputValueBuy = () => {
    setLoader(true);
    if (userInputQytValue <= 0 || userInputQytValue > 1000) {
      if (userInputQytValue > 1000) {
        dispatch(
          fireTheMessagePopUp({
            messageShow: "you can not buy more than 1000 stock at a time",
            positiveResponse: false,
            makeFire: true,
          })
        );
        setLoader(false);
      } else {
        dispatch(
          fireTheMessagePopUp({
            messageShow: "you must have to buy at list 1 stock",
            positiveResponse: false,
            makeFire: true,
          })
        );
        setLoader(false);
      }
    } else if (
      Number(userInputPriceValue) > Number(userTransactionBalanceAmount)
    ) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: "You don't have sufficient amount , add money in wallet",
          positiveResponse: false,
          makeFire: true,
        })
      );
      setLoader(false);
    } else {      
      if(stock_id && companyName && stockCost && stockCostPerRate){
        handelToBuyStock();
        setLoader(false);
      }else{
        dispatch(
          fireTheMessagePopUp({
            messageShow: "credential require",
            positiveResponse: false,
            makeFire: true,
          })
        );
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    if (userTransactionBalanceAmount) {
      const calculate = (userInputQytValue * stockCost).toString();
      const countDecimal =
        calculate.split(".")[1] === undefined
          ? ""
          : calculate.split(".")[1].toString();
      if (countDecimal.length > 2) {
        const trimData = `${calculate.split(".")[0]}.${
          countDecimal[0] + countDecimal[1]
        }`;
        setUserInputPriceValue(trimData);
      } else {
        setUserInputPriceValue(calculate);
      }
    }
  }, [stockCost, userInputQytValue, userTransactionBalanceAmount]);

  // handel to sell stock data ...

  useEffect(()=>{
    if(currentBuyStockData!==null){
      setNumberOfBuyStockData(currentBuyStockData.stockQuantity)
    }
  },[currentBuyStockData])

  const handelToSellStock = async () => {
    setLoader(true);
    const sellStockApi = 'http://localhost:8080/api/user/sellStock';
    const token = localStorage.getItem('token');
    if(!token){
      console.log('Token not available to perform sell user stock');
      setLoader(false);
      return ;
    }

    const sellData = {
      email: userProfileData.userEmail,
      stock_id,
      stockCost,
      stockQuantity: userInputQytValueSell,
    }

    const response = await fetch(sellStockApi , {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(sellData)
    });

    if(!response.ok){
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Response not ok , Are You Online",
          positiveResponse: false,
          makeFire: true,
        })
      );
      console.log('response : ',response);
      setLoader(false);
      return 
    }


    if(response.status===200){
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Successfully sell your stock , and mony add to account",
          positiveResponse: true,
          makeFire: true,
        })
      );
      dispatch(fetchUserTransactionDataThunk(userProfileData.userEmail));
      dispatch(fetchUserBuyStockData(userProfileData.userEmail))
      setUserInputQytValueSell(0);
    }else{
      dispatch(
        fireTheMessagePopUp({
          messageShow: "Something went wrong",
          positiveResponse: false,
          makeFire: true,
        })
      );
    }
    setLoader(false);
  };

  useEffect(()=>{
    const sellPrice = (Number(userInputQytValueSell)*Number(stockCost));
    setUserInputPriceValueSell(sellPrice);
  },[stockCost, userInputQytValueSell]);
  

  const authQytInputValueSell = () => {
    if (userInputQytValueSell <= 0 || userInputQytValueSell > 100) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: "no of stock must be more than 1 to sell",
          positiveResponse: false,
          makeFire: true,
        })
      );
    }else if(userInputQytValueSell>numberOfBuyStockData){
      dispatch(
        fireTheMessagePopUp({
          messageShow: "You don't have enough stock to sell",
          positiveResponse: false,
          makeFire: true,
        })
      );
      setUserInputQytValueSell(0);
    }else {
      handelToSellStock();
    }
  };

  return (
    <div className="buy_stock_card_main">
      <div className="buy_stock_card_main_title_head">
        <div className="buy_stock_card_main_title_head_arrange_width">
          <span id="buy_stock_card_company_name">
            {companyName || "Company Name"}
          </span>
          <span id="buy_stock_card_nse_and_bse">
            NSE ₹{stockCost || "000.00"} ~ BSE ₹
            {stockCostPerRate || "000.00 (0.00%)"}
          </span>
        </div>
      </div>
      <div className="buy_stock_card_main_buy_and_sell">
        <div className="buy_stock_card_main_buy_and_sell_switch">
          <div className="buy_stock_card_main_buy_and_sell_switch_arrange_width">
            <div className="buy_stock_card_main_buy_and_sell_switch_buttons">
              <button
                id="Buy_option_btn"
                onClick={() => {
                  setIsBuyOption("buy");
                }}
                style={{ color: isBuyOption === "buy" ? "#00b386" : "#7c7e8c" }}
              >
                BUY
              </button>
              <button
                id="sell_option_btn"
                onClick={() => {
                  setIsBuyOption("sell");
                }}
                style={{
                  color: isBuyOption === "sell" ? "#eb5b3c" : "#7c7e8c",
                }}
              >
                SELL
              </button>
            </div>
            <div className="buy_stock_card_main_buy_and_sell_switch_animation">
              <div
                className="buy_stock_card_switch_animation_line"
                id={isBuyOption === "sell" ? "sellEnable_to_slide" : null}
              ></div>
            </div>
          </div>
        </div>
        <div className="buy_stock_card_main_buy_and_sell_chose_rate_main">
          <div className="buy_stock_card_main_buy_and_sell_chose_rate_main_arrange_width">
            <div className="buy_stock_card_main_buy_and_sell_chose_top">
              {isBuyOption === "buy" ? (
                <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_box">
                  <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_quality_main">
                    <span id="buy_stock_card_inputs_quality_title">
                      Qty NSE
                    </span>
                    <input
                      id="buy_stock_card_inputs_quality_input"
                      type="number"
                      min="0"
                      value={userInputQytValue}
                      onChange={(e) => {
                        setUserInputQytValue(
                          e.target.value > 10_000 ? 0 : e.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_price_main">
                    <span id="buy_stock_card_inputs_price_title">
                      Price Limit
                    </span>
                    <div id="buy_stock_card_inputs_price_input">
                      <p>{`${userInputPriceValue}`}</p>
                      {/* <p>{`${userInputPriceValue.toString().split('.')[0]}.${userInputPriceValue.toString()?.split('.')[1]?.slice(0,2)}` || 0}</p> */}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_box">
                  <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_quality_main">
                    <span id="buy_stock_card_inputs_quality_title">
                      No of Stock
                    </span>
                    <input
                      id="buy_stock_card_inputs_quality_input"
                      type="number"
                      min="0"
                      value={userInputQytValueSell}
                      onChange={(e) => {
                        setUserInputQytValueSell(
                          e.target.value > 1000 ? 0 : e.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_price_main">
                    <span id="buy_stock_card_inputs_price_title">
                      Current Value
                    </span>
                    <div id="buy_stock_card_inputs_price_input">
                      <p>{userInputPriceValueSell || 0}</p>
                    </div>
                    {/* <input
                      id="buy_stock_card_inputs_price_input"
                      type="number"
                      min="0"
                      value={userInputPriceValueSell}
                      onChange={(e) => {
                        setUserInputPriceValueSell(
                          e.target.value>10_000?0:e.target.value
                        );
                      }}
                    /> */}
                  </div>
                </div>
              )}
            </div>
            <div className="buy_stock_card_main_buy_and_sell_chose_bottom">
              <div className="buy_stock_card_main_buy_and_sell_chose_bottom_notify_box">
                {isBuyOption === "buy" ? (
                  <span id="buy_stock_card_main_buy_and_sell_chose_bottom_notify_span">
                    Stock is under watch by exchange
                  </span>
                ) : null}
              </div>
              <div className="buy_stock_card_main_buy_and_sell_chose_bottom_button_and_text_cost_box">
                <div className="buy_stock_card_main_buy_and_sell_chose_bottom_cost_text_box">
                  <span id="buy_stock_card_main_buy_and_sell_chose_bottom_cost_text_balance">
                    Balance : ₹{userTransactionBalanceAmount}
                  </span>
                  <span id="buy_stock_card_main_buy_and_sell_chose_bottom_cost_text_approx">
                    no of this stock you have: {currentBuyStockData!==null ? currentBuyStockData.stockQuantity:'0'}
                  </span>
                </div>
                <div className="buy_stock_card_main_buy_and_sell_chose_bottom_button_box">
                  {isBuyOption === "buy" ? (
                    <button
                      id="buy_stock_card_main_buy_btn"
                      onClick={authQytInputValueBuy}
                    >
                      {loader ? <Loader /> : "BUY"}
                    </button>
                  ) : (
                    <button
                    id="buy_stock_card_main_sell_btn"
                    onClick={authQytInputValueSell}
                    >
                      {loader ? <Loader /> : "SELL"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyStockCard;
