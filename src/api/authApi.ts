import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

import api from './axiosConfig';

const TOKEN_KEY = '@travifai_token';
const USER_ID_KEY = 'userID';
const TOKEN_SAVED_AT_KEY = 'authTokenSavedAt';
const ROLE = 'Traveler';

interface LoginResponse {
  access_token: string;
  userId: string;
}

interface SignupResponse {
  message: string;
}

export const signup = async (
  email: string,
  password: string,
  phone: string,
  username: string,
): Promise<SignupResponse> => {
  const { data } = await api.post<SignupResponse>('/api/auth/signup', {
    email,
    password,
    phone,
    username,
    role: ROLE,
  });

  return data;
};

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    const { data } = await api.post<LoginResponse>('/api/auth/login', {
      email,
      password,
      role: ROLE,
    });

    await AsyncStorage.multiSet([
      [TOKEN_KEY, data.access_token],
      [USER_ID_KEY, data.userId],
      [TOKEN_SAVED_AT_KEY, new Date().toISOString()],
    ]);

    return data.access_token;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(
      'Login failed:',
      axiosError.response?.data ?? axiosError.message,
    );

    throw error;
  }
};

export const forgotPassword = (email: string) =>
  api.post('/api/auth/forgot-password', { email });

export const verifyOtp = (email: string, otp: string) =>
  api.post('/api/auth/verify-otp', { email, otp });

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
