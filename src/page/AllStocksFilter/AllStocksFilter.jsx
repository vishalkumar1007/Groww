import { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Pagination from "../../component/Pagination/Pagination";
// import SelectCategory from "../../AllStockFilterComponents/SelectCategory/SelectCategory";
import SelectCategory from "../../component/AllStockFilterComponents/SelectCategory/SelectCategory";
// import marketCapData from "../../jsonDummyData/marketCapData.json";
// import marketCapData from "../../utils/marketCapData.json";
import "./AllStocksFilter.css";
import StockMarketCap from "../../component/StockMarketCap/StockMarketCap";
import FloatSearchStock from "../../component/FloatSearchStock/FloatSearchStock";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStockApiThunk,
  selectorAllStockApiData,
  selectorAllStockApiIsLoading,
  // selectorAllStockApiIsError,
  // selectorAllStockApiErrorMsg
} from "../../features/api_lab/allStockHeadApiData/centralExportAllStockHeadApiData";


const AllStocksFilter = () => {
  const dispatch = useDispatch();
  const [isActiveSector, setIsActiveSector] = useState(false);
  const [isActiveIndex, setIsActiveIndex] = useState(false);
  const [isActiveMarketCap, setIsActiveMarketCap] = useState(false);
  const [isActiveSClosePrice, setIsActiveClosePrice] = useState(false);
  // .......................
  const [marketCapUserInputStartValue, setMarketCapUserInputStartValue] =
    useState(0);
  const [marketCapUserInputEndValue, setMarketCapUserInputEndValue] =
    useState(100);
  const [closePriceUserInputStartValue, setClosePriceUserInputStartValue] =
    useState(0);
  const [closePriceUserInputEndValue, setClosePriceUserInputEndValue] =
    useState(100);
  const [activeMarketCapRangeBtn, setActiveMarketCapRangeBtn] =
    useState("small");

  // .......................
  const [paginationActivePage, setPaginationActivePage] = useState(1);
  const [paginationStartIndex, setPaginationStartIndex] = useState(0);
  const [paginationEndIndex, setPaginationEndIndex] = useState(0);
  const paginationChunk = 15;


  // handel to calling All Head Stock api using redux -------------

  const allHeadStockData = useSelector(selectorAllStockApiData);
  const allHeadStockLoading = useSelector(selectorAllStockApiIsLoading);
  const [openSearchStockFloat, setOpenSearchStockFloat] = useState(false);

  useEffect(() => {
    if (allHeadStockData.length === 0) {
      dispatch(fetchAllStockApiThunk());
    }
  }, [allHeadStockData, dispatch]);

  //----------------------------

  const currentActivePage = (activePage) => {
    setPaginationActivePage(activePage);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!allHeadStockLoading) {
      const endIndex =
        paginationChunk * paginationActivePage > allHeadStockData.length
          ? allHeadStockData.length
          : paginationChunk * paginationActivePage;
      const startIndex =
        endIndex -
        (endIndex === allHeadStockData.length
          ? allHeadStockData.length - (paginationActivePage - 1) * 15
          : paginationChunk);

      setPaginationStartIndex(startIndex);
      setPaginationEndIndex(endIndex);
    }
  }, [allHeadStockData, allHeadStockLoading, paginationActivePage]);

  return (
    <div className="all_stock_main">
      {openSearchStockFloat ? (
        <div className="allStocks_float_search_option">
          <FloatSearchStock />
        </div>
      ) : null}

      <div
        className="allStocks_float_search_option_icon"
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
      {/* ...............  */}
      <Navbar callFrom="Dashboard" />
      {/* ...............  */}

      <div className="all_stock_main_container" >
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
                    <div
                      className="all_stock_filter_container_main_sector_head"
                      onClick={() => {
                        setIsActiveSector(!isActiveSector);
                      }}
                    >
                      <span id="all_stock_filter_container_main_sector_head_title">
                        Sectors
                      </span>
                      <span id="all_stock_filter_container_main_sector_head_toggle_arrow">
                        <svg
                          id={
                            isActiveSector
                              ? "svg_rotate_on_open"
                              : "svg_rotate_on_close"
                          }
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
                    <div
                      className="all_stock_filter_container_main_sector_hidden_box"
                      id={isActiveSector ? "asf_sector_hidden_box" : null}
                    >
                      <div className="all_stock_filter_container_main_sector_hidden_box_arrange_height">
                        <SelectCategory title="Agricultural" />
                        <SelectCategory title="Apparel & Accessories" />
                        <SelectCategory title="Automobile & Ancillaries" />
                        <SelectCategory title="Banking" />
                        <SelectCategory title="Consumer Durables" />
                        <SelectCategory title="Derived Materials" />
                        <SelectCategory title="Energy" />
                        <SelectCategory title="Financial" />
                        <SelectCategory title="FMGC" />
                        <SelectCategory title="Healthcare" />
                        <SelectCategory title="Hospitality & Travel" />
                        <SelectCategory title="Industrial Products" />
                        <SelectCategory title="Industries" />
                        <SelectCategory title="IT Industry" />
                        <SelectCategory title="Logistics & Freight" />
                        <SelectCategory title="Media & Entertainment" />
                        <SelectCategory title="Others" />
                        <SelectCategory title="Raw Material" />
                        <SelectCategory title="Tele-Communication" />
                        <SelectCategory title="Textile Industry" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ..................  */}

                <div className="all_stock_filter_container_main_index">
                  <div className="all_stock_filter_container_main_index_arrange_width">
                    <div
                      className="all_stock_filter_container_main_index_head"
                      onClick={() => {
                        setIsActiveIndex(!isActiveIndex);
                      }}
                    >
                      <span id="all_stock_filter_container_main_index_head_title">
                        Index
                      </span>
                      <span id="all_stock_filter_container_main_index_head_toggle_arrow">
                        <svg
                          id={
                            isActiveIndex
                              ? "svg_rotate_on_open"
                              : "svg_rotate_on_close"
                          }
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
                    <div
                      className="all_stock_filter_container_main_index_hidden_box"
                      id={isActiveIndex ? "asf_index_hidden_box" : null}
                    >
                      <SelectCategory title="Nifty Bank" />
                      <SelectCategory title="Nifty Bank 50" />
                      <SelectCategory title="Nifty Midcap 100" />
                      <SelectCategory title="SENSEX" />
                      <SelectCategory title="Nifty 50" />
                      <SelectCategory title="Nifty 100" />
                      <SelectCategory title="BSE 100" />
                    </div>
                  </div>
                </div>

                {/* ..................  */}

                <div className="all_stock_filter_container_main_market_cap">
                  <div className="all_stock_filter_container_main_market_cap_arrange_width">
                    <div
                      className="all_stock_filter_container_main_market_cap_head"
                      onClick={() => {
                        setIsActiveMarketCap(!isActiveMarketCap);
                      }}
                    >
                      <span id="all_stock_filter_container_main_market_cap_head_title">
                        Market Cap (cr)
                      </span>
                      <span id="all_stock_filter_container_main_market_cap_head_toggle_arrow">
                        <svg
                          id={
                            isActiveMarketCap
                              ? "svg_rotate_on_open"
                              : "svg_rotate_on_close"
                          }
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
                    <div
                      className="all_stock_filter_container_main_market_cap_hidden_box"
                      id={
                        isActiveMarketCap ? "asf_market_cap_hidden_box" : null
                      }
                    >
                      <div className="all_stock_filter_container_main_market_cap_hidden_box_content">
                        <div className="all_stock_filter_container_main_market_cap_hidden_box_content_range"></div>
                        <div className="all_stock_filter_container_main_market_cap_hidden_box_content_input">
                          <input
                            id="all_stock_filter_market_cap_hidden_box_content_input_start"
                            type="number"
                            min="0"
                            value={marketCapUserInputStartValue}
                            onChange={(e) => {
                              setMarketCapUserInputStartValue(
                                e.target.value === "" ? 0 : e.target.value
                              );
                            }}
                          />
                          <span id="all_stock_filter_market_cap_hidden_box_content_input_to">
                            to
                          </span>
                          <input
                            id="all_stock_filter_market_cap_hidden_box_content_input_end"
                            type="number"
                            min="0"
                            value={marketCapUserInputEndValue}
                            onChange={(e) => {
                              setMarketCapUserInputEndValue(
                                e.target.value === "" ? 0 : e.target.value
                              );
                            }}
                          />
                        </div>
                        <div className="all_stock_filter_container_main_market_cap_hidden_box_content_btn">
                          <div id="all_stock_filter_container_main_market_cap_hidden_box_content_btn_small">
                            <button
                              id={
                                activeMarketCapRangeBtn === "small"
                                  ? "market_cap_active_range_btn"
                                  : null
                              }
                              className="all_stock_filter_cap_hidden_box_content_btn_small_btn"
                              onClick={() => {
                                setActiveMarketCapRangeBtn("small");
                                setMarketCapUserInputStartValue(0);
                                setMarketCapUserInputEndValue(100);
                              }}
                            >
                              Small
                            </button>
                          </div>
                          <div id="all_stock_filter_container_main_market_cap_hidden_box_content_btn_mid">
                            <button
                              id={
                                activeMarketCapRangeBtn === "mid"
                                  ? "market_cap_active_range_btn"
                                  : null
                              }
                              className="all_stock_filter_cap_hidden_box_content_btn_mid_btn"
                              onClick={() => {
                                setActiveMarketCapRangeBtn("mid");
                                setMarketCapUserInputStartValue(100);
                                setMarketCapUserInputEndValue(1000);
                              }}
                            >
                              Mid
                            </button>
                          </div>
                          <div id="all_stock_filter_container_main_market_cap_hidden_box_content_btn_large">
                            <button
                              id={
                                activeMarketCapRangeBtn === "large"
                                  ? "market_cap_active_range_btn"
                                  : null
                              }
                              className="all_stock_filter_cap_hidden_box_content_btn_large_btn"
                              onClick={() => {
                                setActiveMarketCapRangeBtn("large");
                                setMarketCapUserInputStartValue(1000);
                                setMarketCapUserInputEndValue(10_000);
                              }}
                            >
                              Large
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ..................  */}

                <div className="all_stock_filter_container_main_close_price">
                  <div className="all_stock_filter_container_main_close_price_arrange_width">
                    <div
                      className="all_stock_filter_container_main_close_price_head"
                      onClick={() => {
                        setIsActiveClosePrice(!isActiveSClosePrice);
                      }}
                    >
                      <span id="all_stock_filter_container_main_close_price_head_title">
                        Close Price
                      </span>
                      <span id="all_stock_filter_container_main_close_price_head_toggle_arrow">
                        <svg
                          id={
                            isActiveSClosePrice
                              ? "svg_rotate_on_open"
                              : "svg_rotate_on_close"
                          }
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
                    <div
                      className="all_stock_filter_container_main_close_price_hidden_box"
                      id={
                        isActiveSClosePrice
                          ? "asf_close_price_hidden_box"
                          : null
                      }
                    >
                      <input
                        id="all_stock_filter_container_main_close_price_hidden_box_input_start"
                        type="number"
                        min="0"
                        value={closePriceUserInputStartValue}
                        onChange={(e) => {
                          setClosePriceUserInputStartValue(
                            e.target.value === "" ? 0 : e.target.value
                          );
                        }}
                      />
                      <span id="all_stock_filter_container_main_close_price_hidden_box_to">
                        to
                      </span>
                      <input
                        id="all_stock_filter_container_main_close_price_hidden_box_input_end"
                        type="number"
                        min="0"
                        value={closePriceUserInputEndValue}
                        onChange={(e) => {
                          setClosePriceUserInputEndValue(
                            e.target.value === "" ? 0 : e.target.value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="all_stock_list_container">
              <div className="all_stock_list_pagination_main_box">
                {/* ......  */}
                <div className="all_stock_list_pagination_main_box_head">
                  <div className="all_stock_list_pagination_main_box_head_arrange_width">
                    <div className="all_stock_list_pagination_main_box_head_company_and_graph">
                      <div className="all_stock_list_pagination_main_box_head_company">
                        <span>Company</span>
                      </div>
                    </div>
                    <div className="all_stock_list_pagination_main_box_head_price_and_watchlist">
                      <div className="all_stock_list_pagination_main_box_head_price">
                        <span>Market Price</span>
                      </div>
                      <div className="all_stock_list_pagination_main_box_head_watchlist">
                        <span>Watchlist</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ......  */}
                <div className="all_stock_list_pagination_main_box_components">
                  {allHeadStockLoading
                    ? null
                    : allHeadStockData
                        .slice(paginationStartIndex, paginationEndIndex)
                        .map((data) => (
                          <StockMarketCap
                            key={data._id}
                            stockCost={data.stockCost}
                            stockCostPerRate={data.stockCostPerRate}
                            stock_id={data.stock_id}
                            _id={data._id}
                            name={data.name}
                            logoUrl={data.logoUrl}
                          />
                        ))}
                </div>
                {/* ......  */}
                <div className="all_stock_list_pagination_main_box_pagination_box">
                  <div className="all_stock_list_pagination_main_box_pagination_box_arrange_width">
                    {allHeadStockLoading ? null : (
                      <Pagination
                        totalPage={Math.ceil(allHeadStockData.length / 15)}
                        currentActivePage={(activePage) => {
                          currentActivePage(activePage);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ................ */}
      <Footer />
    </div>
  );
};

export default AllStocksFilter;
