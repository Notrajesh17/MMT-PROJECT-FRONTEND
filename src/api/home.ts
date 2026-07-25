import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const TOKEN_KEY = '@travifai_token';
const API_TIMEOUT = 10000;

const api = axios.create({
  baseURL: Config.BASEURL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

export default api;
