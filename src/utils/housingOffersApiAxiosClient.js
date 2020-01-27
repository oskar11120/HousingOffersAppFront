import axios from "axios";

//base
const baseUrl = "https://localhost:44328/api";


// find offers
const findOffersRequestBody = {
	"PriceLimits": null,
	"AreaLimits": null,
	"PropertyTypes": null,
	"OfferTypes": null,
	"OfferId": null,
	"UserId": null,
	"UserLogin": null,
	"Location": 
	{
		"longitude": 10.0,
        "lattitue": 5.1
	},
	"MaxDistanceFromLocation": null
}
const findOffersConfig = {
    baseURL: baseUrl,
    url: "/offers",
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }    
}
//kiedy bedziesz tego normalnie uzywal, to caly content bedziesz przesylal w request body
export const findOffers = (onSuccess, onFailure, requestBody) => 
{    
    findOffersConfig.data = typeof requestBody === "undefined" ? findOffersRequestBody : findOffersConfig.data = requestBody;
    
    return axios(findOffersConfig)
    .then(response => onSuccess(response))
    .catch(error => onFailure(error));
} 


// get offer by id
const getOfferByIdConfig = {
    baseURL: baseUrl,
    url: "/offers/",
    method: "get",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    } 
}
export const getOfferById = (onSuccess, onFailure, requestId) => 
{
    getOfferByIdConfig.url += typeof requestId === "undefined" ? 1 : requestId;
    
    return axios(getOfferByIdConfig)
    .then(onSuccess)
    .catch(onFailure);
};


//log in
let loginRequestBody = {
	Login: "blueBerry",
	Password: "12345"
}
const loginConfig = {
    baseURL: baseUrl,
    url: "/users/login"
}
const headers = {
    'content-type': 'application/json'
  };
export const login = (onSuccess, onFailure, requestBody) => 
{
    loginRequestBody = typeof requestBody === "undefined" ? loginRequestBody : requestBody;    

    return axios.post(loginConfig.baseURL + loginConfig.url, loginRequestBody, {
        headers: headers
    })
    .then(onSuccess)
    .catch(onFailure);
}


//get user by id
const getUserByIdConfig = {
    baseURL: baseUrl,
    url: "/users/",
    method: "get",
    headers: {
        "Accept": "application/json"
    } 
}
export const getUserById = (onSuccess, onFailure, userId) => {
    getUserByIdConfig.url += typeof userId === "undefined" ? 1 : userId;

    return axios(getUserByIdConfig)
        .then(onSuccess)
        .catch(onFailure);
}


//update user
let userUpdateBody = {
	"Login": "redBerry",
	"Password": "123456"
}
const userUpdateHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
export const updateUser = (onSuccess, onFailure, requestBody, loginToken) => {
    userUpdateBody = requestBody === "undefined" || requestBody === "" ? userUpdateBody : requestBody;
    userUpdateHeaders.Authorization = "bearer " + loginToken;

    axios.patch(baseUrl + "/api/users/update", userUpdateBody, {
        headers: userUpdateHeaders
    })
    .then(onSuccess)
    .catch(onFailure);
}


//add offer
const addOfferHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
let addOfferBody = {
	"PriceInPLN": 10,
	"Area": 10,
	"Adress": "sample adress",
	"OfferType": "wynajem",
	"PropertyType": "mieszkanie",
	"Description": "sample desc",
	"Images": [
		{
			"Value": "new value for image"
		},
		{
			"Value": "new value for image2"
		}],
	"OfferTags": [
		{
			"Name": "new offer tag 1",
			"Value": "value"
		},
		{
			"Name": "new offer tag 2",
			"Value": "value2"
		}
		],
	"Location": {
		     "longitude": 10.0,
            "lattitue": 7.0
		}
}
export const addOffer = (onSuccess, onFailure, requestBody, loginToken) => 
{
    addOfferBody = typeof requestBody === "undefined" || requestBody === ""? addOfferBody : requestBody;
    addOfferHeaders.Authorization = "bearer " + loginToken;

    return axios.post(baseUrl + "/offers/add", addOfferBody, {
        headers: addOfferHeaders
    })
    .then(onSuccess)
    .catch(onFailure);
}


//update offer
const updateOfferHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}
let updateOfferBody = {
    "id": 5,
    "description": "schanged sample desc"
}
export const updateOffer = (onSuccess, onFailure, requestBody, loginToken) => 
{
    updateOfferBody = typeof requestBody === "undefined" || requestBody === "" ? updateOfferBody : requestBody;
    updateOfferHeaders.Authorization = "bearer " + loginToken;

    return axios.patch(baseUrl + "offers/update", updateOfferBody, {
        headers: updateOfferHeaders
    })
    .then(onSuccess)
    .catch(onFailure);
}

//delete offer 
const deleteOfferHeaders = {
    Accept: "application/json"
}
export const deleteOffer = (onSuccess, onFailure, offerId, loginToken) =>
{
    deleteOfferHeaders.Authorization = "bearer " + loginToken;

    return axios.delete(baseUrl + "/offers/" + offerId, {
        headers: deleteOfferHeaders
    })
    .then(onSuccess)
    .catch(onFailure);
}

