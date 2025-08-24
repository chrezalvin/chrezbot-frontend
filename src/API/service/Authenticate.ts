import debug from "debug";

import { BASE_URL } from "../../config";
import { isUser, User } from "../models";
import { axiosInstance } from "../axiosConfig";
import { isDiscordUser } from "../models/DiscordUser";

const log = debug("app:Authenticate");

/**
 * get session credentials through the session_key provided by cookies
 * @returns session credentials
 */
export async function get_session_credentials(): Promise<User>{
    log(`Getting user data`);
    const res = await axiosInstance.get(`${BASE_URL}/profile`);

    if(res.status === 400)
        throw new Error("Invalid Session ID");
    
    if(isUser(res.data))
        return res.data;
    else 
        throw new Error("Unexpected error");
}

/**
 * authenticate user with discord code to get session ID
 * @param code discord code
 * @returns session ID
 */
export async function authenticate_user(code: string): Promise<string>{
    log(`Getting session key for code: ${code}`);
    const res = await axiosInstance.get(`${BASE_URL}/authenticate`, {
        params: {
            code
        }
    });

    if(res.data.SESSION_KEY){
        log(`Got session key: ${res.data.SESSION_KEY}`);
        return res.data.SESSION_KEY;
    }
    else {
        log(`Unexpected Error: ${JSON.stringify(res.data)}`);
        throw new Error("Unexpected Error");
    }
}

/**
 * get discord user data
 */
export async function getDiscordUser(){
    log(`Getting discord user data`);
    const res = await axiosInstance.get(`${BASE_URL}/profile/discord`);

    if(res.status !== 200){
        log(`error: ${JSON.stringify(res.data)}`);
        throw new Error("Invalid Session ID");
    }
    
    if(isDiscordUser(res.data))
        return res.data;
    else 
        throw new Error("Unexpected error");
}