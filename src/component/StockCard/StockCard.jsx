import './StocksCard.css';

const StocksCard = ({title , cost , costPerRate})=>{
    return(
        <div className='stocksCard_main'>
            <div className="stocksCard_main_top">
                <div className="stocksCard_main_top_logo_and_add">
                    <div className="stocksCard_main_top_logo">
                        
                    </div>
                    <div className="stocksCard_main_top_add">
                        <div className="stocksCard_main_top_add_circle">
                            <div className="stocksCard_main_top_add_horizontal_line"></div>
                            <div className="stocksCard_main_top_add_vertical_line"></div>
                        </div>
                    </div>
                </div>
                <div className="stocksCard_main_top_left_title">{title || 'Ola Electric Mobility'}</div>
                
            </div>
            <div className="stocksCard_main_bottom">
                <div className="stocksCard_main_bottom_cost">₹{ cost || '123.19'}</div>
                <div className="stocksCard_main_bottom_costPerRate">{costPerRate || '0.00 (0.00%)'}</div>
            </div>
        </div>
    )
}

export default StocksCard;