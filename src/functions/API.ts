import axios from "axios";
import { API_BASE_URL } from "../config";

export async function getSessionKey(code: string): Promise<string>{
    const res = await axios.get(`${API_BASE_URL}/authenticate`, {
        params: {
            code
        }
    });

    if(res.data.SESSION_KEY)
        return res.data.SESSION_KEY;
    else 
        throw new Error("Unexpected Error");
}

export interface APIUserData{
    username: string,
    discordID: string,
    avatarURL: string
}

export function APIUserDataTypeGuard(val: unknown): val is APIUserData{
    if(val === null || typeof val !== "object") return false;

    if("username" in val && typeof val.username === "string")
        if("discordID" in val && typeof val.discordID === "string")
            return true;

    return false;
}

export async function getUser(sessionKey: string): Promise<APIUserData>{
    const res = await axios.post(`${API_BASE_URL}/authenticate`, {
                    SESSION_KEY: sessionKey
                });

    if(res.status === 400)
        throw new Error("Invalid Session ID");
    
    if(APIUserDataTypeGuard(res.data))
        return res.data;
    else throw new Error("Unexpected error");
}