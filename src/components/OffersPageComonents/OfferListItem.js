import React from 'react';
import {base64} from "base64-img";
import {Redirect} from "react-router-dom";

const OfferListItem = props => 
{
    //offer to obiekt zawierajacy wszystkie dane odnosnie oferty jakie otrzymasz
    //zeby podejrzec pola najlepiej zrobic breakpointa przed i debugowac clickajac f5
    const [getIsClcked, setIsClcked] = React.useState(false);

    const offer = props.data;   

    return (
        <div onClick = {event => setIsClcked(true)}>
            <h2>{offer.description}</h2>
            <img src={offer.images[0].value}/>
            <OnClickRedirecter 
            isClicked = {getIsClcked}
            offerId = {offer.id}/>
            <button onClick = {event => setIsClcked(true)}>click me</button>
        </div>
    );
}

export default OfferListItem;

const OnClickRedirecter = (props) => props.isClcked ? <Redirect to = {"/offers/" + props.offerId}/> : null;