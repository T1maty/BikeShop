import axios from "axios";

export const API_URL = 'http://185.47.172.78:5001/'

const $api = axios.create({
    baseURL: API_URL
})

export default $api;