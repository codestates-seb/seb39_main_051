import axios from 'axios';
import { getCookie } from './cookie';

const isTokenAlive = getCookie('accessToken') || null;
let token;

if (isTokenAlive) {
  token = isTokenAlive.replace('%20', ' ');
}

const axiosInstance = axios.create({
  baseUrl: 'http://3.86.101.132:8080',
});

axiosInstance.defaults.headers.common['Authorization'] = token;

export default axiosInstance;
