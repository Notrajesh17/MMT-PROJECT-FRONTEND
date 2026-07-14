import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@travifai_token';

export const checkTokenExpiry = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const savedAt = await AsyncStorage.getItem('authTokenSavedAt');

  if (!token || !savedAt) return false;

  const savedDate = new Date(savedAt);
  const now = new Date();
  const diffInDays =
    (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays >= 20) {
    await clearAuthData();
    await AsyncStorage.removeItem('authTokenSavedAt');
    return false;
  }

  return true;
};

export const getAuthData = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {token};
};

export const clearAuthData = async () => {
  await AsyncStorage.multiRemove([
    '@travifai_token',
    'authTokenSavedAt',
    'userID',
  ]);
};

export const devReset = async () => {
  await AsyncStorage.clear();
};
