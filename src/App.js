import React from 'react';
import AdvertsPage from "./components/OffersPage";
import ForecastingAnalysisPage from "./components/ForecastingAnalysisPage";
import MyAccountPage from "./components/MyAccountPage";
import { Route } from "react-router-dom";
import Header from "./components/common/Header";
import LoginPage from './components/LoginPage';
import DetailedOfferPage from "./components/DetailedOfferPage";
import DetailedUserPage from "./components/DetailedUserPage";
import EditOfferPage from "./components/EditOfferPage";

const App = () =>
{
  const [getAuthorizationToken, setAuthorizationToken] = React.useState("");
  const [getMyId, setMyId] = React.useState(null);

  const handleAuthorizationRequest = (authBody) => 
  {
    setAuthorizationToken(authBody.token);
    setMyId(authBody.userId);
  }

 
  return (
    <div className="App">
      <Header/>
      <Route path = "/" exact render = {() => <AdvertsPage 
      getAuthorizationToken = {getAuthorizationToken} />}/>
      <Route path = "/ForecastingAnalysis" component = {ForecastingAnalysisPage}/>
      <Route path = "/MyAccount" render = {() => <MyAccountPage myId = {getMyId}/>}/>
      <Route path = "/Login" render = {() => <LoginPage handleAuthorizationToken = {handleAuthorizationRequest}/>}/>  
      <Route path = "/offers/:offerId" component={DetailedOfferPage}/>
      <Route path = "/users/:userId" exact component={DetailedUserPage}/>
      <Route path = "/users/:userId/offers/new" exact render={props => <EditOfferPage props={{...props}} getAuthorizationToken = {getAuthorizationToken} myId = {getMyId}/>}/>
      {/* <Route path = "/users/:userId/offers/:offerId" exact render={props => <EditOfferPage props={{...props}} getAuthorizationToken = {getAuthorizationToken} myId = {getMyId}/>}/> */}
    </div>
  ); 
}

export default App;

