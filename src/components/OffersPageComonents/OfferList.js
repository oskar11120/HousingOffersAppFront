import React from "react";
import Offer from "./OfferListItem";

const OfferList = props => 
{
    const offers = props.offers;

    return (
        <div>
            {offers.map(offer => <Offer data={offer}/>)}
        </div>
    );
}

export default OfferList;