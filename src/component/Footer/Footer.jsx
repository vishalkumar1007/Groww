import GrowwLogo from '../../assets/svg/groww-logo-light.svg';
import fb_logo from '../../assets/svg/fb_icon_groww.svg';
import insta_logo from '../../assets/svg/instagram_icon_groww.svg';
import twitter_logo from '../../assets/svg/twitter_icon_groww.svg';
import telegram_logo from '../../assets/svg/telegram_icon_groww.svg';
import youtube_logo from '../../assets/svg/yt_icon_groww.svg';
import googlePlay_icon from '../../assets/img/google-play-badge.webp';
import appStore_icon from '../../assets/img/app-store-logo.webp';
import './Footer.css';          

const Footer = ()=>{
    return(
        <div className='footerMain'>
            <div className='footerMain_screen_range'>
                <div className='footer_content_main'>
                    <div className='footer_content_main_contact'>
                        <div className='footer_content_main_contact_logo'>
                            <img src={GrowwLogo} alt="" />
                        </div>
                        <div className='footer_content_main_contact_location'>
                            <p>Vaishnavi Tech Park, 3rd & 4th Floor</p>
                            <p>Sarjapur Main Road, Bellandur</p>
                            <p>Bengaluru – 560103</p>
                            <p><a href="https://vishalkumar07.me/">Contact Us</a></p>
                        </div>
                        <div className='footer_content_main_contact_social_media'>
                            <span><img src={fb_logo} alt="" /></span>
                            <span><img src={insta_logo} alt="" /></span>
                            <span><img src={twitter_logo} alt="" /></span>
                            <span><img src={telegram_logo} alt="" /></span>
                            <span><img src={youtube_logo} alt="" /></span>
                        </div>
                    </div>
                    <div className='footer_content_main_products'>
                        <div className='footer_content_main_products_heading'>
                            <p>PRODUCTS</p>
                        </div>
                        <div className='footer_content_main_products_links'>
                            <div className='footer_content_main_products_links_Stocks'>
                                <p>Stocks</p>
                            </div>
                            <div className='footer_content_main_products_links_futureAndOptions'>
                                <p>Future & Options</p>
                            </div>
                            <div className='footer_content_main_products_links_IPO'>
                                <p>IPO</p>
                            </div>
                            <div className='footer_content_main_products_links_MutualFunds'>
                                <p>Mutual Funds</p>
                            </div>
                            <div className='footer_content_main_products_NFO'>
                                <p>NFO</p>
                            </div>
                        </div>
                    </div>
                    <div className='footer_content_main_groww'>
                        <div className='footer_content_main_groww_heading'>
                            <p>GROWW</p>
                        </div>
                        <div className='footer_content_main_groww_links'>
                            <div className='footer_content_main_groww_links_about_us'>
                                <p>About us</p>
                            </div>
                            <div className='footer_content_main_groww_links_pricing'>
                                <p>Pricing</p>
                            </div>
                            <div className='footer_content_main_groww_links_blogs'>
                                <p>Blogs</p>
                            </div>
                            <div className='footer_content_main_groww_links_careers'>
                                <p>Careers</p>
                            </div>
                            <div className='footer_content_main_groww_links_media_and_press'>
                                <p>Media & Press</p>
                            </div>
                        </div>
                    </div>
                    <div className='footer_content_main_quickLink'>
                        <div className='footer_content_main_quickLink_heading'>
                            <p>QUICKS LINKS</p>
                        </div>
                        <div className='footer_content_main_quickLink_links'>
                            <div className='footer_content_main_quickLink_links_amcMutualFund'>
                                <p>AMC Mutual Fund</p>
                            </div>
                            <div className='footer_content_main_quickLink_links_calculator'>
                                <p>Calculator</p>
                            </div>
                            <div className='footer_content_main_quickLink_links_glossary'>
                                <p>Glossary</p>
                            </div>
                            <div className='footer_content_main_quickLink_links_sitemap'>
                                <p>Sitemap</p>
                            </div>
                            <div className='footer_content_main_quickLink_links_growwDigits'>
                                <p>Groww Digits</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer_build_with_love'>
                    <div className='footer_build_with_love_text'>
                        <p>&#169; 2024 Groww. All right reserved, Build by Vishal <span id='footer_love_with_india_red_heard_text'>♥</span> in India</p>
                    </div>
                    <div className='footer_build_with_love_logo'>
                        <div className='footer_build_with_love_logo_googlePlay'>
                            <img src={googlePlay_icon} alt="" />
                        </div>
                        <div className='footer_build_with_love_logo_appStore'>
                            <img src={appStore_icon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;