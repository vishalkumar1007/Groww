import './PageNotFound.css';
import page_not_found_icon from '../../assets/svg/am_icon/page_not_found_error_unplugin.svg';

const PageNotFound = ()=>{
    return(
        <div className='page_not_found_main'>
            <div className="page_not_found_main_svg_and_text">
                <div className="page_not_found_main_svg_box">
                    <div className="page_not_found_main_svg_box_arrange_width">
                        <img src={page_not_found_icon} alt="" />
                    </div>
                </div>
                <div className="page_not_found_main_text">
                    <div className="page_not_found_main_text_box_arrange_width">
                        <span id='page_not_found_working'>This page not exist on this site</span>
                        <span id='page_not_found_text'>Wrong Path</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PageNotFound;