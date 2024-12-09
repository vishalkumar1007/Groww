import './StockCardLoader.css';

const StockCardLoader = () => {
  return (
    <div className="stockCardLoader_main">
      <div className="stockCardLoader_main_top">
        <div className="stockCardLoader_main_top_logo_and_add">
          <div className="stockCardLoader_main_top_logo">
            <div className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </div>
          </div>
          <div className="stockCardLoader_main_top_add">
            <div className="stockCardLoader_main_top_add_arrange_width">
                <div className='stockCardLoader_main_loading_animation_main'>
                    <span id='stockCardLoading_animation_span'></span>
                </div>
            </div>
          </div>
        </div>
        <div className="stockCardLoader_main_top_left_title">
            <div className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </div>
        </div>
      </div>
      <div className="stockCardLoader_main_bottom">
        <div className="stockCardLoader_main_bottom_cost">
            <div className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </div>
        </div>
        <div className="stockCardLoader_main_bottom_costPerRate">
            <div className='stockCardLoader_main_loading_animation_main'>
                <span id='stockCardLoading_animation_span'></span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StockCardLoader;