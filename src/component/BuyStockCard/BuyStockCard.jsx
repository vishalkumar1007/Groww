import "./BuyStockCard.css";
import { useState } from "react";

const BuyStockCard = ({ companyName, cost, costPerRate }) => {
  const [isBuyOption, setIsBuyOption] = useState("buy");
  const [userInputQytValue, setUserInputQytValue] = useState(0);
  const [userInputPriceValue, setUserInputPriceValue] = useState(0);
  return (
    <div className="buy_stock_card_main">
      <div className="buy_stock_card_main_title_head">
        <div className="buy_stock_card_main_title_head_arrange_width">
          <span id="buy_stock_card_company_name">
            {companyName || "Company Name"}
          </span>
          <span id="buy_stock_card_nse_and_bse">
            NSE ₹{cost || "000.00"} ~ BSE ₹{costPerRate || "000.00 (0.00%)"}
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
              <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_box">
                <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_quality_main">
                  <span id="buy_stock_card_inputs_quality_title">Qty NSE</span>
                  <input
                    id="buy_stock_card_inputs_quality_input"
                    type="number"
                    min="0"
                    value={userInputQytValue}
                    onChange={(e) => {
                      setUserInputQytValue(
                        e.target.value === "" ? 0 : e.target.value
                      );
                    }}
                  />
                </div>
                <div className="buy_stock_card_main_buy_and_sell_chose_top_inputs_price_main">
                  <span id="buy_stock_card_inputs_price_title">
                    Price Limit
                  </span>
                  <input
                    id="buy_stock_card_inputs_price_input"
                    type="number"
                    min="0"
                    value={userInputPriceValue}
                    onChange={(e) => {
                      setUserInputPriceValue(
                        e.target.value === "" ? 0 : e.target.value
                      );
                    }}
                  />
                </div>
              </div>
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
                    Balance : ₹0
                  </span>
                  <span id="buy_stock_card_main_buy_and_sell_chose_bottom_cost_text_approx">
                    Approx req : ₹0
                  </span>
                </div>
                <div className="buy_stock_card_main_buy_and_sell_chose_bottom_button_box">
                  {isBuyOption === "buy" ? (
                    <button id="buy_stock_card_main_buy_btn">BUY</button>
                  ) : (
                    <button id="buy_stock_card_main_sell_btn">SELL</button>
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
