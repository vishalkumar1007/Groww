import { useState,useEffect } from "react";
import "./StockIndex.css";

const StockIndex = ({title,valueNo,valuePercentage}) => {

  const [isValuePercentage , setIsValuePercentage] = useState(false);
  const [exactCost , setExactCost] = useState('');
  const [costPerRate , setCostPerRate] = useState('');
  const [costPerPercent , setCostPerPercent] = useState('');

  useEffect(()=>{
      if(valuePercentage.length>0){
          for (const element of valuePercentage) {
              if(element==='-'){
                setIsValuePercentage(true);
                  break;
              }else{
                setIsValuePercentage(false);
              }
          }
      }
  },[valuePercentage]);

  useEffect(()=>{
    const interval = setInterval(()=>{

      const decimalControl = 100;
      const randomExactCost = Math.floor(Math.random() * 1000_000)/decimalControl;
      const randomCostPerRate = Math.floor(Math.random() * 100_000)/decimalControl;
      const randomCostPerPercent = Math.floor(Math.random() * 100)/decimalControl;
      
      setExactCost(randomExactCost);
      setCostPerRate(randomCostPerRate);
      setCostPerPercent(randomCostPerPercent);
    },[1500]);

    return ()=> clearInterval(interval);

  },[exactCost])


  return (
    <div className="comp_stocks_index_main">
      <div className="comp_stocks_index_main_left">
        <div className="comp_stocks_index_main_left_title">
          <p> {title || 'Index Title'} </p>
        </div>
        <div className="comp_stocks_index_main_left_value">
          <div className="comp_stocks_index_main_left_value_number">
            <span>{exactCost || '00,000.00'}</span>
          </div>
          <div className="comp_stocks_index_main_left_value_percent">
            <span style={{color:isValuePercentage?'#EB5B3C':(valuePercentage===''?'#4a4a4a':'#00B386')}}>{`${isValuePercentage?'-':''} ${costPerRate} (${costPerPercent}%)` || '0.00 (0.00%)'}</span>
          </div>
        </div>
      </div>
      <div className="comp_stocks_index_main_right">
        <div className="comp_stocks_three_dot_main_cursor">
          <div className="comp_stocks_three_dot_main">
            <div className="comp_stocks_dot"></div>
            <div className="comp_stocks_dot"></div>
            <div className="comp_stocks_dot"></div>
          </div>
          <div className="comp_stocks_index_main_right_more_option_main">
            <div className="comp_stocks_index_main_right_more_option">
              <div className="comp_stocks_index_main_right_more_option_chain">
                <span id="icon_more_option">
                  <svg
                    id="option_chain_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4c4c4c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                    <line x1="8" x2="16" y1="12" y2="12" />
                  </svg>
                </span>
                <span id="title_more_option">Option chain</span>
              </div>
              <div className="comp_stocks_index_main_right_more_option_terminal">
                <span id="icon_more_option">
                  <svg
                    id="terminal_svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 -5 24 24"
                    fill="#4c4c4c"
                    stroke="#4c4c4c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 5v4" />
                    <rect width="4" height="6" x="7" y="9" rx="1" />
                    <path d="M9 15v4" />
                    <path d="M17 3v4" />
                    <rect width="4" height="8" x="15" y="5" rx="1" />
                    <path d="M17 13v4" />
                  </svg>
                </span>
                <span id="title_more_option">Terminal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockIndex;
