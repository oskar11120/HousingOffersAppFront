import React from "react";
import {getOfferById} from "../utils/housingOffersApiAxiosClient";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./detailedOfferPage.css";
import {propertyTypeSelectOptions, offerTypeSelectOptions, zoneSelectOptions} from "../appSettings";
import {Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageDropzone from "./MyAccountPageComponents/ImageDropzone";

const EditOfferPage = props => 
{
    const offerId = props.offerId;
    const myId = props.myId;
    const authorizationToken = props.authorizationToken;

    const [getOffer, setOffer] = React.useState({
        PriceInPLN: "",
        Area: "",
        OfferType: "",
        PropertyType: "dom",
        Description: "",
        Images: [],
        OfferTags: [],
        Location: {
                 Description: ""
            }
    });
    const [getError, setError] = React.useState(null);

    const onSuccessGetOfferRequest = response => {
        setOffer(response.data);
    }
    const onFailureGetOfferRequest = error => {
        setError(error);
    }

    const onSuccessfullImageDrop = data => {

        setOffer({...getOffer, Images: [...getOffer.Images, {value: data}]})
    };
    const onOfferTypeSelectChange = event => {setOffer({...getOffer, OfferType: event.target.value})};
    const onPropertyTypeSelectChange = event => {setOffer({...getOffer, PropertyType: event.target.value})};
    const onPriceInPLNChange = event => {setOffer({...getOffer, PriceInPLN: event.target.value})};
    const onAreaInPLNChange = event => {setOffer({...getOffer, Location: {Description: event.target.value}})};
    const onAdressInPLNChange = event => {setOffer({...getOffer, Adress: event.target.value})};
    const onDescriptionInPLNChange = event => {setOffer({...getOffer, Description: event.target.value})};

    React.useEffect(
        () => {
            if(typeof offerId != "undefined")
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

        return (
        <div 
        style = {{
            padding: "60px"
        }}>       
            <Form> 
                <div style={{width:"800px", minHeight: "450px", float: "left"}}>
                        <ImageGallery  
                        items = {getOffer.Images.map(image => {original: image.value})}/>
                        <ImageDropzone 
                        onSuccessfullDrop = {onSuccessfullImageDrop}
                        style = {{height: "450px"}}/>
                    </div>

                <div style={{float: "left", marginLeft: "40px", width: "800px"}}> 
                    <div style = {{float: "left", marginRight: "10%"}}>
                        <Form.Group controlId="propertyTypeSelect">

                            <h3 style = {{marginTop: "0px"}}>Podstawowe</h3>
                            <Form.Control 
                            as="select" 
                            value = {getOffer.propertyType} 
                            onChange = {onPropertyTypeSelectChange}>
                                {propertyTypeSelectOptions.map(propTypeOption => <option key={propTypeOption}>{propTypeOption}</option>)}
                            </Form.Control>

                            <Form.Control 
                            type="text"
                            placeholder="Adres" 
                            value={getOffer.Location.Description}/>

                            <Form.Control 
                            type="text"
                            placeholder="Powierzchnia (m^2)" 
                            value={getOffer.Area}/>

                        </Form.Group>                       
                    </div>     

                    <div style = {{float: "left", marginRight: "10%"}}>
                    <Form.Group controlId="propertyTypeSelect">
                        <h3 style = {{marginTop: "0px"}}>Cena</h3>
                        <Form.Control 
                        type="text"
                        placeholder="Cena" 
                        value={getOffer.PriceInPLN}/>
                    </Form.Group>
                    </div>           

                    <div style = {{clear: "both"}}>
                    <Form.Group controlId="propertyTypeSelect">
                        <h3 style = {{marginTop: "0px"}}>Opis</h3>
                        <Form.Control 
                        as="textarea"
                        placeholder="Opis" 
                        value={getOffer.Description}/>
                    </Form.Group>
                    </div>   

                    <div>
                    <Form.Group controlId="propertyTypeSelect">
                        <Button
                        type = "submit">
                            Gotowe
                        </Button>
                    </Form.Group>
                    </div> 

                </div>

                <div style = {{clear: "both"}}></div>
            </Form>    
        </div> 
        );
    } 
    else
    {
        return <div>loading...</div>
    }
}

export default EditOfferPage;
