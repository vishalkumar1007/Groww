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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="TopStocks_main">
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
