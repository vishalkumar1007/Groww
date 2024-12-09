
import './FloatSearchStock.css';
import SearchStock from '../SearchStock/SearchStock';

const FloatSearchStock = ()=>{
    return(
        <div className="FloatSearchStock_main">
            <div className="FloatSearchStock_main_arrange_width">
                <div className="FloatSearchStock_main_title_head">
                    <p>Search Your favorite Stocks</p>
                </div>
                <div className="FloatSearchStock_main_arrange_width_for_search">
                    <SearchStock/>
                </div>
            </div>
        </div>
    )
}

export default FloatSearchStock;