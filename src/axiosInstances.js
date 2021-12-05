import axios from "axios";
import Cookies from 'universal-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const cookies = new Cookies()
export const axiosMain = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json, text/plain, */*",
        'Authorization' : `Bearer ${typeof(cookies.get("currentAccessToken")) == "undefined" ? "" : (cookies.get("currentAccessToken"))}`
    }
})

export const axiosFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': "application/json, text/plain, */*",
    }
})

export const axiosApiRoutes = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Accept': "application/json, text/plain, */*",
    }
})