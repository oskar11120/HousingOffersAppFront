//changes date and time select values, so the client asks api for more data
const expandDateAndTimeSelectDomain = (userInputs, numberOfDays) =>
{
    userInputs.dateSelect = new Date(userInputs.dateSelect.getTime() - 24 * 60 * 60 * 1000 * numberOfDays);
    userInputs.forecastsNumberSelect = parseInt(userInputs.forecastsNumberSelect, 10) + 2 * 24 * numberOfDays;
}

export default expandDateAndTimeSelectDomain;