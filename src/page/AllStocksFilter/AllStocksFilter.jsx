import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";

import "./AllStocksFilter.css";

const AllStocksFilter = () => {
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
                <div className="all_stock_filter_container_main_sector">
                  <div className="all_stock_filter_container_main_sector_arrange_width">
                    <div className="all_stock_filter_container_main_sector_head">
                      <span id="all_stock_filter_container_main_sector_head_title">
                        Sectors
                      </span>
                      <span id="all_stock_filter_container_main_sector_head_toggle_arrow">
                        #
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_sector_hidden_box"></div>
                  </div>
                </div>
                <div className="all_stock_filter_container_main_index">
                  <div className="all_stock_filter_container_main_index_arrange_width">
                    <div className="all_stock_filter_container_main_index_head">
                      <span id="all_stock_filter_container_main_index_head_title">
                        Index
                      </span>
                      <span id="all_stock_filter_container_main_index_head_toggle_arrow">
                        #
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_index_hidden_box"></div>
                  </div>
                </div>
                <div className="all_stock_filter_container_main_market_cap">
                  <div className="all_stock_filter_container_main_market_cap_arrange_width">
                    <div className="all_stock_filter_container_main_market_cap_head">
                      <span id="all_stock_filter_container_main_market_cap_head_title">
                        Market Cap (cr)
                      </span>
                      <span id="all_stock_filter_container_main_market_cap_head_toggle_arrow">
                        #
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_market_cap_hidden_box"></div>
                  </div>
                </div>
                <div className="all_stock_filter_container_main_close_price">
                  <div className="all_stock_filter_container_main_close_price_arrange_width">
                    <div className="all_stock_filter_container_main_close_price_head">
                      <span id="all_stock_filter_container_main_close_price_head_title">
                        Close Price
                      </span>
                      <span id="all_stock_filter_container_main_close_price_head_toggle_arrow">
                        #
                      </span>
                    </div>
                    <div className="all_stock_filter_container_main_close_price_hidden_box"></div>
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
