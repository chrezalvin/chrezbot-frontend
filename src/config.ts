export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

if(!BASE_URL)
    throw new Error("REACT_APP_BASE_URL is not set");

export const DISCORD_OAUTH_URL = process.env.REACT_APP_DISCORD_OAUTH_URL;

if(!DISCORD_OAUTH_URL)
    throw new Error("REACT_APP_DISCORD_OAUTH_URL is not set");