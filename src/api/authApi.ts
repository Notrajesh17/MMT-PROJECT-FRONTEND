import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosConfig';

const TOKEN_KEY = '@travifai_token';

export const signup = async (
  email: string,
  password: string,
  phone: string,
  username: string,
) => {
  const role = 'Traveler';
  const response = await api.post('/api/auth/signup', {
    email,
    password,
    phone,
    username,
    role,
  });

  return response.data;
};

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const role = 'Traveler';

  try {
    const response = await api.post('/api/auth/login', {
      email,
      password,
      role,
    });

    const token = response.data.access_token;
    const userId = response.data.userId;
    const savedAt = new Date().toISOString();

    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      ['authTokenSavedAt', savedAt],
      ['userID', userId],
    ]);

    return token;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const forgotPassword = (email: string) =>
  api.post('/api/auth/forgot-password', {email});

export const verifyOtp = (email: string, otp: string) =>
  api.post('/api/auth/verify-otp', {email, otp});

export const resetPassword = (
  email: string,
  newPassword: string,
  confirmPassword: string,
) =>
  api.post('/api/auth/reset-password', {
    email,
    newPassword,
    confirmPassword,
  });
