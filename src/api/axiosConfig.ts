import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
