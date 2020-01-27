import React from 'react';
import {NavLink} from "react-router-dom";
import "./Header.css";

const Header = () =>
{
    const activeStyle = {borderTop: "5px solid cornflowerblue", color: "beige"};
    return(
        <nav>
            <h4 className = "logo"> Ogłoszenia </h4>
            <NavLink className = "btn btn-dark btn-lg" activeStyle = {activeStyle} to = "/" exact> Szukaj </NavLink>
            <NavLink className = "btn btn-dark btn-lg" activeStyle = {activeStyle} to = "/ForecastingAnalysis"> Dodaj </NavLink>
            <NavLink className = "btn btn-dark btn-lg" style = {{borderRight: "1px solid black"}} activeStyle = {activeStyle} to = "/Exporting"> Moje konto </NavLink>

            <NavLink className = "btn btn-dark btn-lg" style = {{float: "right"}} activeStyle = {activeStyle} to = "/Login"> Zaloguj </NavLink>
        </nav>
    );
}

export default Header;