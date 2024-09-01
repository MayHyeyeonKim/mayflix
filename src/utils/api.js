import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: 'http://api.themoviedb.org/3/',
    headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
});

axios.interceptors.response.use(
    function (response){
        return response;
    },
    function (error){
        return Promise.reject(error);
    }
);

export default api;