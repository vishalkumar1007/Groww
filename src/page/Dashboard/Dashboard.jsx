import Navbar  from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import './Dashboard.css';
import { useState } from 'react';
const Dashboard =() =>{

    const [optionActive , setOptionActive] = useState('stocks');

    return(
        <div className='Dashboard_main'>
            <Navbar/>
            <div className='option_main_stock_and_mutualFund'>
                <div className='option_main_stock_and_mutualFund_Range_fixed'>
                    <div className='option_stocks' onClick={()=>{setOptionActive('stocks')}}>
                        <div className="option_stocks_title">
                            <p style={{color:optionActive==='stocks'?'#00b5a3':'#4a4848'}}>Stocks</p>
                        </div>
                        <div className="option_stocks_isActive" style={{backgroundColor:optionActive==='stocks'?'#00b5a3':'#ffffff'}}></div>
                    </div>
                    <div className='option_mutualFund' onClick={()=>{setOptionActive('mutualFund')}}>
                        <div className="option_mutualFund_title">
                            <p style={{color:optionActive==='mutualFund'?'#00b5a3':'#4a4848'}}>Mutual Fund</p>
                        </div>
                        <div className="option_mutualFund_isActive" style={{backgroundColor:optionActive==='mutualFund'?'#00b5a3':'#ffffff'}}></div>
                    </div>
                </div>
            </div>
            <div className='dashboard_main'>
                
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard