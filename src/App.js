import React from 'react';
import AdvertsPage from "./components/OffersPage";
import ForecastingAnalysisPage from "./components/ForecastingAnalysisPage";
import ExportingPage from "./components/ExportingPage";
import { Route } from "react-router-dom";
import Header from "./components/common/Header";
import LoginPage from './components/LoginPage';
import DetailedOfferPage from "./components/DetailedOfferPage";
import DetailedUserPage from "./components/DetailedUserPage";

const App = () =>
{
  const [getAuthorizationToken, setAuthorizationToken] = React.useState("");

  const handleAuthorizationToken = (newAuthorzationToken) => 
  {
    setAuthorizationToken(newAuthorzationToken);
  }


  return (
    <div className="App">
      <Header/>
      <Route path = "/" exact render = {() => <AdvertsPage 
      getAuthorizationToken = {getAuthorizationToken} />}/>
      <Route path = "/ForecastingAnalysis" component = {ForecastingAnalysisPage}/>
      <Route path = "/Exporting" component = {ExportingPage}/>
      <Route path = "/Login" render = {() => <LoginPage handleAuthorizationToken = {handleAuthorizationToken}/>}/>  
      <Route path = "/offers/:offerId" component={DetailedOfferPage}/>
      <Route path = "/users/:userId" component={DetailedUserPage}/>
    </div>
  ); 
}

export default App;

