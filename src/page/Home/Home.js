import './Home.css';
import GrowwLogo from '../../assets/svg/groww-logo-light.svg';
import Home_img from '../../assets/img/home_image_intro.png'
import Mobile_image from '../../assets/img/stocksBuy.5382418f.webp'
import indian_market_building from '../../assets/img/indianMarketBuilding.a399b6f2.webp'
import Stocks_icon from '../../assets/img/stocksHistogram.1c5dd346.webp'
import Mutual_icon from '../../assets/img/mutualFundBlocks.ee53101c.webp'
import Future_icon from '../../assets/img/fnoClock.0c7a0775.webp'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false);

    return (
        <>
            <div className='HomeMain'>
                <div className='Home_navbar'>
                    <div className="Home_nav_logo">
                        <div className='Home_nav_logo_handel'>
                            <img src={GrowwLogo} alt="" />
                        </div>
                    </div>
                    <div className="Home_nav_search">
                        <input type="text" placeholder='What are you looking for today' />
                    </div>
                    <div className="Home_nav_register" >
                        <button onClick={() => { navigate('login') }}>Login/Register</button>
                    </div>
                    <div className='Home_three_line_nav' onClick={() => { setMenuActive(!menuActive) }}>
                        {
                            menuActive ?
                                <svg id='svgMenu1' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                :
                                <svg id='svgMenu2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        }
                    </div>
                    {
                        menuActive ?
                            <div className='Home_three_menu_bar'>
                                <div className="Home_nav_register_menu">
                                    <button onClick={() => { navigate('login') }}>Login/Register</button>
                                </div>
                            </div>
                            :
                            ''
                    }

                </div>
                <div className='Home_body'>
                    <div className='Home_body_section_1'>
                        <div className='Home_body_section_1_text'>
                            <div className='Home_body_section_1_text_top'>
                                <p>All things finance,</p>
                                <p>Right here.</p>
                            </div>
                            <div className='Home_body_section_1_text_mid'>
                                <p>Build for growing India</p>
                            </div>
                            <div className='Home_body_section_1_text_btn'>
                                <button onClick={() => { navigate('login') }}>Get Started</button>
                            </div>
                        </div>
                        <div className='Home_body_section_1_image'>
                            <div className='Home_body_section_1_image_arrange'>
                                <img src={Home_img} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='Home_body_section_2'>
                        <div className='Home_body_section_2_pd_horizontal'>
                            <div className='Home_body_section_2_left'>
                                <div className='Home_body_section_2_left_contain'>
                                    <div className='Home_body_section_2_left_contain_icon_div'>
                                        <div className='Home_body_section_2_left_contain_icon_div_img'>
                                            <img src={indian_market_building} alt="" />
                                        </div>
                                    </div>
                                    <div className='Home_body_section_2_left_contain_title_div'>
                                        <div className='Home_body_section_2_left_contain_title'>
                                            <p>Indian markets at </p>
                                            <p>your fingertips.</p>
                                        </div>
                                    </div>
                                    <div className='Home_body_section_2_left_contain_tagline_div'>
                                        <div className='Home_body_section_2_left_contain_tagline'>
                                            <p>Long-term or short-term, high risk or low risk. Be the kind of investor you want to be.</p>
                                        </div>
                                    </div>
                                    <div className='Home_body_section_2_left_contain_stock_option_div'>
                                        <div className='Home_body_section_2_left_contain_stock_option_div_arrange'>
                                            <div className='Home_body_section_2_left_contain_stock_option_1'>
                                                <div className='Home_body_section_2_left_contain_stock_option_1_div'>
                                                    <button className='Home_body_section_2_left_contain_stock_option_1_div_btn'>
                                                        <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_arrange'>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_icon'>
                                                                <img src={Stocks_icon} alt="" />
                                                            </div>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_title'>
                                                                <p>Stocks & Intraday</p>
                                                            </div>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_arrow'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='Home_body_section_2_left_contain_stock_option_2'>
                                                <div className='Home_body_section_2_left_contain_stock_option_1_div'>
                                                    <button className='Home_body_section_2_left_contain_stock_option_1_div_btn'>
                                                        <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_arrange'>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_icon'>
                                                                <img src={Mutual_icon} alt="" />
                                                            </div>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_title'>
                                                                <p>Stocks & Intraday</p>
                                                            </div>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_arrow'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='Home_body_section_2_left_contain_stock_option_3'>
                                                <div className='Home_body_section_2_left_contain_stock_option_1_div'>
                                                    <button className='Home_body_section_2_left_contain_stock_option_1_div_btn'>
                                                        <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_arrange'>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_icon'>
                                                                <img src={Future_icon} alt="" />
                                                            </div>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_title'>
                                                                <p>Stocks & Intraday</p>
                                                            </div>
                                                            <div className='Home_body_section_2_left_contain_stock_option_1_div_btn_arrow'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='Home_body_section_2_right'>
                                <div className='Home_body_section_2_right_mobile_div'>
                                    <img src={Mobile_image} alt="" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='Home_body_section_3'></div>
                    <div className='Home_body_section_4'></div>
                    <div className='Home_body_section_5'></div>
                </div>
                <div className='Home_footer'>
                    <div className="Home_footer_main"></div>
                    <div className="Home_footer_build_with_love"></div>
                </div>

            </div>
        </>
    )
}

export default Home;