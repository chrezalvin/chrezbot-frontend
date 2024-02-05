import { useAppSelector, useAppDispatch} from "../hooks/customRedux";
import {DISCORD_OAUTH_URL} from "../config";
import { useNavigate, useSearchParams } from "react-router-dom";

import { assign } from "../store/User";
import { useEffect, useState } from "react";

import Cookies from "universal-cookie";
import { getSessionKey, getUser} from "../functions/API";

const cookies = new Cookies();

function Authenticate(){
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // dispatch(assign({username:"Albert Einstein", discordID: "12345"}));
        // navigate("/");
        
        if(user.username !== "") // means user already login
            navigate("/");


        const getAPIResponse = async (code: string) => {
            try{
                setLoading(true);
        
                const SESSION_KEY = await getSessionKey(code);
                
                cookies.set("SESSION_KEY", SESSION_KEY);

                console.log(`start to get user`);
                const userResponse = await getUser(cookies.get<string>("SESSION_KEY"));
                console.log(userResponse);

                dispatch(assign({
                    ...userResponse
                }))
                console.log(user);
                navigate("/");
            }
            catch(err: any){
                setError("Failed to authenticate!");
                setLoading(false);
            }
        }

        const getUserFromAPI = async () => {
            try{
                const userResponse = await getUser(cookies.get<string>("SESSION_KEY"));
                dispatch(assign({
                    ...userResponse
                }))
                navigate("/");
            }
            catch(_: any){
                const code = searchParams.get("code");
                if(code !== null)
                    await getAPIResponse(code);
                else{
                    setError("Cookie has been expired, touch the button to re authenticate");
                    setLoading(false);
                }
            }
        }

        const code = searchParams.get("code");
        const cookie = cookies.get<string>("SESSION_KEY");

        console.log(cookie);

        if(cookie !== "")
            getUserFromAPI();
        else if(code !== null) 
            getAPIResponse(code);
    }, [])

    function displayWaiting(){
        if(error !== "") 
            return {
                color: "btn-outline-danger",
                message: `${error}`
            };

        if(user.username !== "") 
            return {
                color: "btn-outline-success",
                message: `Welcome, ${user.username}!`
            };

        if(searchParams.get("code") !== null)
            return {
                color: "btn-outline-primary",
                message: "Authenticating..."
            };
        else
            return {
                color: "btn-outline-primary",
                message: "Authenticate"
            };
    }

    return(
        <body className="screen-center">
            <div className="display-flex flex-center text-center ">
                <h1>Welcome to Chrezbot</h1>
                <p>Authenticate your account first to login</p>
                <a
                    className={`btn ${displayWaiting().color}`}
                    style={{borderWidth: "5px"}}
                    href={loading ? undefined : DISCORD_OAUTH_URL}
                >{displayWaiting().message}</a>
            </div>
        </body>
    )
}

export default Authenticate;