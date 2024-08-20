import StocksIndex from '../../component/StockIndex/StockIndex';
import './Stocks.css';

const Stocks = ()=>{
    return(
        <div className="stocks_main">
            <div className='stocks_width_arrange'>
                <div className="stocks_main_content_left">
                    <div className="stock_left_index">
                        <div className="stock_left_index_title">
                            <p>Index</p>
                            <p id='allIndices'>All indices</p>
                        </div>
                        <div className="stock_left_index_component_boxes">
                            <StocksIndex title='NIFTY 50' valueNo='24,705.57' valuePercentage='134.66 (0.56%)'/>
                            <StocksIndex title='SENSEX' valueNo='80,802.57' valuePercentage='137.18 (0.47%)'/>
                            <StocksIndex title='BANKNIFTY' valueNo='50,803.15' valuePercentage='434.66 (0.86%)'/>
                            <StocksIndex title='FINNIFTY' valueNo='12,645.47' valuePercentage='440.43 (0.32%)'/>
                            <StocksIndex title='MIDCPNIFTY' valueNo='11,105.21' valuePercentage='734.76 (0.56%)'/>
                            <StocksIndex title='BANKEX' valueNo='54,135.51' valuePercentage='114.45 (0.16%)'/>
                        </div>
                    </div>
                    <div className="stock_left_most_bought_on_groww">

                    </div>
                    <div className="stocks_left_product_and_tools">

                    </div>
                    <div className="stocks_left_top_gainers">
                        
                    </div>
                    <div className="stocks_left_in_news">

                    </div>
                    <div className="stocks_left_top_losers">

                    </div>
                    <div className="stocks_left_market_cap">

                    </div>
                </div>
                <div className="stocks_content_right">
                    <div className="stocks_content_right_yourInvestments">
                        <div className="stocks_content_right_yourInvestments_title_head">
                            <span id='scry_title_text'>Your Investments</span>
                            <span id='scry_more'>Dashboard</span>
                        </div>
                        <div className="stocks_content_right_yourInvestments_card_main">
                            <div className="stocks_content_right_yourInvestments_card_main_total_return">
                                <span id='stocks_content_right_yourInvestments_card_main_total_return_rupees'>₹0</span>
                                <span id='stocks_content_right_yourInvestments_card_main_total_return_title'>Total Returns</span>
                            </div>
                            <div className="stocks_content_right_yourInvestments_card_main_current_value">
                                <span id='stocks_content_right_yourInvestments_card_main_current_value_rupees'>₹0</span>
                                <span id='stocks_content_right_yourInvestments_card_main_current_value_title'>Current Value</span>
                            </div>
                        </div>
                    </div>

                    {/* coming soon feature */}

                    {/* <div className="stocks_content_right_watchLists">
                        <div className="stocks_content_right_watchLists_title_head">
                            <span id='scrw_title_text'>All watchlists</span>
                            <span id='scrw_more'>View all</span>
                        </div>
                        <div className="stocks_content_right_watchLists_card_main">

                        </div>
                    </div> */}

                    
                </div>
            </div>
        </div>
    )
};

export default Stocks;