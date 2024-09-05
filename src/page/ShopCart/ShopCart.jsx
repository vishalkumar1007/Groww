import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "./ShopCart.css";
import EmptyDataSvg from "../../assets/svg/am_icon/Empty_data_bro.svg";
import { useSelector } from "react-redux";
import StockCard from "../../component/StockCard/StockCard";
import { selectUserWatchlistValue } from "../../features/userWatchlist/userWatchlistSelectors";

const ShopCart = () => {
  const WatchlistData = useSelector(selectUserWatchlistValue);
  console.log(WatchlistData);
  return (
    <>
      <Navbar />
      <div className="shop_cart_main">
        <div className="shop_cart_main_arrange_width">
          <div className="shop_cart_main_left">
            <div className="shop_cart_main_left_head" style={{display:WatchlistData.length===0?'none':'block'}}>
              <span>Your All Stock Collection</span>
            </div>
            <div className="shop_cart_main_left_all_stock_add_card">
              {WatchlistData.length === 0 ? (
                <div className="shop_cart_main_left_all_stock_add_card_svg">
                  <img src={EmptyDataSvg} alt="" />
                  <span>Empty Stock Collection</span>
                </div>
              ) : (
                WatchlistData.map((stock, index) => (
                  <StockCard
                    key={index}
                    logoUrl={stock.logoUrl}
                    title={stock.title}
                    cost={stock.cost}
                    costPerRate={stock.costPerRate}
                  />
                ))
              )}
            </div>
          </div>
          <div className="shop_cart_main_right"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopCart;
