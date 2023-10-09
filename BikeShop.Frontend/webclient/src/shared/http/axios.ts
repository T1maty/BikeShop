import axios from "axios";

const environment = process.env.NODE_ENV;

export const API_URL_DEVELOPMENT = "https://bikeshop.1gb.ua/api";
export const API_URL_PRODUCTION = "https://api.bikelove.com.ua/api";

export const $api = axios.create({

    baseURL: environment === "production" ? API_URL_PRODUCTION : API_URL_DEVELOPMENT,
    headers: {
        //"Content-Type": "application/json",
    },
    withCredentials: true,

});


export default $api;