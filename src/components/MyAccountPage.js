import React from 'react';
import OfferList from "./OffersPageComonents/OfferList";
import {findOffers} from "../utils/housingOffersApiAxiosClient";
import {Redirect} from "react-router-dom";

const MyAccountPage = props =>
{
    const myId = props.myId;

    const [getMyOffers, setMyOffers] = React.useState([]);
    const onSucessFindOffersRequest = response => setMyOffers(response.data);
    const onFailureFindOffersRequest = error => console.log(error);
    const requestBody = {
        userId: myId
    }

    const [getCreateNewOffer, setCreateNewOffer] = React.useState(false);
    const onNewOfferButtonClick = event => setCreateNewOffer(true);

    React.useEffect(() => {
        if(myId != null)
            findOffers(onSucessFindOffersRequest, onFailureFindOffersRequest, requestBody);
        return () => {};
    }, [])

    return (
        <div>         
            <OnNoIdRedirecter myId={myId}/>  
            <OnCreateNewOfferRedirecter createNewOffer = {getCreateNewOffer} myId = {myId}/>

            <h1>Moje oferty</h1>
            <button onClick = {onNewOfferButtonClick}>Nowa oferta</button>
            <OfferList 
            offers = {getMyOffers}/>            
        </div>
    );
}

export default MyAccountPage;

const OnNoIdRedirecter = props => props.myId == null ? <Redirect to="/"/> : null;
const OnCreateNewOfferRedirecter = props => props.createNewOffer ? <Redirect to={"/users/" + props.myId + "/offers/new"}/> : null;