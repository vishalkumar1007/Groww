import { useEffect, useState } from 'react';
import './StocksCard.css';

const StocksCard = ({logoUrl ,title , cost , costPerRate})=>{
    const [isCostPerRateNegative , setIsCostPerRateNegative] = useState(false);

    useEffect(()=>{
        if(costPerRate.length>0){
            for (const element of costPerRate) {
                if(element==='-'){
                    setIsCostPerRateNegative(true);
                    break;
                }else{
                    setIsCostPerRateNegative(false);
                }
            }
        }
    },[costPerRate]);

    return(
        <div className='stocksCard_main'>
            <div className="stocksCard_main_top">
                <div className="stocksCard_main_top_logo_and_add">
                    <div className="stocksCard_main_top_logo">
                        <img src={logoUrl} alt="" />
                    </div>
                    <div className="stocksCard_main_top_add">
                        <div className="stocksCard_main_top_add_circle">
                            <div className="stocksCard_main_top_add_horizontal_line"></div>
                            <div className="stocksCard_main_top_add_vertical_line"></div>
                        </div>
                    </div>
                </div>
                <div className="stocksCard_main_top_left_title">{title || 'Stock Title'}</div>
                
            </div>
            <div className="stocksCard_main_bottom">
                <div className="stocksCard_main_bottom_cost">₹{ cost || '000.00' }</div>
                <div className="stocksCard_main_bottom_costPerRate" style={{color:isCostPerRateNegative?'#EB5B3C':(costPerRate===''?'#4a4a4a':'#00B386')}}>{costPerRate || '0.00 (0.00%)'}</div>
            </div>
        </div>
    )
}

export default StocksCard;