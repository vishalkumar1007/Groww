import { useEffect, useRef, useState } from "react";
import "./StockWatchListCard.css";
import { useSelector } from "react-redux";
import {selectUserWatchlistValue} from '../../features/userWatchlist/centralExportUserWatchlist';
import {selectUserProfileData} from '../../features/userProfileData/centralExportUserProfileData';
import { useNavigate } from "react-router-dom";


const StockWatchListCard = ({ watchlistTitle = "dummy" }) => {
  const navigate = useNavigate();
  const getWatchlistHiddenBoxHeight = useRef(0);
  const [isOpenWatchlist, setIsOpenWatchList] = useState(false);
  const [watchListDivHeight, setWatchListDivHeight] = useState(0);
  const userWatchlistData = useSelector(selectUserWatchlistValue);
  const userProfileData = useSelector(selectUserProfileData);

  useEffect(() => {
    if (getWatchlistHiddenBoxHeight.current) {
      const height = getWatchlistHiddenBoxHeight.current.getBoundingClientRect().height;
      setWatchListDivHeight(height);
    }
  }, [watchlistTitle,userWatchlistData]);

  // useEffect(()=>{
  //   console.log(userWatchlistData);
  // },[userWatchlistData])

  return (
    <div className="stock_watchList_card_main">
      <div className="stock_watchlist_card_main_arrangeWidth">
        <div
          className="stock_watchList_card_main_head"
          onClick={() => {
            setIsOpenWatchList(!isOpenWatchlist);
          }}
        >
          <div className="stock_watchList_card_main_head_title">
            <span id="stock_watchList_card_main_head_title_name">
              {userProfileData.userFirstName}
              's Watchlist
            </span>
            <span id="stock_watchList_card_main_head_title_item">
              {userWatchlistData.length} item
            </span>
          </div>
          <div
            className="stock_watchList_card_main_head_icon"
            id={
              isOpenWatchlist
                ? "stock_watchList_card_main_head_icon_rotate"
                : null
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
        <div
          className="stock_watchList_card_main_all_items_list_main_box"
          id={isOpenWatchlist ? "disable_stock_watchList_all_items_list" : null}
          style={{height: isOpenWatchlist ? `${watchListDivHeight}px`:'0px'}}
        >
          <div className="stock_watchList_card_main_all_items_list_height_box" ref={getWatchlistHiddenBoxHeight}>
            {userWatchlistData.map((data,index) => (
              <div
                key={index}
                className="stock_watchList_card_main_all_items_list"
              >
                <div className="stock_watchList_card_main_item_box">
                  <div className="stock_watchList_card_main_item_box_title">
                    <span id="stock_watchList_card_main_item_box_title_name" onClick={()=>{navigate(`/stock_detail?${data.stock_id}`)}}>
                      {data.name || "Tata Steel"}
                    </span>
                  </div>
                  <div className="stock_watchList_card_main_item_box_rate">
                    <span id="stock_watchList_card_main_item_box_rate_cost">
                      ₹{data.stockCost || "000.00"}
                    </span>
                    <span id="stock_watchList_card_main_item_box_rate_costPerRate">
                      {data.stockCostPerRate || "0.00 (0.00%)"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockWatchListCard;
