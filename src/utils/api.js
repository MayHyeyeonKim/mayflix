import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

const api = axios.create({
    baseURL: '/', // 프록시를 통해 기본 URL 설정
    params: {
        api_key: API_KEY, // API 키를 URL 파라미터로 추가
    },
    headers: {
        Accept: 'application/json',
    }
});

// 응답 인터셉터 설정
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