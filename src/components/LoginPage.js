import {Form, Button} from "react-bootstrap";
import React from 'react';
import "./LoginPage.css";
import {Redirect} from "react-router-dom";
import {login} from "../utils/housingOffersApiAxiosClient";

const LoginPage = (props) =>
{
    const handleAuthorizationToken = props.handleAuthorizationToken;
    const [getIsLoginValid, setIsLoginValid] = React.useState(null);

    const loginInput = React.useRef();
    const passwordInput = React.useRef();

    const handleSubmit = (eventArgs) => {
        eventArgs.preventDefault();
        login(onSuccessResponse, onFailureResponse, {
           Login: loginInput.current.value,
           Password: passwordInput.current.value,
        });
        };
    const onSuccessResponse = (eventArgs) => 
    {
        handleAuthorizationToken(eventArgs.data);
        setIsLoginValid(true);
    }
    const onFailureResponse = (eventArgs) =>
    {
        setIsLoginValid(false);
    }  

    return(
        <Form className = "LoginForm">
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref = {loginInput}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref = {passwordInput}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick = {handleSubmit}>
            Submit
        </Button>

        <ErrorMessage getIsLoginValid = {getIsLoginValid}/>
        <SucessMessage getIsLoginValid = {getIsLoginValid}/>

        <OnSucessRedirecter getIsLoginValid = {getIsLoginValid}/>
        </Form>
    );
}

const ErrorMessage = (props) =>  (props.getIsLoginValid === null || props.getIsLoginValid) ? null : <span className = "ErrorMessage">Invalid login or password!</span>;
const SucessMessage = (props) => props.getIsLoginValid ? <span className = "SucessMessage">Sucessfully logged in!</span> : null;
const OnSucessRedirecter = (props) => props.getIsLoginValid? <Redirect to = "/"/> : null;

export default LoginPage;