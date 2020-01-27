import React from "react";
import {getOfferById} from "../utils/housingOffersApiAxiosClient";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./detailedOfferPage.css";

const DetailedOfferPage = props => 
{
    const offerId = props.match.params.offerId;

    const [getOffer, setOffer] = React.useState(null);
    const [getError, setError] = React.useState(null);

    const onSuccessGetOfferRequest = response => {
        setOffer(response.data);
    }
    const onFailureGetOfferRequest = error => {
        setError(error);
    }

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
    else if(getOffer != null)
    {
        const images = getOffer.images.map(image => {return {"original": image.value}});

        return (
        <div style = {{
            padding: "60px"
        }}>
            {/* w tym miejscu ma znajdowac sie cala oferta za szegolami */}

            <div style={{width:"800px", float: "left"}}>
                    <ImageGallery items={images} />
                </div>

            <div style={{float: "left", marginLeft: "40px", width: "800px"}}> 
                <div style = {{float: "left", marginRight: "10%"}}>
                    <h3>{getOffer.propertyType}</h3>
                    <h1 style = {{marginTop: 0}}>{getOffer.location != null ? getOffer.location.description : null}</h1>
                    <h3>{getOffer.area + " m^2"}</h3>
                </div>

                <div style = {{float: "left"}}>
                    <h3>Cena</h3>
                    <h1 style = {{marginTop: 0}}>{getOffer.priceInPLN + " zł"}</h1>
                    <h3>{getOffer.priceInPLN/getOffer.area + " zł/m^2"}</h3>
                </div>

                <div style = {{float: "left", width: "100%"}}>
                    <h2>Opis</h2>
                    <h3>
                        {getOffer.description}
                    </h3>
                </div>

                <div style = {{float: "left", width: "100%"}}>
                    <h3>Tagi</h3>
                    {getOffer.offerTags.map(offerTag => <h4>{offerTag.name + ": " + offerTag.value}</h4>)}
                </div>

            </div>

            <div style = {{clear: "both"}}></div>

        </div> 
        );
    } 
    else
    {
        return <div>loading...</div>
    }
}

export default DetailedOfferPage;
