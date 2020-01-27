import React from "react";
import {getOfferById} from "../utils/housingOffersApiAxiosClient";

const DetailedOfferPage = props => 
{
    const offerId = props.match.params.offerId;

    const [getOffer, setOffer] = React.useState(null);
    const [getError, setError] = React.useState(null);

    const onSuccessGetOfferRequest = request => setOffer(request.data);
    const onFailureGetOfferRequest = error => setError(error);

    React.useEffect(
        () => {
            getOfferById(onSuccessGetOfferRequest, onFailureGetOfferRequest, offerId);
            return () => {};
        }, []
    );

    if(getError != null)
    {
        return (
            <h2>
                {getError.response.status}
            </h2>
        );
    }
    else 
    {
        return (
            <div>
                {/* w tym miejscu ma znajdowac sie cala oferta za szegolami */}
                {JSON.stringify(getOffer)};
            </div> 
        );
    } 
}

export default DetailedOfferPage;
