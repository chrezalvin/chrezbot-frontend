import axios from "axios";
import { API_BASE_URL } from "../config";

export async function getSessionKey(code: string): Promise<string>{
    console.log(`Getting session key for code: ${code}`);
    const res = await axios.get(`${API_BASE_URL}/authenticate`, {
        params: {
            code
        }
    });

    if(res.data.SESSION_KEY){
        console.log(`Got session key: ${res.data.SESSION_KEY}`);
        return res.data.SESSION_KEY;
    }
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
    console.log(`Getting user data for session key: ${sessionKey}`);
    const res = await axios.post(`${API_BASE_URL}/authenticate`, {
                    SESSION_KEY: sessionKey
                });

    if(res.status === 400)
        throw new Error("Invalid Session ID");
    
    if(APIUserDataTypeGuard(res.data))
        return res.data;
    else throw new Error("Unexpected error");
}

export interface Recommend{
    title: string;
    description: string;
    imgUrl?: string;
    link?: string;
    category?: string[];
}

export interface RecommendDoc{
    id: string;
    data: Recommend;
}

export function isRecommend(obj: unknown): obj is Recommend{
    if(typeof obj !== "object" || obj === null) return false;

    if(!("title" in obj) || !("description" in obj)) return false;

    return obj.title !== undefined && obj.description !== undefined;
}

export function isRecommendDoc(obj: unknown): obj is RecommendDoc{
    if(typeof obj !== "object" || obj === null) return false;

    if(!("id" in obj) || !("data" in obj)) return false;

    return isRecommend(obj.data);
}

export async function getAllRecommends(): Promise<RecommendDoc[]>{
    const res = await axios.get(`${API_BASE_URL}/recommend`);


    if(res.status !== 200) return [];

    if(Array.isArray(res.data) && res.data.every(isRecommendDoc))
        return res.data;

    return [];
}