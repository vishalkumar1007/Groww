import "./TopStocks.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { useEffect } from "react";
import { selectMostBoughtStockData, selectMostBoughtStockLoading} from "../../features/api_lab/mostBoughtStocksApiData/centralExportMostBoughtStocks";
import { selectStockNewsApiData, selectStockNewsApiLoading} from "../../features/api_lab/stockNewsApiData/centralExportStockNewsApiData";
import { selectTopGainerStockData, selectTopGainerStockLoading} from "../../features/api_lab/topGainerStockApiData/centralExportTopGainer";
import { selectorTopLoserStockData, selectorTopLoserStockLoading} from "../../features/api_lab/topLosersStockApiData/centralExportTopLoserStock";
import { selectorTopMarketCapStockData, selectorTopMarketCapStockLoading} from "../../features/api_lab/topMarketCapStockApiData/centralExportTopMarketCapStockApiData";
import StocksCard from "../../component/StockCard/StockCard";
import { useSelector } from "react-redux";
import StockCardLoader from "../../component/Loaders_Components/StockCardLoader/StockCardLoader";
import {useState} from 'react'
import FloatSearchStock from "../../component/FloatSearchStock/FloatSearchStock";

const TopStocks = () => {
  //   const data = useSelector(selectMostBoughtStockData);
  const mostBoughtStocksApiData = useSelector(selectMostBoughtStockData);
  const mostBoughtStocksApiLoading = useSelector(selectMostBoughtStockLoading);
  const newsApiStockData = useSelector(selectStockNewsApiData);
  const topGainerStockApiLoading = useSelector(selectTopGainerStockLoading);
  const topGainerStockData = useSelector(selectTopGainerStockData);
  const stockNewsApiLoading = useSelector(selectStockNewsApiLoading);
  const topLoserStockData = useSelector(selectorTopLoserStockData);
  const topLoserStockApiLoading = useSelector(selectorTopLoserStockLoading);
  const topMarketCapStockData = useSelector(selectorTopMarketCapStockData);
  const topMarketCapStockApiLoading = useSelector(selectorTopMarketCapStockLoading);
  const [openSearchStockFloat, setOpenSearchStockFloat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="TopStocks_main">
      {openSearchStockFloat ? (
        <div className="topStock_float_search_option">
          <FloatSearchStock />
        </div>
      ) : null}

      <div
        className="topStock_float_search_option_icon"
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
      <Navbar callFrom="Dashboard"/>
      <div className="TopStocks_main_contain">
        <div className="TopStocks_main_arrange_width">
          
          <>
            <div className="TopStocks_heading">
              <span>Top Profit Stocks</span>
            </div>
            <div className="TopStocks_heading_container_main">
              <div className="TopStocks_heading_container">
                {
                  // eslint-disable-next-line array-callback-return
                  topGainerStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topGainerStockData.map((data) => (
                      <StocksCard
                        key={data._id}
                        _id={data._id}
                        stock_id={data.stock_id}
                        logoUrl={data.logoUrl}
                        name={data.name}
                        stockCost={data.stockCost}
                        stockCostPerRate={data.stockCostPerRate}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </>
                
          <>
            <div className="TopStocks_heading">
              <span>Top Most Bought</span>
            </div>
            <div className="TopStocks_heading_container_main">
              <div className="TopStocks_heading_container">
                {
                  // eslint-disable-next-line array-callback-return
                  mostBoughtStocksApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    mostBoughtStocksApiData.map((data) => (
                      <StocksCard
                        key={data._id}
                        _id={data._id}
                        stock_id={data.stock_id}
                        logoUrl={data.logoUrl}
                        name={data.name}
                        stockCost={data.stockCost}
                        stockCostPerRate={data.stockCostPerRate}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </>


          <>
            <div className="TopStocks_heading">
              <span>Trending in news</span>
            </div>
            <div className="TopStocks_heading_container_main">
              <div className="TopStocks_heading_container">
                {
                  // eslint-disable-next-line array-callback-return
                  stockNewsApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    newsApiStockData.map((data) => (
                      <StocksCard
                        key={data._id}
                        _id={data._id}
                        stock_id={data.stock_id}
                        logoUrl={data.logoUrl}
                        name={data.name}
                        stockCost={data.stockCost}
                        stockCostPerRate={data.stockCostPerRate}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </>
          <>
            <div className="TopStocks_heading">
              <span>Top Looser Stocks</span>
            </div>
            <div className="TopStocks_heading_container_main">
              <div className="TopStocks_heading_container">
                {
                  // eslint-disable-next-line array-callback-return
                  topLoserStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topLoserStockData.map((data) => (
                      <StocksCard
                        key={data._id}
                        _id={data._id}
                        stock_id={data.stock_id}
                        logoUrl={data.logoUrl}
                        name={data.name}
                        stockCost={data.stockCost}
                        stockCostPerRate={data.stockCostPerRate}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </>
          <>
            <div className="TopStocks_heading">
              <span>Top Market Cap Stocks</span>
            </div>
            <div className="TopStocks_heading_container_main">
              <div className="TopStocks_heading_container">
                {
                  // eslint-disable-next-line array-callback-return
                  topMarketCapStockApiLoading ? (
                    <>
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                      <StockCardLoader />
                    </>
                  ) : (
                    topMarketCapStockData.map((data) => (
                      <StocksCard
                        key={data._id}
                        _id={data._id}
                        stock_id={data.stock_id}
                        logoUrl={data.logoUrl}
                        name={data.name}
                        stockCost={data.stockCost}
                        stockCostPerRate={data.stockCostPerRate}
                      />
                    ))
                  )
                }
              </div>
            </div>
          </>
        </div>
      </div>
      <div className="top_stock_footer_stock_gap"></div>
      <Footer />
    </div>
  );
};

export default TopStocks;
