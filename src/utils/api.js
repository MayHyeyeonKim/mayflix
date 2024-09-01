import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3', // HTTPS로 수정
    headers:{
        Accept: 'application/json',
    },
    params: { // URL 파라미터로 API 키를 전달
        api_key: API_KEY,
    }
});

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default api;
