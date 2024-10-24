import "./StockMarketCapLoader.css";

const StockMarketCapLoader = ({ RemoveAddToCardFeature = false }) => {
  return (
    <div className="stockMarketCapLoader_main">
      <div className="stockMarketCapLoader_animation_company"
        style={{
            width:RemoveAddToCardFeature?'75%':'68%'
        }}
      >
        <div className="stockMarketCapLoader_animation_company_title">
          <div className="stockMarketCapLoader_main_animation_loader"></div>
        </div>
      </div>
      <div className="stockMarketCapLoader_animation_marketPrice"
        style={{
            width:RemoveAddToCardFeature?'25%':'16%'
        }}
      >
        <div className="stockMarketCapLoader_animation_marketPrice_cost"
            style={{
                width:RemoveAddToCardFeature?'50%':'80%'
            }}
        >
          <div className="stockMarketCapLoader_main_animation_loader" ></div>
        </div>
      </div>
      {RemoveAddToCardFeature ? null : (
        <div className="stockMarketCapLoader_animation_watchlist">
          <div className="stockMarketCapLoader_animation_watchlist_add">
            <div className="stockMarketCapLoader_main_animation_loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockMarketCapLoader;
