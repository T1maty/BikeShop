import axios from "axios";

export const URL = "https://api.novaposhta.ua/v2.0/json/";

export const $NovaPoshtaApi = axios.create({

    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
        //mode: 'cors'
    },
    //withCredentials: true,
});

$NovaPoshtaApi.interceptors.request.use(function (config) {
    //config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
$NovaPoshtaApi.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default $NovaPoshtaApi;