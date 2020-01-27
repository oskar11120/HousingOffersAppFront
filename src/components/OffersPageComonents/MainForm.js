import {Form, Button} from "react-bootstrap";
import React from 'react';
import "./Form.css";
import {propertyTypeSelectOptions, offerTypeSelectOptions, zoneSelectOptions} from "../../appSettings";
import * as requests from "../../utils/housingOffersApiAxiosClient";

const MainForm = (props) =>
{ 
    const getUserInputs = props.getUserInputs;
    const setUserInputs = props.setUserInputs;
    const onSuccessFindOffersRequest = props.onSuccessFindOffersRequest;
    const onFailureFindOffersRequest = props.onFailureFindOffersRequest;
      
    const onZoneSelectChange = event => {setUserInputs({...getUserInputs, Zone: event.target.value})};
    const onOfferTypeSelectChange = (eventArgs) => {
        let newMultipleInput = getUserInputs.OfferTypes;       
        if (newMultipleInput.includes(eventArgs.target.value)) newMultipleInput = newMultipleInput.filter(option => option !== eventArgs.target.value);
        else newMultipleInput = [...newMultipleInput, eventArgs.target.value];

        if (newMultipleInput.length === 0) return;
        setUserInputs({...getUserInputs, OfferTypes: newMultipleInput});
    }
    const onPropertyTypeSelectChange = (eventArgs) => {
        let newMultipleInput = getUserInputs.PropertyTypes;       
        if (newMultipleInput.includes(eventArgs.target.value)) newMultipleInput = newMultipleInput.filter(option => option !== eventArgs.target.value);
        else newMultipleInput = [...newMultipleInput, eventArgs.target.value];

        if (newMultipleInput.length === 0) return;
        setUserInputs({...getUserInputs, PropertyTypes: newMultipleInput});
    }

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        console.log("request sent");
        requests.findOffers(onSuccessFindOffersRequest, onFailureFindOffersRequest, getUserInputs);
    }
    
    return (
        <Form onSubmit = {handleSubmit} id = "topForm">
        <Form.Group controlId="zoneSelect" className = "formElement">
            <Form.Label>Miasto</Form.Label>
            <Form.Control as="select" value = {getUserInputs.Zone} onChange = {onZoneSelectChange}>
            {zoneSelectOptions.map(zoneOption => <option key={zoneOption}>{zoneOption}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="offerSelect" className = "formElement">
            <Form.Label>Typ ogłoszenia</Form.Label>
            <Form.Control as="select" multiple value = {getUserInputs.OfferTypes} onChange = {onOfferTypeSelectChange}>
            {offerTypeSelectOptions.map(offerTypeOption => <option key={offerTypeOption}>{offerTypeOption}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="propertyTypeSelect" className = "formElement">
            <Form.Label>Typ Oferty</Form.Label>
            <Form.Control as="select" multiple value = {getUserInputs.PropertyTypes} onChange = {onPropertyTypeSelectChange}>
            {propertyTypeSelectOptions.map(propertyTypeOption => <option key={propertyTypeOption}>{propertyTypeOption}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group style = {{marginTop: "40px"}} controlId="ControlSelect4" className = "formElement">
            <Button type = "submit" >Szukaj</Button>
        </Form.Group>
        </Form>
    );
}
export default MainForm;