import "./Watchlist.css";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import StockCard from "../../component/StockCard/StockCard";
import EmptyDataSvg from "../../assets/svg/am_icon/Empty_data_bro.svg";
import { useSelector } from "react-redux";
import { selectUserWatchlistValue } from "../../features/userWatchlist/centralExportUserWatchlist";
import FloatSearchStock from "../../component/FloatSearchStock/FloatSearchStock";
import {useState} from 'react'

const Watchlist = () => {
  const WatchlistData = useSelector(selectUserWatchlistValue);
  const [openSearchStockFloat, setOpenSearchStockFloat] = useState(false);
  console.log("Watchlist Data = ",WatchlistData);
  return (
    <div className="watchlist_page_main">
      {openSearchStockFloat ? (
        <div className="watchList_float_search_option">
          <FloatSearchStock />
        </div>
      ) : null}

      <div
        className="watchList_float_search_option_icon"
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
