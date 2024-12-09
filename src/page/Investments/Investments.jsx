import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "./Investments.css";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import ComingSoonWithTitle from "../../component/ComingSoonWithProps/ComingSoonWithProps";
import InvestmentStock from "../InvestmentStock/InvestmentStock";

const Investments = () => {
  // const navigate = useNavigate();
  const [optionActive, setOptionActive] = useState("Investments_stocks");
  

  // make nav bar active section to Investments with give data to local storage
  // useEffect(()=>{
  //   localStorage.setItem('navActiveExploreOrInvestments','Investments')
  // },[])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Investments_main">
      <Navbar callFrom="Investments"/>
      <div className="Investments_option_main_stock_and_mutualFund">
        <div className="Investments_option_main_stock_and_mutualFund_Range_fixed">
          <div
            className="Investments_option_stocks"
            onClick={() => {
              setOptionActive("Investments_stocks");
            }}
          >
            <div className="Investments_option_stocks_title">
              <p
                style={{
                  color: optionActive === "Investments_stocks" ? "#00b5a3" : "#4a4848",
                }}
              >
                Stocks
              </p>
            </div>
            <div
              className="Investments_option_stocks_isActive"
              style={{
                backgroundColor:
                  optionActive === "Investments_stocks" ? "#00b5a3" : "#ffffff",
              }}
            ></div>
          </div>
          <div
            className="Investments_option_mutualFund"
            onClick={() => {
              setOptionActive("Investments_mutualFund");
            }}
          >
            <div className="Investments_option_mutualFund_title">
              <p
                style={{
                  color: optionActive === "Investments_mutualFund" ? "#00b5a3" : "#4a4848",
                }}
              >
                Mutual Fund
              </p>
            </div>
            <div
              className="Investments_option_mutualFund_isActive"
              style={{
                backgroundColor:
                  optionActive === "Investments_mutualFund" ? "#00b5a3" : "#ffffff",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="Investments_main_comp_section">
        {
          optionActive==='Investments_stocks'?<InvestmentStock/>:<ComingSoonWithTitle title={'Investment Mutual Fund'}/>
          // optionActive==='Investments_stocks'?<ComingSoonWithTitle title={'Investment Stock'}/>:<ComingSoonWithTitle title={'Investment Mutual Fund'}/>
        }
      </div>
      <Footer />
    </div>
  );
};

export default Investments;
