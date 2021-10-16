import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const axiosMain = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json, text/plain, */*",
    }
})

export const axiosFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': "application/json, text/plain, */*",
    }
})