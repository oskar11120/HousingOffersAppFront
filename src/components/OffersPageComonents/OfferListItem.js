import React from 'react';
import {base64} from "base64-img";
import {Redirect} from "react-router-dom";

const OfferListItem = props => 
{
    //offer to obiekt zawierajacy wszystkie dane odnosnie oferty jakie otrzymasz
    //zeby podejrzec pola najlepiej zrobic breakpointa przed i debugowac clickajac f5
    const [getIsClcked, setIsClcked] = React.useState(false);

    const offer = props.data;   
    const onClick = event => 
    {
        setIsClcked(true);
    }

    return (
        <div style = {{
        height: 200,
        width: 1000
        }}>
            <div 
            onClick = {onClick} 
            style = {
            {cursor: "pointer", backgroundColor: "silver"}}>
                <div 
                className = "offerImage"
                style = {{float: "left", height: "100%"}}>
                    <img src={offer.images[0].value} style = {{height: 0.9*200}}/>
                    <OnClickRedirecter 
                    isClicked = {getIsClcked}
                    offerId = {offer.id}/>   
                </div>  

                <div
                style = {{
                    position: "relative",
                    float: "left",
                    height: 0.9*200,
                    padding: "0px 0px 15px 15px"
                    }}>
                    <h3>{offer.location.description}</h3>
                    <div>{offer.description}</div>
                    <div style = {
                        {color: "gray",
                        position: "absolute",
                        bottom: "5px"
                        }}>
                        {parseOfferTags(offer.offerTags)}
                        </div>
                </div>

                <div
                style = {{
                position: "relative",
                float: "left",
                height: 0.9*200,
                padding: "0px 0px 25px 25px"
                }}>
                    <h3 >{offer.priceInPLN + " zł"}</h3>
                    <h4>{offer.propertyType}</h4>
                    <h4>{offer.offerType}</h4>
                    <h4>{offer.area + " m^2"}</h4>
                    <h4>{offer.priceInPLN/offer.area + " zł/m^2"}</h4>
                </div>

            </div>
            <div style = {{height: 0.1*200, clear: "both"}}>{" "}</div>
        </div>
        
    );
}

export default OfferListItem;

const OnClickRedirecter = (props) => {
    return props.isClicked ? <Redirect to = {"/offers/" + props.offerId}/> : null;
}
const parseOfferTags = tags => tags.map(tag => tag.name + ": " + tag.value).join(", ");