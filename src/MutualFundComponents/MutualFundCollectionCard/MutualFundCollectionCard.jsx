import './MutualFundCollectionCard.css';

const MutualFundCollectionCard = ({logoUrl='' , title})=>{
    return(
        <div className="mutual_fund_collection_card_main">
            <div className="mutual_fund_collection_card_main_icon">
                <div className="mutual_fund_collection_card_main_icon_main_box">
                    <img src={logoUrl} alt="icon" />    
                </div>
            </div>
            <div className="mutual_fund_collection_card_main_title">
                <p>{title||'Title'}</p>
            </div>  
        </div>
    )
}

export default MutualFundCollectionCard;