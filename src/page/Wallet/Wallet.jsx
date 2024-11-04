import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "./Wallet.css";
import { useState, useRef, useEffect } from "react";
import FloatSearchStock from "../../component/FloatSearchStock/FloatSearchStock";
import WithDrawAndDeposit from "../../component/WithDrawAndDeposit/WithDrawAndDeposit";
import { useSelector, useDispatch } from "react-redux";
import {fetchUserTransactionDataThunk, selectorUserTransactionWalletBalance,selectorUserTransactionTransactionData } from "../../features/api_lab/userTransactionData/centralExportUserTransactionData";
import {selectUserProfileData} from '../../features/userProfileData/centralExportUserProfileData'
const Wallet = () => {
  const dispatch = useDispatch();
  const transactionDataHeight = useRef(0);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionHeight, setTransactionHeight] = useState(0);
  const [openSearchStockFloat, setOpenSearchStockFloat] = useState(false);
  const userTransactionDataWalletBalance = useSelector(selectorUserTransactionWalletBalance);
  const userTransactionDataTransactionData = useSelector(selectorUserTransactionTransactionData);
  const userProfileData = useSelector(selectUserProfileData);

  useEffect(()=>{
    if(userTransactionDataWalletBalance===null && userProfileData.userEmail!==undefined){
      dispatch(fetchUserTransactionDataThunk(userProfileData.userEmail))
    }
  },[dispatch, userProfileData, userTransactionDataWalletBalance])


  useEffect(() => {
    if (transactionDataHeight.current) {
      const height =
        transactionDataHeight.current.getBoundingClientRect().height;
      setTransactionHeight(height);
    }
  }, [userTransactionDataTransactionData]);

  return (
    <div className="wallet_main">
      {openSearchStockFloat ? (
        <div className="wallet_float_search_option">
          <FloatSearchStock />
        </div>
      ) : null}

      <div
        className="wallet_float_search_option_icon"
        onClick={() => {
          setOpenSearchStockFloat((pvr) => !pvr);
        }}
      >
        {openSearchStockFloat ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#FFFFFF"
          >
            <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#FFFFFF"
          >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" />
          </svg>
        )}
      </div>
      <Navbar />
      <div className="wallet_main_handel_flex_bug_in_parent">
        <div className="wallet_main_arrange_width">
          <div className="wallet_main_wallet_card_div">
            <div className="wallet_main_wallet_card_main">
              <div className="wallet_main_wallet_card_main_for_stock_balance">
                <div className="wallet_main_wallet_card_main_for_stock_balance_left">
                  <div id="wallet_main_wallet_card_main_for_stock_balance_left_title">
                    For stocks, F&O
                  </div>
                  <div id="wallet_main_wallet_card_main_for_stock_balance_left_money">
                    <span id="wallet_main_stock_balance_large">
                      ₹{userTransactionDataWalletBalance!==null?userTransactionDataWalletBalance.toString().split('.')[0]:'00'}
                    </span>
                    <span id="wallet_main_stock_balance_small">.{userTransactionDataWalletBalance!==null?userTransactionDataWalletBalance.toString().split('.')[1]:'00'}</span>
                  </div>
                </div>
                <div className="wallet_main_wallet_card_main_for_stock_balance_right">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="wallet_main_wallet_card_main_user_balance">
                <div className="wallet_main_wallet_card_main_user_balance_arrange_width">
                  <span id="wallet_main_wallet_card_main_user_balance_title">
                    User balance
                  </span>
                  <span id="wallet_main_wallet_card_main_user_balance_money_view">
                    ₹{userTransactionDataWalletBalance || 0}
                  </span>
                </div>
              </div>
              <div className="wallet_main_wallet_card_main_all_transaction">
                <div
                  className="wallet_main_wallet_card_main_all_transaction_arrange_width"
                  onClick={() => {
                    setIsTransactionOpen(!isTransactionOpen);
                  }}
                >
                  <span id="wallet_main_wallet_card_main_all_transaction_title">
                    All transactions
                  </span>
                  <span id="wallet_main_wallet_card_main_all_transaction_open">
                    <svg
                      id={isTransactionOpen ? "open_rotate" : "close_rotate"}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </div>
                <div
                  className="wallet_main_wallet_card_main_all_transaction_show_on_open_arrange_width"
                  style={{
                    height: isTransactionOpen
                      ? `${transactionHeight}px`
                      : `${0}px`,
                  }}
                >
                  <div
                    className="wallet_main_wallet_card_main_all_transaction_show_on_open_arrange_width_animation"
                    ref={transactionDataHeight}
                  >
                    <>
                      {
                        userTransactionDataTransactionData.length>0?
                        userTransactionDataTransactionData.map((data,index)=>(
                          <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div"
                            key={index}
                          >
                            <span id="date">{data.date||'Date'} <p>{data.time.split(' ')[0]}</p></span>
                            <span id="money">{ `${data.amount} ₹`||' ₹0'}</span>
                          </div>
                        )):null
                      }

                      {/* <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                        <span id="date">{userWalletTransactionData.transactions[0].date || "17 July 2023"}</span>
                        <span id="money">{userWalletTransactionData.transactions[0].amount || " ₹213"}</span>
                      </div> */}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wallet_main_arrange_width_deposit_money_main">
            <WithDrawAndDeposit />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wallet;
