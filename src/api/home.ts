import api from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchHomepageProperties = async () => {
  try {
    const token = await AsyncStorage.getItem('@travifai_token');
    if (!token) {
      console.warn('No auth token found');
      return [];
    }

    const response = await api.get('/api/homepage/properties', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('API Fetch Error:', error.response?.data || error.message);
    return [];
  }
};
