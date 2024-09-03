import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "./Wallet.css";
import { useState, useRef, useEffect } from "react";

const Wallet = () => {
  const transactionDataHeight = useRef(0);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionHeight, setTransactionHeight] = useState(0);
  const [paymentDepositOrWithdraw, setPaymentDepositOrWithdraw] =
    useState("deposit");
  const [depositInputMoneyValue, setDepositInputMoneyValue] = useState(0);
  const [withdrawInputMoneyValue, setWithdrawInputMoneyValue] = useState(0);

  useEffect(() => {
    if (transactionDataHeight.current) {
      const height =
        transactionDataHeight.current.getBoundingClientRect().height;
      setTransactionHeight(height);
    }
  }, []);


  return (
    <div className="wallet_main">
      <Navbar />
      <div className="wallet_main_arrange_width">
        <div className="wallet_main_wallet_card_div">
          <div className="wallet_main_wallet_card_main">
            <div className="wallet_main_wallet_card_main_for_stock_balance">
              <div className="wallet_main_wallet_card_main_for_stock_balance_left">
                <div id="wallet_main_wallet_card_main_for_stock_balance_left_title">
                  For stocks, F&O
                </div>
                <div id="wallet_main_wallet_card_main_for_stock_balance_left_money">
                  <span id="wallet_main_stock_balance_large">₹203</span>
                  <span id="wallet_main_stock_balance_small">.00</span>
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
                  ₹203.00
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
                    <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                      <span id="date">17 July 2023</span>
                      <span id="money">+ ₹213</span>
                    </div>
                    <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                      <span id="date">27 July 2023</span>
                      <span id="money">- ₹103</span>
                    </div>
                    <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                      <span id="date">1 aug 2023</span>
                      <span id="money">+ ₹4213</span>
                    </div>
                    <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                      <span id="date">15 aug 2023</span>
                      <span id="money">+ ₹5513</span>
                    </div>
                    <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                      <span id="date">27 sep 2023</span>
                      <span id="money">+ ₹513</span>
                    </div>
                    <div className="wallet_main_wallet_card_main_all_transaction_show_on_open_div">
                      <span id="date">24 des 2023</span>
                      <span id="money">- ₹2113</span>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wallet_main_arrange_width_deposit_money_main">
          <div className="wallet_main_arrange_width_deposit_money_main_top">
            <div className="wallet_main_arrange_width_deposit_money_main_top_arrange_width">
              <div className="wallet_main_arrange_width_deposit_money_main_top_title">
                <span
                  id="wallet_main_money_main_top_title_deposit"
                  style={{
                    color:
                      paymentDepositOrWithdraw === "deposit" ? "#00b386" : null,
                  }}
                  onClick={() => {
                    setPaymentDepositOrWithdraw("deposit");
                  }}
                >
                  DEPOSIT
                </span>
                <span
                  id="wallet_main_money_main_top_title_withdraw"
                  style={{
                    color:
                      paymentDepositOrWithdraw === "withdraw"
                        ? "#eb5b3c"
                        : null,
                  }}
                  onClick={() => {
                    setPaymentDepositOrWithdraw("withdraw");
                  }}
                >
                  WITHDRAW
                </span>
              </div>
              <div className="wallet_main_arrange_width_deposit_money_main_top_animation_scroll">
                <span
                  className="animation_move_payment_option"
                  id={
                    paymentDepositOrWithdraw === "deposit"
                      ? "move_to_option_deposit"
                      : "move_to_option_withdraw"
                  }
                ></span>
              </div>
            </div>
          </div>
          <div className="wallet_main_arrange_width_deposit_money_main_bottom">
            {
              paymentDepositOrWithdraw==='deposit'?
              <div className="wallet_main_arrange_width_deposit_money_main_bottom_arrange_width">
                
                <div className="wallet_main_arrange_width_deposit_money_main_bottom_deposit_enter_amount_main">
                  <div className="wallet_main_arrange_width_deposit_money_main_bottom_deposit_enter_amount_title_box">
                    <span>Enter Amount</span>
                  </div>
                  <div className="wallet_main_arrange_width_deposit_money_main_bottom_deposit_enter_amount_input_box">
                    <input
                      type="number"
                      value={depositInputMoneyValue}
                      onChange={(e) => {
                        setDepositInputMoneyValue(
                          e.target.value < 0 ? 0 : e.target.value
                        );
                      }}
                    />
                    <span>₹</span>
                  </div>
                </div>
                <div className="wallet_main_arrange_width_deposit_money_main_bottom_add_money_pp_option">
                  <button id="wallet_main_arrange_width_deposit_money_main_bottom_add_money_pp_option_100" onClick={()=>{setDepositInputMoneyValue((pvr)=>pvr+100)}}>+100</button>
                  <button id="wallet_main_arrange_width_deposit_money_main_bottom_add_money_pp_option_500" onClick={()=>{setDepositInputMoneyValue((pvr)=>pvr+500)}}>+500</button>
                </div>
                <div className="wallet_main_arrange_width_deposit_money_main_bottom_deposit_button_main_div">
                  <button id="wallet_main_arrange_width_deposit_money_main_bottom_deposit_button">
                    DEPOSIT MONEY
                  </button>
                </div>
              </div>
              :
              <div className="wallet_main_arrange_width_withdraw_money_main_bottom_arrange_width">
                <div className="wallet_main_arrange_width_deposit_money_main_bottom_withdrawable_or_not">
                  <span id="wallet_main_arrange_width_deposit_money_main_bottom_withdrawable_title">Withdrawable</span>
                  <span id="wallet_main_arrange_width_deposit_money_main_bottom_withdrawable_money">₹203.00</span>
                </div>
                <div className="wallet_main_arrange_width_withdraw_money_main_bottom_deposit_enter_amount_main">
                  <div className="wallet_main_arrange_width_withdraw_money_main_bottom_deposit_enter_amount_title_box">
                    <span>Enter Amount</span>
                  </div>
                  <div className="wallet_main_arrange_width_withdraw_money_main_bottom_deposit_enter_amount_input_box">
                    <input
                      type="number"
                      value={withdrawInputMoneyValue}
                      onChange={(e) => {
                        setWithdrawInputMoneyValue(
                          e.target.value < 0 ? 0 : e.target.value
                        );
                      }}
                    />
                    <span>₹</span>
                  </div>
                </div>
                <div className="wallet_main_arrange_width_withdraw_money_main_bottom_add_money_pp_option">
                  <button id="wallet_main_arrange_width_withdraw_money_main_bottom_add_money_pp_option_100" onClick={()=>{setWithdrawInputMoneyValue((pvr)=>pvr+100)}}>+100</button>
                  <button id="wallet_main_arrange_width_withdraw_money_main_bottom_add_money_pp_option_500" onClick={()=>{setWithdrawInputMoneyValue((pvr)=>pvr+500)}}>+500</button>
                </div>
                <div className="wallet_main_arrange_width_withdraw_money_main_bottom_deposit_button_main_div">
                  <button id="wallet_main_arrange_width_withdraw_money_main_bottom_deposit_button">
                    WITHDRAW MONEY
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wallet;
