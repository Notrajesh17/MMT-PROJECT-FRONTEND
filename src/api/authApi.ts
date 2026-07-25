import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';

import api from './axiosConfig';

const TOKEN_KEY = '@travifai_token';
const USER_ID_KEY = 'userID';
const TOKEN_SAVED_AT_KEY = 'authTokenSavedAt';

const ROLE = 'Traveler';

const AUTH_ENDPOINTS = {
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  VERIFY_OTP: '/api/auth/verify-otp',
  RESET_PASSWORD: '/api/auth/reset-password',
} as const;

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
  const { data } = await api.post<SignupResponse>(AUTH_ENDPOINTS.SIGNUP, {
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
    const { data } = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
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
    if (error instanceof AxiosError) {
      console.error(
        'Login failed:',
        error.response?.data ?? error.message,
      );
    }

    throw error;
  }
};

export const forgotPassword = (
  email: string,
) => {
  return api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
};

export const verifyOtp = (
  email: string,
  otp: string,
) => {
  return api.post(AUTH_ENDPOINTS.VERIFY_OTP, { email, otp });
};

export const resetPassword = (
  email: string,
  newPassword: string,
  confirmPassword: string,
) => {
  return api.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
    email,
    newPassword,
    confirmPassword,
  });
};
