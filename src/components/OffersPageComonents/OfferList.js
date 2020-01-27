import React from "react";
import Offer from "./OfferListItem";

const OfferList = props => 
{
    const offers = props.offers;    

    return (
        <div style = {{padding: 20}}>
            {offers.map(offer => <Offer data={offer} key={offer.id}/>)}
        </div>
    );
}

export default OfferList;