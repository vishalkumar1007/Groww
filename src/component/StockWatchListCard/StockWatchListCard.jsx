import { useEffect, useRef, useState } from "react";
import "./StockWatchListCard.css";

// ............. data ...........

import watchListData from "../../jsonDummyData/watchlistItemData.json";

const StockWatchListCard = ({ watchlistTitle = "dummy" }) => {
  const getWatchlistHiddenBoxHeight = useRef(0);
  const [isOpenWatchlist, setIsOpenWatchList] = useState(false);
  const [watchListDivHeight, setWatchListDivHeight] = useState(0);

  useEffect(() => {
    if (getWatchlistHiddenBoxHeight.current) {
      const height = getWatchlistHiddenBoxHeight.current.getBoundingClientRect().height;
      setWatchListDivHeight(height);
    }
  }, [watchlistTitle]);

  // useEffect(()=>{},[watchlistTitle])

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
              {watchlistTitle.charAt(0).toUpperCase() +
                watchlistTitle.substring(1, watchlistTitle.length)}
              's Watchlist
            </span>
            <span id="stock_watchList_card_main_head_title_item">
              {watchListData[watchlistTitle].length} item
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
            {watchListData[watchlistTitle].map((data) => (
              <div
                key={data.id}
                className="stock_watchList_card_main_all_items_list"
              >
                <div className="stock_watchList_card_main_item_box">
                  <div className="stock_watchList_card_main_item_box_title">
                    <span id="stock_watchList_card_main_item_box_title_name">
                      {data.companyName || "Tata Steel"}
                    </span>
                  </div>
                  <div className="stock_watchList_card_main_item_box_rate">
                    <span id="stock_watchList_card_main_item_box_rate_cost">
                      ₹{data.cost || "000.00"}
                    </span>
                    <span id="stock_watchList_card_main_item_box_rate_costPerRate">
                      {data.costPerRate || "0.00 (0.00%)"}
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
