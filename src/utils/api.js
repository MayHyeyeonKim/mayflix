import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

const api = axios.create({
    baseURL: '/', // 프록시 설정에 의해 올바른 경로로 라우팅
    params: {
        api_key: API_KEY,
    },
    headers: {
        Accept: 'application/json',
    }
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.error('API 호출 오류:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default api;
