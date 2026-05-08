import axios from 'axios'

export const ApiLink = "https://taqat-api-seven.vercel.app"
export const LocalApi = "http://localhost:5000"

const Api = axios.create({
    baseURL: ApiLink,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Api;