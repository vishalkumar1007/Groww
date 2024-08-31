import { useEffect } from 'react';
import {useState} from 'react'
import './ShareholdingPatternCard.css'

const ShareholdingPatternCard = ({title , percentage})=>{
    const [validPercentage , setValidPercentage] = useState(0);

    useEffect(()=>{
        if(percentage<0){
            setValidPercentage(0);
        }
        else {
            let increase = 0;
            const interval = setInterval(()=>{
                increase++;
                if(increase<=percentage && increase<=100){
                    setValidPercentage(increase);
                }else{
                    clearInterval(interval);
                }
            },12)
            return ()=> clearInterval(interval);
        }
    },[percentage])

    return(
        <div className='shareholder_patter_main'>
            <div className="shareholder_patter_head_div">
                <span id='shareholder_patter_head_title'> {title || 'title'}</span>
            </div>
            <div className="shareholder_patter_main_graph_and_rate_percentage">
                <div className="shareholder_patter_main_graph_div">
                    <div className="shareholder_patter_main_graph_fixed_range"></div>
                    <div className="shareholder_patter_main_graph_flexible_show_data" style={{width:`${validPercentage}%`}}></div>
                </div>
                <div className="shareholder_patter_rate_percentage">
                    <span>{validPercentage||'0'}%</span>
                </div>
            </div>
        </div>
    )
}

export default ShareholdingPatternCard;