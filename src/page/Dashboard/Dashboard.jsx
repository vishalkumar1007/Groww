import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Stocks from "../Stocks/Stocks";
import MutualFund from "../MutualFund/MutualFund";
import FloatSearchStock from "../../component/FloatSearchStock/FloatSearchStock";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {updatePageRouteStalk,
  increaseDashboardVisitCount,
  selectorDashboardVisitCount,
} from '../../features/pageRouteStalk/centralExportPageRouteStalk'
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [optionActive, setOptionActive] = useState("stocks");
  const [openSearchStockFloat, setOpenSearchStockFloat] = useState(false);
  const [screenWidth , setScreenWidth] = useState(0);
  const dashboardVisitCount = useSelector(selectorDashboardVisitCount);

  useEffect(()=>{
    if(dashboardVisitCount===0){
      dispatch(increaseDashboardVisitCount(1))
      dispatch(updatePageRouteStalk('dashboard'))
    }
  },[dashboardVisitCount, dispatch])

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      const api = "https://groww-backend-omega.vercel.app/api/user/verify/token";

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

  useEffect(()=>{
    const getScreenWidth = ()=>{
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize',getScreenWidth);
    return ()=> window.removeEventListener('resize',getScreenWidth);
  },[])


  useEffect(() => {
    window.scrollTo(0, 0);  
  }, []);

  return (
    <div className="Dashboard_main" style={{overflowY :openSearchStockFloat && screenWidth<=500?'hidden':'scroll'}}>
      {openSearchStockFloat ? (
        <div className="dashboard_float_search_option">
          <FloatSearchStock />
        </div>
      ) : null}

      <div
        className="dashboard_float_search_option_icon"
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
