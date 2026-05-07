import axios from 'axios';

export const ApiLink = "https://taqat-api-seven.vercel.app";
export const LocalApi = "http://localhost:5000";

const Api = axios.create({
    baseURL: ApiLink,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 30000,
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error?.response || error);

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }

        return Promise.reject(error);
    }
);

export default Api;