// ............. state and css ............
import { useEffect, useState } from "react";
import "./Stocks.css";

// ............. json data ............
// import marketCapData from "../../utils/marketCapData.json";

// ...... component .......
import StocksIndex from "../../component/StockIndex/StockIndex";
import StockWatchListCard from "../../component/StockWatchListCard/StockWatchListCard";
import StockCard from "../../component/StockCard/StockCard";
import StockToolsCard from "../../component/StockToolsCard/StockToolsCard";
import TopSector from "../../component/TopSector/TopSector";
import StockMarketCap from "../../component/StockMarketCap/StockMarketCap";
import Pagination from "../../component/Pagination/Pagination";
import StockCardLoader from "../../component/Loaders_Components/StockCardLoader/StockCardLoader";

// ...... product and tool .......
import fAndO_icon from "../../assets/svg/product_and_tool/F&O.svg";
import event_icon from "../../assets/svg/product_and_tool/event.svg";
import intraday_icon from "../../assets/svg/product_and_tool/intraday.svg";
import ipo_icon from "../../assets/svg/product_and_tool/ipo.svg";
import screener_icon from "../../assets/svg/product_and_tool/screener.svg";

// redux
import { useDispatch, useSelector } from "react-redux";
// import {useSelector } from "react-redux";
import {
  fetchMostBoughtStockThunk,
  selectMostBoughtStockData,
  selectMostBoughtStockLoading,
  // selectMostBoughtStockError,
} from "../../features/api_lab/mostBoughtStocksApiData/centralExportMostBoughtStocks";

import {
  fetchTopGainerStockThunk,
  selectTopGainerStockData,
  selectTopGainerStockLoading,
  // selectTopGainerStockError,
  // selectTopGainerStockErrorMessage,
} from "../../features/api_lab/topGainerStockApiData/centralExportTopGainer";

import {
  fetchStockNewsApiThunk,
  selectStockNewsApiData,
  selectStockNewsApiLoading,
  // selectStockNewsApiError,
  // selectStockNewsApiErrorMsg,
} from "../../features/api_lab/stockNewsApiData/centralExportStockNewsApiData";

import {
  fetchTopLoserStockThunk,
  selectorTopLoserStockData,
  selectorTopLoserStockLoading,
  // selectorTopLoserStockError,
  // selectorTopLoserStockErrorMsg,
} from "../../features/api_lab/topLosersStockApiData/centralExportTopLoserStock";

import // fetchAllStockApiThunk,
// selectorAllStockApiData,
// selectorAllStockApiIsLoading,
// selectorAllStockApiIsError,
// selectorAllStockApiErrorMsg
"../../features/api_lab/allStockHeadApiData/centralExportAllStockHeadApiData";

import {
  fetchTopMarketCapStockThunk,
  selectorTopMarketCapStockData,
  selectorTopMarketCapStockLoading,
  // selectorTopMarketCapStockError,
  // selectorTopMarketCapStockErrorMsg
} from "../../features/api_lab/topMarketCapStockApiData/centralExportTopMarketCapStockApiData";

import { useNavigate } from "react-router-dom";
import StockMarketCapLoader from "../../component/Loaders_Components/StockMarketCapLoader/StockMarketCapLoader";

