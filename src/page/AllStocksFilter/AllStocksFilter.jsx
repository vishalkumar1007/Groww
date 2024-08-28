import { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import SelectCategory from '../../AllStockFilterComponents/SelectCategory/SelectCategory';

import "./AllStocksFilter.css";



const AllStocksFilter = () => {

  const[isActiveSector , setIsActiveSector] = useState(false);
  const[isActiveIndex , setIsActiveIndex] = useState(false);
  const[isActiveMarketCap , setIsActiveMarketCap] = useState(false);
  const[isActiveSClosePrice , setIsActiveClosePrice] = useState(false);
  // ....................... 
  const [marketCapUserInputStartValue , setMarketCapUserInputStartValue] = useState(0);
  const [marketCapUserInputEndValue , setMarketCapUserInputEndValue] = useState(100);
  const [activeMarketCapRangeBtn , setActiveMarketCapRangeBtn] = useState('small');

  return (
    <div className="all_stock_main">
      <Navbar />
      {/* ...............  */}

      <div className="all_stock_main_container">
        <div className="all_stock__main_container_arrange_width">
          <div className="all_stock_head_container">
            <p id="all_stock_head_container_title">All Stocks</p>
          </div>
          <div className="all_stock_filter_and_stock_list_container">
            <div className="all_stock_filter_container">
              <div className="all_stock_filter_container_main">
                <div className="all_stock_filter_container_main_head">
                  <div className="all_stock_filter_container_main_head_arrange_width">
                    <span id="all_stock_filter_container_main_head_title">
                      FILTERS
                    </span>
                    <span id="all_stock_filter_container_main_clear_all">
                      CLEAR ALL
                    </span>
                  </div>
                </div>

                {/* ..................  */}
                
                <div className="all_stock_filter_container_main_sector">
                  <div className="all_stock_filter_container_main_sector_arrange_width">
                    <div className="all_stock_filter_container_main_sector_head" onClick={()=>{setIsActiveSector(!isActiveSector)}}>
                      <span id="all_stock_filter_container_main_sector_head_title">
                        Sectors
                      </span>
                      <span id="all_stock_filter_container_main_sector_head_toggle_arrow">
                        <svg
                          id={isActiveSector?"svg_rotate_on_open":"svg_rotate_on_close"}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_sector_hidden_box" id={isActiveSector?"asf_sector_hidden_box":null}>
                    
                    <div className="all_stock_filter_container_main_sector_hidden_box_arrange_height">
                      <SelectCategory title="Agricultural"/>
                      <SelectCategory title="Apparel & Accessories"/>
                      <SelectCategory title="Automobile & Ancillaries"/>
                      <SelectCategory title="Banking"/>
                      <SelectCategory title="Consumer Durables"/>
                      <SelectCategory title="Derived Materials"/>
                      <SelectCategory title="Energy"/>
                      <SelectCategory title="Financial"/>
                      <SelectCategory title="FMGC"/>
                      <SelectCategory title="Healthcare"/>
                      <SelectCategory title="Hospitality & Travel"/>
                      <SelectCategory title="Industrial Products"/>
                      <SelectCategory title="Industries"/>
                      <SelectCategory title="IT Industry"/>
                      <SelectCategory title="Logistics & Freight"/>
                      <SelectCategory title="Media & Entertainment"/>
                      <SelectCategory title="Others"/>
                      <SelectCategory title="Raw Material"/>
                      <SelectCategory title="Tele-Communication"/>
                      <SelectCategory title="Textile Industry"/>

                    </div>
                    </div>
                  </div>
                </div>

                {/* ..................  */}
                
                <div className="all_stock_filter_container_main_index">
                  <div className="all_stock_filter_container_main_index_arrange_width">
                    <div className="all_stock_filter_container_main_index_head" onClick={()=>{setIsActiveIndex(!isActiveIndex)}}>
                      <span id="all_stock_filter_container_main_index_head_title">
                        Index
                      </span>
                      <span id="all_stock_filter_container_main_index_head_toggle_arrow">
                        <svg
                          id={isActiveIndex?"svg_rotate_on_open":"svg_rotate_on_close"}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_index_hidden_box"  id={isActiveIndex?"asf_index_hidden_box":null}>
                      <SelectCategory title="Nifty Bank"/>
                      <SelectCategory title="Nifty Bank 50"/>
                      <SelectCategory title="Nifty Midcap 100"/>
                      <SelectCategory title="SENSEX"/>
                      <SelectCategory title="Nifty 50"/>
                      <SelectCategory title="Nifty 100"/>
                      <SelectCategory title="BSE 100"/>
                    </div>
                  </div>
                </div>

                {/* ..................  */}
                
                <div className="all_stock_filter_container_main_market_cap">
                  <div className="all_stock_filter_container_main_market_cap_arrange_width">
                    <div className="all_stock_filter_container_main_market_cap_head" onClick={()=>{setIsActiveMarketCap(!isActiveMarketCap)}}>
                      <span id="all_stock_filter_container_main_market_cap_head_title">
                        Market Cap (cr)
                      </span>
                      <span id="all_stock_filter_container_main_market_cap_head_toggle_arrow">
                        <svg
                          id={isActiveMarketCap?"svg_rotate_on_open":"svg_rotate_on_close"}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_market_cap_hidden_box" id={isActiveMarketCap?"asf_market_cap_hidden_box":null}>
                      <div className="all_stock_filter_container_main_market_cap_hidden_box_content">
                        <div className="all_stock_filter_container_main_market_cap_hidden_box_content_range">

                        </div>
                        <div className="all_stock_filter_container_main_market_cap_hidden_box_content_input">
                            <input id="all_stock_filter_market_cap_hidden_box_content_input_start"  type="number" min="0" value={marketCapUserInputStartValue} onChange={(e)=>{setMarketCapUserInputStartValue(e.target.value===''?0:e.target.value)}}/>
                            <span id="all_stock_filter_market_cap_hidden_box_content_input_to">to</span>
                            <input id="all_stock_filter_market_cap_hidden_box_content_input_end"  type="number" min="0" value={marketCapUserInputEndValue}  onChange={(e)=>{setMarketCapUserInputEndValue(e.target.value===''?0:e.target.value)}}/>
                        </div>
                        <div className="all_stock_filter_container_main_market_cap_hidden_box_content_btn">
                            <div id="all_stock_filter_container_main_market_cap_hidden_box_content_btn_small" >
                              <button id={activeMarketCapRangeBtn==='small'?"market_cap_active_range_btn":null} className="all_stock_filter_cap_hidden_box_content_btn_small_btn" onClick={()=>{setActiveMarketCapRangeBtn('small')}}>Small</button>
                            </div>
                            <div id="all_stock_filter_container_main_market_cap_hidden_box_content_btn_mid">
                              <button id={activeMarketCapRangeBtn==='mid'?"market_cap_active_range_btn":null} className="all_stock_filter_cap_hidden_box_content_btn_mid_btn" onClick={()=>{setActiveMarketCapRangeBtn('mid')}}>Mid</button>
                            </div>
                            <div id="all_stock_filter_container_main_market_cap_hidden_box_content_btn_large" >
                              <button id={activeMarketCapRangeBtn==='large'?"market_cap_active_range_btn":null} className="all_stock_filter_cap_hidden_box_content_btn_large_btn" onClick={()=>{setActiveMarketCapRangeBtn('large')}}>Large</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ..................  */}
                
                <div className="all_stock_filter_container_main_close_price">
                  <div className="all_stock_filter_container_main_close_price_arrange_width">
                    <div className="all_stock_filter_container_main_close_price_head" onClick={()=>{setIsActiveClosePrice(!isActiveSClosePrice)}}>
                      <span id="all_stock_filter_container_main_close_price_head_title">
                        Close Price
                      </span>
                      <span id="all_stock_filter_container_main_close_price_head_toggle_arrow">
                        <svg
                          id={isActiveSClosePrice?"svg_rotate_on_open":"svg_rotate_on_close"}
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_close_price_hidden_box" id={isActiveSClosePrice?"asf_close_price_hidden_box":null}>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="all_stock_list_container"></div>
          </div>
        </div>
      </div>

      {/* ................ */}
      <Footer />
    </div>
  );
};

export default AllStocksFilter;
