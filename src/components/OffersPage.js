import React from 'react';
import MainForm from "./OffersPageComonents/MainForm";
import OfferList from "./OffersPageComonents/OfferList";

const AdvertsPage = (props) =>
{
  const [getUserInputs, setUserInputs] = React.useState(
    {
    "PriceLimits": null,
    "AreaLimits": null,
    "PropertyTypes": ["Mieszkanie"],
    "OfferTypes": ["Sprzedarz"],
    "Zone": "Kraków",
    "Location": 
    {
      "longitude": 10.0,
      "lattitue": 5.1
    },
    "MaxDistanceFromLocation": null
  });
  const [getOffers, setOffers] = React.useState([]);
  const onSuccessFindOffersRequest = response => {
    setOffers(response.data)
  };
  const onFailureFindOffersRequest = error => console.log(error);
  
  return (
    <div >     
        <MainForm
        getUserInputs = {getUserInputs}
        setUserInputs = {setUserInputs}
        onSuccessFindOffersRequest = {onSuccessFindOffersRequest}
        onFailureFindOffersRequest = {onFailureFindOffersRequest}
        />

        <OfferList 
        offers = {getOffers}
        />
    </div>
  ); 
}

export default AdvertsPage;

