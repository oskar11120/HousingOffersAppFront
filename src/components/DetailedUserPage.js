import React from "react";
import {getUserById} from "../utils/housingOffersApiAxiosClient";

const DetailedUserPage = props => 
{
    const userId = props.match.params.userId;

    const [getUser, setUser] = React.useState(null);
    const [getError, setError] = React.useState(null);

    const onSuccessGetUserRequest = request => setUser(request.data);
    const onFailureGetUserRequest = error => setError(error);

    React.useEffect(
        () => {
            getUserById(onSuccessGetUserRequest, onFailureGetUserRequest, userId);
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
    else 
    {
        return (
            <div>
                {/* w tym miejscu ma znajdowac sie cala oferta za szegolami */}
                {JSON.stringify(getUser)};
            </div> 
        );
    } 
}

export default DetailedUserPage;