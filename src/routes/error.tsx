import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/customRedux";

function displayError(err?: unknown){
    if(isRouteErrorResponse(err)){
        return (
            <div id="errorBox">
                <h1>{err.status}</h1>
                <p>{err.statusText}</p>
            </div>
        )
    }
    else return (<h1>An Unknown Error Occured</h1>)
}

function ErrorPage(){
    const error = useRouteError();
    const darkMode = useAppSelector(state => state.darkMode);
    const navigate = useNavigate();

    return (
        <div className="screen-center">
            {displayError(error)}
        </div>
    );

}

export default ErrorPage;