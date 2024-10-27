import "./Watchlist.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import StockCard from "../../component/StockCard/StockCard";
import EmptyDataSvg from "../../assets/svg/am_icon/Empty_data_bro.svg";
import { useSelector } from "react-redux";
import { selectUserWatchlistValue } from "../../features/userWatchlist/centralExportUserWatchlist";


const Watchlist = () => {
  const WatchlistData = useSelector(selectUserWatchlistValue);
  console.log("Watchlist Data = ",WatchlistData);
  return (
    <div className="watchlist_page_main">
      <Navbar callFrom="Dashboard" />
      <div className="watchlist_page_main_prevent_flex_main">
      <div className="watchlist_page_arrange_width">
        <div className="watchlist_page_info_head" style={{display: WatchlistData.length === 0?"none":"block"}}>
          <p>Your watchlist</p>
        </div>
        <div className="watchlist_page_stock_container">
          {WatchlistData.length === 0 ? (
            <div className="watchlist_page_stock_container_all_stock_add_card_svg">
              <img src={EmptyDataSvg} alt="" />
              <span>oops , you din't have any stocks in watchlist</span>
            </div>
          ) : (
            WatchlistData.map((data, index) => (
              <StockCard
                key={index}
                _id={data._id}
                stock_id={data.stock_id}
                name={data.name}
                stockCost={data.stockCost}
                stockCostPerRate={data.stockCostPerRate}
                logoUrl={data.logoUrl}
              />
            ))
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Watchlist;
