import axios from 'axios';
import Config from 'react-native-config';

const API_TIMEOUT = 10000; // 10 seconds

const api = axios.create({
  baseURL: Config.BASEURL!,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
