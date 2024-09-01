import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

const api = axios.create({
    baseURL: '/',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}` // API 키를 Bearer 토큰으로 설정
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

// API 호출 예시
api.get('/movie/popular')
    .then(response => {
        console.log('API 데이터:', response.data);
    })
    .catch(error => {
        console.error('Error fetching popular movies:', error);
    });
