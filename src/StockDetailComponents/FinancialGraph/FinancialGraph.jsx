import { useEffect, useState } from 'react';
import './FinancialGraph.css'

const FinancialGraph = ({value='0' , bar_percentage= 0})=>{
    const [barHeight , setBarHeight] = useState(0.2);
    const [isValueNegative , setIsValueNegative] = useState(false);
    useEffect(()=>{
        if(bar_percentage<0){
            setBarHeight(0);
        }else if(bar_percentage===0){
            setBarHeight(0.2)
        }else if(bar_percentage>100){
            setBarHeight(100)
        }else{
            setBarHeight(bar_percentage)

        }
    },[bar_percentage])


    useEffect(()=>{
        if(value){
            for (const element of value) {
                if(element==='-'){
                    setIsValueNegative(true);
                    break;
                }else{
                    setIsValueNegative(false);
                }
            }
        }
    },[value])


    // useEffect(()=>{
    //     console.log(isValueNegative)
    // },[])

    return(
        <div className='financial_graph_main'>
            <div className="financial_graph_main_title">
                <span>{bar_percentage===0?null:value}</span>
            </div>
            <div className={isValueNegative?'financial_graph_main_graph_bar_with_id':"financial_graph_main_graph_bar"} style={{height:`${barHeight}%`}} >

            </div>
        </div>
    )
}

export default FinancialGraph;