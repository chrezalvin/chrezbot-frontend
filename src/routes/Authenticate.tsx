import debug from "debug";

import { useAppSelector, useAppDispatch} from "../hooks/customRedux";
import {API_CLIENT_ID, API_CLIENT_REDIRECT_URI} from "../config";
import { useNavigate, useSearchParams } from "react-router-dom";

import { assignUser } from "../store/User";
import { useEffect, useState } from "react";

import { authenticate_user, get_session_credentials, getDiscordUser} from "../API";
import { getItem, setItem } from "../library/localStorage";
import { assignDiscordUser } from "../store/DiscordUser";

const log = debug("app:Authenticate");

function Authenticate(){
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function authenticate(){
            setIsLoading(true);
            setError(null);

            try{
                const code = searchParams.get("code");
                let SESSION_KEY = null;
    
                // null code check for SESSION_KEY cookie
                if(code){
                    SESSION_KEY = await authenticate_user(code);
                    setItem("session_key", SESSION_KEY);

                    log(`Got session key: ${SESSION_KEY}`);
                }

                SESSION_KEY = getItem("session_key");

                if(SESSION_KEY){
                    // then get credentials from SESSION_KEY
                    const userResponse = await get_session_credentials();
                    const discordProfile = await getDiscordUser();
    
                    log(`Got user data: ${JSON.stringify(userResponse)}`);
    
                    dispatch(assignUser(userResponse));
                    dispatch(assignDiscordUser(discordProfile));
    
                    navigate("/dashboard");
                }

            }
            catch(err){
                if(err instanceof Error)
                    setError(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        authenticate();
    }, [])

    function displayWaiting(){
        if(isLoading)
            return {
                color: "btn-outline-primary",
                message: "Authenticating..."
            };

        if(error)
            return {
                color: "btn-outline-danger",
                message: `error: ${error}`
            };

        if(user)
            return {
                color: "btn-outline-success",
                message: `Welcome, ${user.username}!`
            };
        else
            return {
                color: "btn-outline-primary",
                message: "Authenticate"
            };
    }

    return(
        <div className="screen-center">
            <div className="display-flex flex-center text-center ">
                <h1>Welcome to Chrezbot</h1>
                <p>Authenticate your account first to login</p>
                <a
                    className={`btn ${displayWaiting().color}`}
                    style={{borderWidth: "5px"}}
                    href={isLoading ? undefined : `https://discord.com/api/oauth2/authorize?client_id=${API_CLIENT_ID}&redirect_uri=${API_CLIENT_REDIRECT_URI}&response_type=code&scope=identify`}
                >{displayWaiting().message}</a>
            </div>
        </div>
    )
}

export default Authenticate;