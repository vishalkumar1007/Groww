import './UnexpectedError.css';
import un_expected_error_icon from '../../assets/svg/am_icon/error.svg';

const UnexpectedError = ()=>{
    return(
        <div className='un_expected_error_main'>
            <div className="un_expected_error_main_svg_and_text">
                <div className="un_expected_error_main_svg_box">
                    <div className="un_expected_error_main_svg_box_arrange_width">
                        <img src={un_expected_error_icon} alt="" />
                    </div>
                </div>
                <div className="un_expected_error_main_text">
                    <div className="un_expected_error_main_text_box_arrange_width">
                        <span id='un_expected_error_working'>Unexpected Error</span>
                        <span id='un_expected_error_text'>Sorry</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UnexpectedError;