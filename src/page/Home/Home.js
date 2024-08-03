import './Home.css';
import GrowwLogo from '../../assets/svg/groww-logo-light.svg'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
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
                        <button onClick={()=>{navigate('login')}}>Login/Register</button>
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
                                    <button onClick={()=>{navigate('login')}}>Login/Register</button>
                                </div>
                            </div>
                            :
                            ''
                    }

                </div>
                <div className='Home_body'>
                    <div className='Home_body_section_1'></div>
                    <div className='Home_body_section_2'></div>
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