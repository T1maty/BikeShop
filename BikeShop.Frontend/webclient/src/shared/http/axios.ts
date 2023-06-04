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

$api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
$api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default $api;