import './StockCardLoader.css';

const StockCardLoader = () => {
  return (
    <div className="stockCardLoader_main">
      <div className="stockCardLoader_main_top">
        <div className="stockCardLoader_main_top_logo_and_add">
          <div className="stockCardLoader_main_top_logo">
            <dis className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </dis>
          </div>
          <div className="stockCardLoader_main_top_add">
            <div className="stockCardLoader_main_top_add_arrange_width">
                <dis className='stockCardLoader_main_loading_animation_main'>
                    <span id='stockCardLoading_animation_span'></span>
                </dis>
            </div>
          </div>
        </div>
        <div className="stockCardLoader_main_top_left_title">
            <dis className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </dis>
        </div>
      </div>
      <div className="stockCardLoader_main_bottom">
        <div className="stockCardLoader_main_bottom_cost">
            <dis className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </dis>
        </div>
        <div className="stockCardLoader_main_bottom_costPerRate">
            <dis className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </dis>
        </div>
      </div>
    </div>
  );
};

export default StockCardLoader;