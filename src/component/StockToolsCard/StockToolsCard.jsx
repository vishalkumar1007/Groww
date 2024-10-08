
import './StockToolsCard.css'
import { useNavigate } from 'react-router-dom';

const StockToolsCard = ({iconUrl , title='Title' , redirect='/'})=>{
    const navigator = useNavigate();
    return(
        <div className="stock_tool_card_main" onClick={()=>{navigator(redirect)}}>
            <div className="stock_tool_card_main_top_icon">
                <div className="stock_tool_card_main_top_icon_resize_icon">
                    <img src={iconUrl} alt="" />
                </div>
            </div>
            <div className="stock_tool_card_main_bottom_title">
                <span>{title}</span>
            </div>
        </div>
    )
}

export default StockToolsCard;