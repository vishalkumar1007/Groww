import './ComingSoon.css';
import coming_soon_icon from '../../assets/svg/am_icon/coming_soon_icon.svg';

const ComingSoon = ()=>{
    return(
        <div className='coming_soon_main'>
            <div className="coming_soon_main_svg_and_text">
                <div className="coming_soon_main_svg_box">
                    <div className="coming_soon_main_svg_box_arrange_width">
                        <img src={coming_soon_icon} alt="" />
                    </div>
                </div>
                <div className="coming_soon_main_text">
                    <div className="coming_soon_main_text_box_arrange_width">
                        <span id='coming_soon_working'>We are working on this page</span>
                        <span id='coming_soon_text'>Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ComingSoon;