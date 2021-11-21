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

axiosMain.interceptors.response.use((response) => {
    return response
}, 
function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if(JSON.parse(localStorage.getItem('currentRefreshToken')) != "") {
            return axios.post('/authenticate/refresh', {
                refreshToken: JSON.parse(localStorage.getItem('currentRefreshToken')),
                accessToken: JSON.parse(localStorage.getItem('currentAccessToken'))
            })
                .then(res => {
                    if (res.status === 200) {
                        // 1) put token to LocalStorage
                        localStorage.setItem("currentAccessToken", res.data.accessToken);
                        localStorage.setItem("currentRefreshToken", res.data.refreshToken);
                        // 2) Change Authorization header
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('currentAccessToken');
                        // 3) return originalRequest object with Axios.
                        return axios(originalRequest);
                    }
                })
        }
    }
    return Promise.reject(error);
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