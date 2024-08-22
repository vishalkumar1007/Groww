import './TopSector.css';

const TopSector=({title='',value=''})=>{
    return(
        <button className='top_sector_main'>
            <div className="top_sector_main_title">
                <span>{title || 'Title'}</span>
            </div>
            <div className="top_sector_main_line"></div>
            <div className="top_sector_main_value">
                <p>{value||'0'}</p>
            </div>
        </button>
    )
};

export default TopSector;