import { useEffect, useState, useRef } from "react";
import "./SearchStock.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllStockApiThunk,
  selectorAllStockApiData,
  //   selectorAllStockApiIsLoading,
  //   selectorAllStockApiIsError,
} from "../../features/api_lab/allStockHeadApiData/centralExportAllStockHeadApiData";
import StockMarketCap from "../StockMarketCap/StockMarketCap";

const SearchStock = ({ RemoveAddToCardFeature = false }) => {
  //   const x =
  const dispatch = useDispatch();
  const [isActiveInputOfSearch, setIsActiveInputOfSearch] = useState(false);
  const allStockHeadData = useSelector(selectorAllStockApiData);
  const [searchDivHeight, setSearchDivHeight] = useState(0);
  const [constDataOfSearchHeight, setConstDataOfSearchHeight] = useState(0);
  const getHeightOFSearchResult = useRef(0);
  const [userInputStockSearchValue, setUserInputStockSearchValue] =
    useState("");
  const [showStockData, setShowStockData] = useState([]);

  useEffect(() => {
    if (allStockHeadData.length === 0) {
      dispatch(fetchAllStockApiThunk());
    }
  }, [allStockHeadData, dispatch]);

  useEffect(() => {
    if (getHeightOFSearchResult.current) {
      const heightOfDiv =
        getHeightOFSearchResult.current.getBoundingClientRect().height;
      setConstDataOfSearchHeight(heightOfDiv);
    }
  }, [showStockData, allStockHeadData]);

  useEffect(() => {
    if (isActiveInputOfSearch) {
      setSearchDivHeight(constDataOfSearchHeight);
    }
  }, [constDataOfSearchHeight, isActiveInputOfSearch]);

  useEffect(() => {
    if (allStockHeadData.length > 0 && userInputStockSearchValue.length > 0) {
      const searchDataArray = [];
      for (let i = 0; i < allStockHeadData.length; i++) {
        const indexData = allStockHeadData[i].stock_id.toLowerCase();
        let makeItAdd = true;
        for (let j = 0; j < userInputStockSearchValue.length; j++) {
          if (indexData[j] !== userInputStockSearchValue[j]) {
            makeItAdd = false;
          }
        }
        if (makeItAdd) {
          searchDataArray.push(allStockHeadData[i]);
        }
      }
      setShowStockData(searchDataArray);
    } else {
      if (allStockHeadData.length > 0) {
        const data = allStockHeadData.slice(0, 5);
        setShowStockData(data);
      }
    }
  }, [allStockHeadData, userInputStockSearchValue]);

  const handelInputActivate = () => {
    setIsActiveInputOfSearch(true);
    setSearchDivHeight(constDataOfSearchHeight);
  };

  const handelInputDeactivate = () => {
    setIsActiveInputOfSearch(false);
    setSearchDivHeight(0);
    setUserInputStockSearchValue("");
  };

  return (
    <div className="searchStock_main_search_container">
      <div className="searchStock_search">
        <div className="searchStock_search_action">
          <div className="searchStock_search_icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7e7e7e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div className="searchStock_search_action_main">
            <input
              type="text"
              placeholder="What are you looking for today?"
              onFocus={() => {
                handelInputActivate();
              }}
              onChange={(e) => {
                setUserInputStockSearchValue(e.target.value.toLowerCase());
              }}
              value={userInputStockSearchValue}
            />
          </div>
        </div>
        {isActiveInputOfSearch ? (
          <div
            className="searchStock_search_result_contain_box_close_button"
            onClick={() => {
              handelInputDeactivate();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c75f4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 9-6-6-6 6" />
              <path d="M12 3v14" />
              <path d="M5 21h14" />
            </svg>
          </div>
        ) : null}
      </div>
      {isActiveInputOfSearch?<div className="searchStock_search_result_count_show">{showStockData.length} search result</div>:null}
      <div
        className="searchStock_search_result_main_full_screen"
        onClick={() => {
          handelInputDeactivate();
        }}
        style={{
          height: `${searchDivHeight === 0 ? 0 : 600}px`,
        }}
      ></div>
      <div
        className="searchStock_search_result_main"
        id={isActiveInputOfSearch ? "searchStock_search_result_main_id" : null}
        style={{
          height: `${searchDivHeight}px`,
          background: "white",
        }}
        // ref={getHeightOFSearchResult}
      >
        <div
          className="searchStock_search_result_contain_box"
          ref={getHeightOFSearchResult}
        >
          {showStockData.length > 0 ? (
            showStockData.map((stockData) => (
              <StockMarketCap
                key={stockData._id}
                cost={stockData.stockCost}
                costPerRate={stockData.stockCostPerRate}
                stockId={stockData.stock_id}
                uniqueId={stockData._id}
                title={stockData.name}
                logoUrl={stockData.logoUrl}
                RemoveAddToCardFeature={RemoveAddToCardFeature}
              />
            ))
          ) : (
            <NoDataComponent userInput={userInputStockSearchValue} />
          )}
        </div>
      </div>
    </div>
  );
};

const NoDataComponent = ({ userInput }) => {
  return (
    <div className="searchStock_nodata_show_main">
      <div className="searchStock_nodata_message_box">
        <p>
          Oops, not found any<span>`{userInput}`</span> stock
        </p>
      </div>
    </div>
  );
};

export default SearchStock;