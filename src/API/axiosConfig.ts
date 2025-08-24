import debug from "debug";
import { Axios } from "axios";
import { BASE_URL } from "../config";
import { inferType } from "../library/InferType";

const log = debug("app:axiosConfig");

export const axiosInstance = new Axios({
    baseURL: BASE_URL,

    // skipping throwing error when status is not 200
    validateStatus: () => true,
    responseType: "json",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    log(`accessing ${config.method} ${config.url}`);

    return config;
});

axiosInstance.interceptors.response.use((response) => {
    log(`response from ${response.config.method} ${response.config.url}`);

    // force response.data into json
    if(response.headers["content-type"].includes("application/json")){
        log("parsing response data");
        response.data = JSON.parse(response.data);

        // if error
        if(response.data.error)
            log(`error: ${JSON.stringify(response.data)}`);

        log(inferType(response.data));
    }

    return response;
});