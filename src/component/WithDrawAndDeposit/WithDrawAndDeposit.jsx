import "./WithDrawAndDeposit.css";
import { useEffect, useState } from "react";
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
  const [isLoaderActive , setIsLoaderActive] = useState(false);

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
                    setIsLoaderActive(false)
                  }
                } else if (response.status === 402) {
                  dispatch(
                    fireTheMessagePopUp({
                      messageShow: `Transaction filed, any issue ? report us :)`,
                      positiveResponse: false,
                      makeFire: true,
                    })
                  );
                  setIsLoaderActive(false)
                } else {
                  dispatch(
                    fireTheMessagePopUp({
                      messageShow: `Fail to transfer money`,
                      positiveResponse: false,
                      makeFire: true,
                    })
                  );
                  setIsLoaderActive(false)
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
                setIsLoaderActive(false)
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
      setIsLoaderActive(false)
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
                ₹{userTransactionDataWalletBalance || 0}.00
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
              {
                isLoaderActive?
                <div id="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_button_loader">
                  <Loader />
                </div>
                :<button
                id="withDrawAndDeposit_main_arrange_width_withdraw_money_main_bottom_deposit_button"
                onClick={verifyOnWithDrawAmountInput}
              >
                WITHDRAW MONEY
              </button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithDrawAndDeposit;
