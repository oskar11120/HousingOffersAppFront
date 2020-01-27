import React from 'react';
import CirceLoader from 'react-spinners/ClipLoader';

//returns user message if data is loading or an error happens
const BuildUserMessage = (responseData, width, height, shouldDisplayErrorMessage) => 
{
    if(responseData.isLoading) return <div style = {{clear: "both", padding: 30, height: height, textAlign: "center"}}>
        <CirceLoader
          sizeUnit={"px"}
          size={50}
          color={'#123abc'}
        />
    </div>; 
    else if(!responseData.hasDoneFirstRequest)
    {
        if(!shouldDisplayErrorMessage) return null;
        else return <div style = {{clear: "both", textAlign: "center", fontSize: "20px", height: height}}><br/>You are now logged in.<br/>Use the form to select information that interests you and click submit!</div>;
    } 
    else if(responseData.isError)
    {
        if(!shouldDisplayErrorMessage) return null;
        else if(responseData.data.response.status === 401) return <div style = {{clear: "both", textAlign: "center", fontSize: "20px", height: height}}> <br/>You are not logged in. Please log in before using the app.</div>;
        else return <div style = {{clear: "both", textAlign: "center", fontSize: "20px", height: height}}><br/>An error occured. Please try again later.</div>;
    }
}

export default BuildUserMessage;