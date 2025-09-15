import "./WithDrawAndDeposit.css";
import { useState } from "react";
import { selectUserProfileData } from "../../features/userProfileData/centralExportUserProfileData";
import { useSelector, useDispatch } from "react-redux";
import { fireTheMessagePopUp } from "../../features/msgPopUpHandel/msgPopUpHandelSlice";
import {
  fetchUserTransactionDataThunk,
  selectorUserTransactionWalletBalance,
} from "../../features/api_lab/userTransactionData/centralExportUserTransactionData";
import Loader from "../LoaderComponent/Loader";

const WithDrawAndDeposit = () => {
  const dispatch = useDispatch();
  const [paymentDepositOrWithdraw, setPaymentDepositOrWithdraw] =
    useState("deposit");
  const [withdrawInputMoneyValue, setWithdrawInputMoneyValue] = useState(0);
  const [depositInputMoneyValue, setDepositInputMoneyValue] = useState(0);
  const userProfileData = useSelector(selectUserProfileData);
  const userTransactionDataWalletBalance = useSelector(
    selectorUserTransactionWalletBalance
  );
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [showStepToAddMoney, setShowStepToAddMoney] = useState(false);

  // load the razor pay script for open checkout page
  const loadThirdPartyScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const onDepositMoney = async (amount) => {
    try {
      setIsLoaderActive(true);
      const data = {
        amount,
      };
      const apiOfCreateOrder = "http://localhost:8080/api/payment/createOrder";
      const response = await fetch(apiOfCreateOrder, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (!response.ok) {
        console.log("response is not ok");
        setIsLoaderActive(false);
      }

      if (response.status === 200) {
        const options = {
          key: "rzp_test_Uao617m4gCB6un",
          order_id: resData.id,
          ...resData,
          handler: async (response) => {
            const optionForVerifyPayment = {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount,
              email: userProfileData.userEmail,
            };
            const verifyPaymentAPI =
              "http://localhost:8080/api/payment/verifySignature";
            await fetch(verifyPaymentAPI, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(optionForVerifyPayment),
            })
              .then(async (response) => {
                if (!response.ok) {
                  console.log(
                    "response is not ok , while verify payment",
                    response
                  );
                  return;
                }

                if (response.status === 200) {
                  const dataOfSuccess = await response.json();
                  if (dataOfSuccess.success) {
                    dispatch(
                      fireTheMessagePopUp({
                        messageShow: `₹ ${amount} successfully add to your groww account`,
                        positiveResponse: true,
                        makeFire: true,
                      })
                    );
                    dispatch(
                      fetchUserTransactionDataThunk(userProfileData.userEmail)
                    );
                    setIsLoaderActive(false);
                  }
                } else if (response.status === 402) {
                  dispatch(
                    fireTheMessagePopUp({
                      messageShow: `Transaction filed, any issue ? report us :)`,
                      positiveResponse: false,
                      makeFire: true,
                    })
                  );
                  setIsLoaderActive(false);
                } else {
                  dispatch(
                    fireTheMessagePopUp({
                      messageShow: `Fail to transfer money`,
                      positiveResponse: false,
                      makeFire: true,
                    })
                  );
                  setIsLoaderActive(false);
                }
              })
              .catch((err) => {
                dispatch(
                  fireTheMessagePopUp({
                    messageShow: `Something went wrong , transaction failed`,
                    positiveResponse: false,
                    makeFire: true,
                  })
                );
                setIsLoaderActive(false);
              });
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
      setIsLoaderActive(false);
    } catch (error) {
      console.log("error on deposit mony", error);
    }
  };

  const verifyAmountAndCallDepositMony = () => {
    if (depositInputMoneyValue <= 0) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: `amount must be more than or equal to ₹1 `,
          positiveResponse: false,
          makeFire: true,
        })
      );
      setDepositInputMoneyValue(0);
    } else if (depositInputMoneyValue > 10_000) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: `You can not deposit more than 10K at one time`,
          positiveResponse: false,
          makeFire: true,
        })
      );
      setDepositInputMoneyValue(0);
    } else {
      loadThirdPartyScript("https://checkout.razorpay.com/v1/checkout.js");
      onDepositMoney(depositInputMoneyValue);
      setDepositInputMoneyValue(0);
    }
  };

  const onWithDrawMoney = async () => {
    try {
      setIsLoaderActive(true);
      const localStorageToken = localStorage.getItem("token");
      const withdrawMoneyAPi =
        "http://localhost:8080/api/payment/withdrawUserAmount";
      const data = {
        email: userProfileData.userEmail,
        amount: withdrawInputMoneyValue,
      };
      const response = await fetch(withdrawMoneyAPi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        dispatch(
          fireTheMessagePopUp({
            messageShow: `Server error make sure you are online`,
            positiveResponse: false,
            makeFire: true,
          })
        );
        console.log("response not ok while withDraw");
        setIsLoaderActive(false);
        return;
      }

      if (response.status === 200) {
        dispatch(
          fireTheMessagePopUp({
            messageShow: `₹${withdrawInputMoneyValue} successfully withdraw from your groww account`,
            positiveResponse: true,
            makeFire: true,
          })
        );
        dispatch(fetchUserTransactionDataThunk(userProfileData.userEmail));
        setWithdrawInputMoneyValue(0);
      } else {
        dispatch(
          fireTheMessagePopUp({
            messageShow: `server error , report us please`,
            positiveResponse: false,
            makeFire: true,
          })
        );
      }
      setIsLoaderActive(false);
    } catch (error) {
      console.log("error while withdraw amount");
      setIsLoaderActive(false);
    }
  };

  const verifyOnWithDrawAmountInput = () => {
    if (withdrawInputMoneyValue > userTransactionDataWalletBalance) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: `You don't have sufficient balance to withdraw ₹ ${withdrawInputMoneyValue}`,
          positiveResponse: false,
          makeFire: true,
        })
      );
      setWithdrawInputMoneyValue(0);
    } else if (withdrawInputMoneyValue <= 0) {
      dispatch(
        fireTheMessagePopUp({
          messageShow: `You can not withDraw rupees ${withdrawInputMoneyValue}`,
          positiveResponse: false,
          makeFire: true,
        })
      );
      setWithdrawInputMoneyValue(0);
    } else {
      onWithDrawMoney();
    }
  };
  // useEffect(()=>{
  //   loadThirdPartyScript('https://checkout.razorpay.com/v1/checkout.js');
  // },[])

  const handelToCopyClipBoard = ()=>{
    const textToCopy = document.getElementById('withdraw_and_deposit_copy_to_clipBoard_text').innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        dispatch(
          fireTheMessagePopUp({
            messageShow: `Fake Cred Number Copy Successfully`,
            positiveResponse: true,
            makeFire: true,
          })
        );  
      })
      .catch((err) => {
        dispatch(
          fireTheMessagePopUp({
            messageShow: `Fail TO Copy Card Number`,
            positiveResponse: true,
            makeFire: true,
          })
        );
      });
  }

  return (
    <div className="withDrawAndDeposit_main">
      <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_top">
        <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_top_arrange_width">
          <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_top_title">
            <span
              id="withDrawAndDeposit_main_money_main_top_title_deposit"
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
              id="withDrawAndDeposit_main_money_main_top_title_withdraw"
              style={{
                color:
                  paymentDepositOrWithdraw === "withdraw" ? "#eb5b3c" : null,
              }}
              onClick={() => {
                setPaymentDepositOrWithdraw("withdraw");
              }}
            >
              WITHDRAW
            </span>
          </div>
          <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_top_animation_scroll">
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
      <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom">
        {paymentDepositOrWithdraw === "deposit" ? (
          <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_arrange_width">
            <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_deposit_enter_amount_main">
              <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_deposit_enter_amount_title_box">
                <span>Enter Amount</span>
              </div>
              <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_deposit_enter_amount_input_box">
                <input
                  type="number"
                  value={depositInputMoneyValue}
                  onChange={(e) => {
                    setDepositInputMoneyValue(
                      +(e.target.value < 0 ? 0 : e.target.value)
                    );
                  }}
                />
                <span>₹</span>
              </div>
            </div>
            <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_add_money_pp_option">
              <button
                id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_add_money_pp_option_100"
                onClick={() => {
                  setDepositInputMoneyValue((pvr) => pvr + 100);
                }}
              >
                +100
              </button>
              <button
                id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_add_money_pp_option_500"
                onClick={() => {
                  setDepositInputMoneyValue((pvr) => pvr + 500);
                }}
              >
                +500
              </button>
            </div>
            <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info"
              style={{height:showStepToAddMoney?'255px':'140px'}}
            >
              <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_top">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40px"
                  viewBox="0 -960 960 960"
                  width="40px"
                  fill="#e0e0e0"
                >
                  <path d="M860-707.69v455.38Q860-222 839-201q-21 21-51.31 21H172.31Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31Zm-700 83.85h640v-83.85q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v83.85Zm0 127.68v243.85q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-243.85H160ZM160-240v-480 480Z" />
                </svg>
                <div id="withdraw_and_deposit_copy_to_clipBoard_text">
                  4718 6091 0820 4366
                </div>
                <button id="withdraw_and_deposit_copy_to_clipBoard_btn"
                  onClick={handelToCopyClipBoard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#459f8daf"
                  >
                    <path d="M362.31-260Q332-260 311-281q-21-21-21-51.31v-455.38Q290-818 311-839q21-21 51.31-21h335.38Q728-860 749-839q21 21 21 51.31v455.38Q770-302 749-281q-21 21-51.31 21H362.31Zm0-60h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-140 200Q192-120 171-141q-21-21-21-51.31v-515.38h60v515.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h395.38v60H222.31ZM350-320v-480 480Z" />
                  </svg>
                </button>
              </div>
              <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom">
                <p>Note : copy above card number for fake payment</p>
                <p
                  id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_highlight"
                  onClick={() => setShowStepToAddMoney(!showStepToAddMoney)}
                >
                  STEP'S TO ADD MONEY
                  {showStepToAddMoney ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#CCCCCC"
                    >
                      <path d="M303.85-410 480-586.15 656.15-410h-352.3Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#CCCCCC"
                    >
                      <path d="M480-373.85 303.85-550h352.3L480-373.85Z" />
                    </svg>
                  )}
                </p>
                {showStepToAddMoney ? (
                  <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_open_step_guid">
                    <p id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_deepLight">
                      Step 0 : Past your copy card num..
                    </p>
                    <p id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_deepLight">
                      Step 1 : Enter any future fake date.
                    </p>
                    <p id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_deepLight">
                      Step 2 : Random 3 digit CVV num.
                    </p>
                    <p id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_deepLight">
                      Step 3 : Any 10 digit fake number..
                    </p>
                    <p id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_deepLight">
                      Step 4 : Click on skip OTP options.
                    </p>
                    <p id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_card_info_bottom_deepLight">
                      Step 5 : Any random 4 digits OTP..
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_deposit_button_main_div">
              {isLoaderActive ? (
                <div id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_deposit_button_loader">
                  <Loader />
                </div>
              ) : (
                <button
                  id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_deposit_button"
                  onClick={verifyAmountAndCallDepositMony}
                >
                  DEPOSIT MONEY
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_arrange_width">
            <div className="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_withdrawable_or_not">
              <span id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_withdrawable_title">
                Withdrawable
              </span>
              <span id="withDrawAndDeposit_main_arrange_width_deposit_money_main_bottom_withdrawable_money">
                ₹{userTransactionDataWalletBalance || 0}
              </span>
            </div>
            <div className="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_enter_amount_main">
              <div className="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_enter_amount_title_box">
                <span>Enter Amount</span>
              </div>
              <div className="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_enter_amount_input_box">
                <input
                  type="number"
                  value={withdrawInputMoneyValue}
                  onChange={(e) => {
                    setWithdrawInputMoneyValue(
                      +(e.target.value < 0 ? 0 : e.target.value)
                    );
                  }}
                />
                <span>₹</span>
              </div>
            </div>
            <div className="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_add_money_pp_option">
              <button
                id="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_add_money_pp_option_100"
                onClick={() => {
                  setWithdrawInputMoneyValue((pvr) => pvr + 100);
                }}
              >
                +100
              </button>
              <button
                id="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_add_money_pp_option_500"
                onClick={() => {
                  setWithdrawInputMoneyValue((pvr) => pvr + 500);
                }}
              >
                +500
              </button>
            </div>
            <div className="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_button_main_div">
              {isLoaderActive ? (
                <div id="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_button_loader">
                  <Loader />
                </div>
              ) : (
                <button
                  id="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_button"
                  onClick={verifyOnWithDrawAmountInput}
                >
                  WITHDRAW MONEY
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithDrawAndDeposit;
