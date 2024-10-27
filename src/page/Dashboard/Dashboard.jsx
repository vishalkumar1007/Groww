import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Stocks from "../Stocks/Stocks";
import MutualFund from "../MutualFund/MutualFund";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   deleteAllWatchlistData,
//   selectUserWatchlistValue,
// } from "../../features/userWatchlist/centralExportUserWatchlist";
// import {
//   deleteAllCartData,
//   selectUserCartValue,
// } from "../../features/userCart/centralExportUserCart";
// import {
//   deleteUserProfileDetail,
//   selectUserProfileData,
// } from "../../features/userProfileData/centralExportUserProfileData";
// import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const [optionActive, setOptionActive] = useState("stocks");

  // const userWatchlistApiData = useSelector(selectUserWatchlistValue);
  // const userProfileData = useSelector(selectUserProfileData);

  // const saveDataBeforeUnload = async () => {
  //   if (!(userProfileData.userEmail && userWatchlistApiData)) {
  //     return;
  //   }
  //   const watchListData = {
  //     email: userProfileData.userEmail,
  //     userWatchlistData: [...userWatchlistApiData],
  //   };
  //   // localStorage.setItem('callToAPiEmail',watchListData.userProfileData.email)
  //   // localStorage.setItem('userWatchlistApiData--name',watchListData.userWatchlistData[0].name)
  //   // console.log('userWatchlistApiData',watchListData)

  //   const userWatchlistPushApi =
  //     "http://localhost:8080/api/user/updateUserWatchlist";
  //   fetch(userWatchlistPushApi, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(watchListData),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         localStorage.setItem(
  //           "WatchlistDataSaveStatus",
  //           "Failed: Response not ok"
  //         );
  //         return;
  //       }

  //       // Save status based on the response status code
  //       if (response.status === 200) {
  //         localStorage.setItem("WatchlistDataSaveStatus", "Saved successfully");
  //       } else {
  //         localStorage.setItem(
  //           "WatchlistDataSaveStatus",
  //           "Error: Server issue"
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       localStorage.setItem(
  //         "WatchlistDataSaveStatus",
  //         "Error: Network issue 2"
  //       );
  //     });
  //   console.log(userProfileData)
  // };

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      const api = "http://localhost:8080/api/user/verify/token";

      fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            console.log("response is not ok");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("Error on fetching auto login", err);
        });
    }
  }, [navigate]);

  // const xUserWatchlistData = useSelector(selectUserWatchlistValue);
  // const xUserCartData = useSelector(selectUserCartValue);
  // const xUserProfileData = useSelector(selectUserProfileData);
  // useEffect(()=>{
  //   console.log('D_xUserWatchlistData : ', xUserWatchlistData);
  //   console.log('D_xUserCartData : ', xUserCartData);
  //   console.log('D_xUserProfileData : ', xUserProfileData);
  // },[xUserCartData, xUserProfileData, xUserWatchlistData])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Dashboard_main">
      <Navbar callFrom="Dashboard" />
      <div className="option_main_stock_and_mutualFund">
        <div className="option_main_stock_and_mutualFund_Range_fixed">
          <div
            className="option_stocks"
            onClick={() => {
              setOptionActive("stocks");
              // saveDataBeforeUnload();
            }}
          >
            <div className="option_stocks_title">
              <p
                style={{
                  color: optionActive === "stocks" ? "#00b5a3" : "#4a4848",
                }}
              >
                Stocks
              </p>
            </div>
            <div
              className="option_stocks_isActive"
              style={{
                backgroundColor:
                  optionActive === "stocks" ? "#00b5a3" : "#ffffff",
              }}
            ></div>
          </div>
          <div
            className="option_mutualFund"
            onClick={() => {
              setOptionActive("mutualFund");
            }}
          >
            <div className="option_mutualFund_title">
              <p
                style={{
                  color: optionActive === "mutualFund" ? "#00b5a3" : "#4a4848",
                }}
              >
                Mutual Fund
              </p>
            </div>
            <div
              className="option_mutualFund_isActive"
              style={{
                backgroundColor:
                  optionActive === "mutualFund" ? "#00b5a3" : "#ffffff",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="dashboard_main">
        {optionActive === "stocks" ? <Stocks /> : <MutualFund />}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
