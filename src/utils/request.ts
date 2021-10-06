import axios from 'axios';

// axios.defaults.withCredentials = true;

// axios 인스턴스 구성
const service = axios.create({
    baseURL : process.env.VUE_APP_BASE_URL,
    timeout : 5000,
});

service.interceptors.request.use(
    (config) => {
      //  매 요청마다 X-Access-Token header 를 추가한다
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers['X-Access-Token'] = token;
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
)
export default service;