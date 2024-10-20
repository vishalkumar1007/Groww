import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Stocks from "../Stocks/Stocks";
import MutualFund from "../MutualFund/MutualFund";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [optionActive, setOptionActive] = useState("stocks");

  // make nav bar active section to dashboard with give data to local storage
  // useEffect(()=>{
  //   localStorage.setItem('navActiveExploreOrInvestments','Explore')
  // },[])

  useEffect(()=>{
    const localStorageToken = localStorage.getItem('token');
    if(localStorageToken){
      const api = 'http://localhost:8080/api/user/verify/token';
  
      fetch(api , {
        method:'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorageToken}`
        }
      })
      .then(async (response)=>{
        if(!response.ok){
          console.log('response is not ok');
          navigate('/');
        }
      })
      .catch((err)=>{
        console.log('Error on fetching auto login' , err);
      })

    }

  },[navigate])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Dashboard_main">
      <Navbar callFrom = 'Dashboard'/>
      <div className="option_main_stock_and_mutualFund">
        <div className="option_main_stock_and_mutualFund_Range_fixed">
          <div
            className="option_stocks"
            onClick={() => {
              setOptionActive("stocks");
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
