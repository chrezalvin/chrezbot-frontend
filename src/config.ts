import debug from "debug";
import { Axios } from "axios";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

if(!BASE_URL)
    throw new Error("REACT_APP_BASE_URL is not set");

export const API_CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;

if(!API_CLIENT_ID)
    throw new Error("REACT_APP_API_CLIENT_ID is not set");

export const API_CLIENT_REDIRECT_URI = process.env.REACT_APP_API_CLIENT_REDIRECT_URI;

if(!API_CLIENT_REDIRECT_URI)
    throw new Error("REACT_APP_API_CLIENT_REDIRECT_URI is not set");

export const axiosPublic = new Axios({
    baseURL: BASE_URL
});

// debug config

const debugConfig = process.env.REACT_APP_DEBUG;

if(debugConfig)
    debug.enable(debugConfig);