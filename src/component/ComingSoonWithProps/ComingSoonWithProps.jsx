import './ComingSoonWithProps.css';
import coming_soon_icon from '../../assets/svg/am_icon/coming_soon_icon.svg';

const ComingSoonWithProps = ({title})=>{
    return(
        <div className='coming_soon_with_props_main'>
            <div className="coming_soon_with_props_main_svg_and_text">
                <div className="coming_soon_with_props_main_svg_box">
                    <div className="coming_soon_with_props_main_svg_box_arrange_width">
                        <img src={coming_soon_icon} alt="" />
                    </div>
                </div>
                <div className="coming_soon_with_props_main_text">
                    <div className="coming_soon_with_props_main_text_box_arrange_width">
                        <span id='coming_soon_with_props_working'>We are working on {title} page</span>
                        <span id='coming_soon_with_props_text'>We will make it live Soon</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ComingSoonWithProps;