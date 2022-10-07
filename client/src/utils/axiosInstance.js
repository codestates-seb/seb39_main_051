import axios from 'axios';
import { getCookie } from './cookie';

const isTokenAlive = getCookie('accessToken') || null;
let token;
if (isTokenAlive) {
  token = isTokenAlive;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.defaults.headers.common['Authorization'] = token;

export default axiosInstance;