const Stocks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topGainActive, setTopGainActive] = useState("large");
  const [topLosersActive, setTopLosersActive] = useState("large");
  const [paginationCurrentActivePage, setPaginationCurrentActivePage] =
    useState(1);
  const [paginationEndIndex, setPaginationEndIndex] = useState(0);
  const [paginationStartIndex, setPaginationStartIndex] = useState(0);
  const paginationChunk = 10;

  // api data state

  // handel to calling topByMarketCapStock api in redux -----------------

  const topMarketCapStockApiData = useSelector(selectorTopMarketCapStockData);
  const topMarketCapStockApiLoading = useSelector(
    selectorTopMarketCapStockLoading
  );

  useEffect(() => {
    if (topMarketCapStockApiData.length === 0) {
      dispatch(fetchTopMarketCapStockThunk());
    }
  }, [dispatch, topMarketCapStockApiData]);


  // handel to calling mostBoughStock api in redux -----------------

  const mostBoughtStocksApiData = useSelector(selectMostBoughtStockData);
  const mostBoughtStocksApiLoading = useSelector(selectMostBoughtStockLoading);
  // const mostBoughtStocksApiError = useSelector(selectMostBoughtStockError);
  useEffect(() => {
    if (mostBoughtStocksApiData.length === 0) {
      // console.log("mostBoughtStockData api call");
      dispatch(fetchMostBoughtStockThunk());
    }
  }, [dispatch, mostBoughtStocksApiData]);

  // handel to calling topGainerStock api in redux ------------------

  const topGainerStockApiData = useSelector(selectTopGainerStockData);
  const topGainerStockApiLoading = useSelector(selectTopGainerStockLoading);
  // const topGainerStockApiError = useSelector(selectTopGainerStockError);
  // const topGainerStockApiErrorMessage = useSelector(selectTopGainerStockErrorMessage);
  useEffect(() => {
    if (topGainerStockApiData.length === 0) {
      // console.log("topGainStockData api call");
      dispatch(fetchTopGainerStockThunk());
    }
  }, [dispatch, topGainerStockApiData]);

  // handel to calling stockNewsApiData api in redux ----------------

  const stockNewsApiData = useSelector(selectStockNewsApiData);
  const stockNewsApiLoading = useSelector(selectStockNewsApiLoading);
  // const stockNewsApiError = useSelector(selectStockNewsApiError);
  // const stockNewsApiErrorMessage = useSelector(selectStockNewsApiErrorMsg);

  useEffect(() => {
    if (stockNewsApiData.length === 0) {
      // console.log("stockNewsApiData api call");
      dispatch(fetchStockNewsApiThunk());
    }
  }, [dispatch, stockNewsApiData]);

  // handel to calling topLoserStockApiData api in redux ----------------

  const topLoserStockApiData = useSelector(selectorTopLoserStockData);
  const topLoserStockApiLoading = useSelector(selectorTopLoserStockLoading);
  // const topLoserStockApiError = useSelector(selectorTopLoserStockError);
  // const topLoserStockApiErrorMessage = useSelector(selectorTopLoserStockErrorMsg);

  useEffect(() => {
    if (topLoserStockApiData.length === 0) {
      // console.log("topLoserStockApiData api call");
      dispatch(fetchTopLoserStockThunk());
    }
  }, [dispatch, topLoserStockApiData]);

  // pagination on market cap >>>>>>>>>>>>>>

  const currentActivePage = (activePage) => {
    setPaginationCurrentActivePage(activePage);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (topMarketCapStockApiData.length > 0) {
      const endIndex =
        paginationChunk * paginationCurrentActivePage >
        topMarketCapStockApiData.length
          ? topMarketCapStockApiData.length
          : paginationChunk * paginationCurrentActivePage;
      const startIndex =
        endIndex -
        (endIndex === topMarketCapStockApiData.length
          ? (endIndex % 10) + paginationChunk === paginationChunk
            ? paginationChunk
            : endIndex % 10
          : paginationChunk);

      setPaginationStartIndex(startIndex);
      setPaginationEndIndex(endIndex);
    }
  }, [paginationCurrentActivePage, topMarketCapStockApiData]);

  return (
    <div className="stocks_main">
      <div className="stocks_width_arrange">
        <div className="stocks_main_content_left">
          <div className="stock_left_index">
            <div className="stock_left_index_title">
              <p>Index</p>
              <button>
                {" "}
                <p id="allIndices">All indices</p>{" "}
              </button>
            </div>
            <div className="stock_left_index_component_boxes">
              <StocksIndex
                title="NIFTY 50"
                valueNo="24,705.57"
                valuePercentage="134.66 (0.56%)"
              />
              <StocksIndex
                title="SENSEX"
                valueNo="80,802.57"
                valuePercentage="137.18 (0.47%)"
              />
              <StocksIndex
                title="BANKNIFTY"
                valueNo="50,803.15"
                valuePercentage="-434.66 (0.86%)"
              />
              <StocksIndex
                title="FINNIFTY"
                valueNo="12,645.47"
                valuePercentage="440.43 (0.32%)"
              />
              <StocksIndex
                title="MIDCPNIFTY"
                valueNo="11,105.21"
                valuePercentage="-734.76 (0.56%)"
              />
              <StocksIndex
                title="BANKEX"
                valueNo="54,135.51"
                valuePercentage="-114.45 (0.16%)"
              />
            </div>
          </div>
          <div className="stock_left_most_bought_on_groww">
            <div className="stock_left_most_bought_on_groww_title">
              <span>Most Bought on Groww</span>
            </div>
            <div className="stock_left_most_bought_on_groww_component">
              {mostBoughtStocksApiLoading ? (
                <>
                  <StockCardLoader />
                  <StockCardLoader />
                  <StockCardLoader />
                  <StockCardLoader />
                </>
              ) : (
                mostBoughtStocksApiData.map((data) => (
                  <StockCard
                    key={data._id}
                    uniqueId={data._id}
                    stockId={data.stock_id}
                    logoUrl={data.logoUrl}
                    title={data.name}
                    cost={data.stockCost}
                    costPerRate={data.stockCostPerRate}
                  />
                ))
              )}
            </div>
          </div>
          <div className="stocks_left_product_and_tools">
            <div className="stocks_left_product_and_tools_title">
              <span>Products & tools</span>
            </div>
            <div className="stocks_left_product_and_tools_card_section">
              <StockToolsCard
                iconUrl={fAndO_icon}
                title="F&O"
                redirect="/under_construction"
              />
              <StockToolsCard
                iconUrl={event_icon}
                title="Event"
                redirect="/under_construction"
              />
              <StockToolsCard
                iconUrl={intraday_icon}
                title="Intraday"
                redirect="/under_construction"
              />
              <StockToolsCard
                iconUrl={ipo_icon}
                title="IPO"
                redirect="/under_construction"
              />
              <StockToolsCard
                iconUrl={screener_icon}
                title="Screener"
                redirect="/all_stocks_filter"
              />
            </div>
          </div>
          <div className="stocks_left_top_gainers">
            <div className="stocks_left_top_gainers_heading">
              <span className="stocks_left_top_gainers_heading_title">
                Top Gainer
              </span>
              <span className="stocks_left_top_gainers_heading_seeMore">
                <button>See more</button>
              </span>
            </div>
            <div className="stocks_left_top_gainers_filter">
              <button
                className="stocks_left_top_gainers_filter_large"
                id={
                  topGainActive === "large"
                    ? "stocks_left_top_gainers_filter_active"
                    : null
                }
                onClick={() => {
                  setTopGainActive("large");
                }}
              >
                Large
              </button>
              <button
                className="stocks_left_top_gainers_filter_mid"
                id={
                  topGainActive === "mid"
                    ? "stocks_left_top_gainers_filter_active"
                    : null
                }
                onClick={() => {
                  setTopGainActive("mid");
                }}
              >
                Mid
              </button>
              <button
                className="stocks_left_top_gainers_filter_small"
                id={
                  topGainActive === "small"
                    ? "stocks_left_top_gainers_filter_active"
                    : null
                }
                onClick={() => {
                  setTopGainActive("small");
                }}
              >
                Small
              </button>
            </div>
            <div className="stocks_left_top_gainers_card_component">
              {topGainActive === "large" ? (
                <>
                  {topGainerStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topGainerStockApiData &&
                    topGainerStockApiData
                      .slice(0, 4)
                      .map((data) => (
                        <StockCard
                          key={data._id}
                          uniqueId={data._id}
                          stockId={data.stock_id}
                          logoUrl={data.logoUrl}
                          title={data.name}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                        />
                      ))
                  )}
                </>
              ) : topGainActive === "mid" ? (
                <>
                  {topGainerStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topGainerStockApiData &&
                    topGainerStockApiData
                      .slice(4, 8)
                      .map((data) => (
                        <StockCard
                          key={data._id}
                          uniqueId={data._id}
                          stockId={data.stock_id}
                          logoUrl={data.logoUrl}
                          title={data.name}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                        />
                      ))
                  )}
                </>
              ) : (
                <>
                  {topGainerStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topGainerStockApiData &&
                    topGainerStockApiData
                      .slice(8, 12)
                      .map((data) => (
                        <StockCard
                          key={data._id}
                          uniqueId={data._id}
                          stockId={data.stock_id}
                          logoUrl={data.logoUrl}
                          title={data.name}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                        />
                      ))
                  )}
                </>
              )}
            </div>
          </div>
          <div className="stocks_left_in_news">
            <div className="stocks_left_in_news_heading">
              <span className="stocks_left_in_news_heading_title">
                Stocks in News
              </span>
              <button className="stocks_left_in_news_heading_news_box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-newspaper"
                >
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
                <p>News</p>
              </button>
            </div>
            <div className="stocks_left_in_news_card_component">
              {stockNewsApiLoading ? (
                <>
                  <StockCardLoader />
                  <StockCardLoader />
                  <StockCardLoader />
                  <StockCardLoader />
                </>
              ) : (
                stockNewsApiData.map((data) => (
                  <StockCard
                    key={data._id}
                    uniqueId={data._id}
                    stockId={data.stock_id}
                    logoUrl={data.logoUrl}
                    title={data.name}
                    cost={data.stockCost}
                    costPerRate={data.stockCostPerRate}
                  />
                ))
              )}
            </div>
          </div>
          <div className="stocks_left_top_losers">
            <div className="stocks_left_top_losers_heading">
              <span className="stocks_left_top_losers_heading_title">
                Top Losers
              </span>
              <span className="stocks_left_top_losers_heading_seeMore">
                <button>See more</button>
              </span>
            </div>
            <div className="stocks_left_top_losers_filter">
              <button
                className="stocks_left_top_losers_filter_large"
                id={
                  topLosersActive === "large"
                    ? "stocks_left_top_losers_filter_active"
                    : null
                }
                onClick={() => {
                  setTopLosersActive("large");
                }}
              >
                Large
              </button>
              <button
                className="stocks_left_top_losers_filter_mid"
                id={
                  topLosersActive === "mid"
                    ? "stocks_left_top_losers_filter_active"
                    : null
                }
                onClick={() => {
                  setTopLosersActive("mid");
                }}
              >
                Mid
              </button>
              <button
                className="stocks_left_top_losers_filter_small"
                id={
                  topLosersActive === "small"
                    ? "stocks_left_top_losers_filter_active"
                    : null
                }
                onClick={() => {
                  setTopLosersActive("small");
                }}
              >
                Small
              </button>
            </div>
            <div className="stocks_left_top_losers_card_component">
              {topLosersActive === "large" ? (
                <>
                  {topLoserStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topLoserStockApiData &&
                    topLoserStockApiData
                      .slice(0, 4)
                      .map((data) => (
                        <StockCard
                          key={data._id}
                          uniqueId={data._id}
                          stockId={data.stock_id}
                          logoUrl={data.logoUrl}
                          title={data.name}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                        />
                      ))
                  )}
                </>
              ) : topLosersActive === "mid" ? (
                <>
                  {topLoserStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topLoserStockApiData &&
                    topLoserStockApiData
                      .slice(4, 8)
                      .map((data) => (
                        <StockCard
                          key={data._id}
                          uniqueId={data._id}
                          stockId={data.stock_id}
                          logoUrl={data.logoUrl}
                          title={data.name}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                        />
                      ))
                  )}
                </>
              ) : (
                <>
                  {topLoserStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topLoserStockApiData &&
                    topLoserStockApiData
                      .slice(8, 12)
                      .map((data) => (
                        <StockCard
                          key={data._id}
                          uniqueId={data._id}
                          stockId={data.stock_id}
                          logoUrl={data.logoUrl}
                          title={data.name}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                        />
                      ))
                  )}
                </>
              )}
            </div>
          </div>
          <div className="stocks_left_top_sector">
            <div className="stocks_left_top_sector_heading">
              <span>Top Sectors</span>
              <button>
                <p>See more</p>
              </button>
            </div>
            <div className="stocks_left_top_sector_card_component">
              <TopSector title="Banking" value="41" />
              <TopSector title="Energy" value="99" />
              <TopSector title="Healthcare" value="235" />
              <TopSector title="FMGC" value="222" />
              <TopSector title="Tele-communication" value="47" />
              <TopSector title="Auotmobile" value="145" />
              <TopSector title="Media & Entertainment" value="105" />
            </div>
          </div>
          <div className="stocks_left_market_cap">
            <div className="stocks_left_market_cap_heading">
              <span className="stocks_left_market_cap_heading_title">
                Top by Market Cap
              </span>
              <button className="stocks_left_market_cap_heading_seeMore">
                <p>See more</p>
              </button>
            </div>
            <div className="stocks_left_market_cap_card_component_container">
              <div className="stocks_left_market_cap_card_component_container_main">
                <div className="stocks_left_market_cap_head_title_section">
                  <div className="stocks_left_market_cap_head_title_section_arrange_width">
                    <div className="stocks_left_market_cap_head_title_section_company_and_graph">
                      <div className="stocks_left_market_cap_head_title_section_company">
                        <span>Company</span>
                      </div>
                    </div>
                    <div className="stocks_left_market_cap_head_title_section_price_and_watchlist">
                      <div className="stocks_left_market_cap_head_title_section_price">
                        <span>Market Price</span>
                      </div>
                      <div className="stocks_left_market_cap_head_title_section_watchlist">
                        <span>Watchlist</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="stocks_left_market_cap_card_component_section"
                  // ref={PreventScrollMarketCap}
                  // onScroll={handleScrollMarketCap}
                >
                  {topMarketCapStockApiLoading ? (
                    <>
                      <StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader /><StockMarketCapLoader />
                    </>
                  ) : (
                    topMarketCapStockApiData
                      .slice(paginationStartIndex, paginationEndIndex)
                      .map((data) => (
                        <StockMarketCap
                          key={data._id}
                          cost={data.stockCost}
                          costPerRate={data.stockCostPerRate}
                          stockId={data.stock_id}
                          uniqueId={data._id}
                          title={data.name}
                          logoUrl={data.logoUrl}
                        />
                      ))
                  )}
                </div>
                <div className="stocks_left_market_cap_pagination_section">
                  <div className="stocks_left_market_cap_pagination_section_arrange_width">
                    <Pagination
                      totalPage={Math.ceil(
                        topMarketCapStockApiData.length / 10
                      )}
                      currentActivePage={(activePage) => {
                        currentActivePage(activePage);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stocks_content_right">
          <div className="stocks_content_right_yourInvestments">
            <div className="stocks_content_right_yourInvestments_title_head">
              <span id="scry_title_text">Your Investments</span>
              <span id="scry_more">
                <button
                  onClick={() => {
                    navigate("/user/investments");
                  }}
                >
                  Dashboard
                </button>
              </span>
            </div>
            <div className="stocks_content_right_yourInvestments_card_main">
              <div className="stocks_content_right_yourInvestments_card_main_total_return">
                <span id="stocks_content_right_yourInvestments_card_main_total_return_rupees">
                  ₹0
                </span>
                <span id="stocks_content_right_yourInvestments_card_main_total_return_title">
                  Total Returns
                </span>
              </div>
              <div className="stocks_content_right_yourInvestments_card_main_current_value">
                <span id="stocks_content_right_yourInvestments_card_main_current_value_rupees">
                  ₹0
                </span>
                <span id="stocks_content_right_yourInvestments_card_main_current_value_title">
                  Current Value
                </span>
              </div>
            </div>
          </div>

          {/* coming soon feature */}

          <div className="stocks_content_right_watchLists">
            <div className="stocks_content_right_watchLists_title_head">
              <span id="scrw_title_text">All watchlists</span>
              <span
                id="scrw_more"
                onClick={() => {
                  navigate("/dashboard/watchlist");
                }}
              >
                View all
              </span>
            </div>
            <div className="stocks_content_right_watchLists_card_main">
              <div className="stocks_content_right_watchLists_card_main_comp">
                <StockWatchListCard watchlistTitle="vishal" />
              </div>
              <div className="stocks_content_right_watchLists_card_main_add_box">
                <div className="stocks_content_right_watchLists_card_main_add_box_arrange_width">
                  <span id="stocks_content_right_watchLists_card_main_add_box_arrange_width_icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="svg_add"
                      width="23"
                      height="23"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00B386"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-plus"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                  </span>
                  <span id="stocks_content_right_watchLists_card_main_add_box_arrange_width_title">
                    Create New Watchlist
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
