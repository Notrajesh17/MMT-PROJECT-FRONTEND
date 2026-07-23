import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

import { resetPassword } from '../../api/authApi';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { bgImg } from './ForgotPassword';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { email } = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedPassword || !trimmedConfirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields.',
      });
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match.',
      });
      return;
    }

    try {
      await resetPassword(
        email,
        trimmedPassword,
        trimmedConfirmPassword,
      );

      Toast.show({
        type: 'success',
        text1: 'Password reset successfully.',
      });

      navigation.popToTop();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1:
          error?.response?.data?.message ??
          error?.message ??
          'Something went wrong.',
      });
    }
  };

  return (
    <ImageBackground
      source={bgImg(colorScheme)}
      style={styles.bg}
    >
      <View style={[styles.card, isDarkMode && styles.cardDark]}>
        <Text style={isDarkMode ? styles.DarkTitle : styles.title}>
          Reset Password
        </Text>

        <View
          style={
            isDarkMode
              ? styles.passwordContainerDark
              : styles.passwordContainer
          }
        >
          <TextInput
            style={{
              flex: 1,
              color: isDarkMode ? '#fff' : '#000',
            }}
            placeholder="New Password"
            placeholderTextColor={
              isDarkMode ? '#afafaf' : '#77559990'
            }
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color={isDarkMode ? '#afafaf' : '#775599'}
            />
          </TouchableOpacity>
        </View>

        <View
          style={
            isDarkMode
              ? styles.passwordContainerDark
              : styles.passwordContainer
          }
        >
          <TextInput
            style={{
              flex: 1,
              color: isDarkMode ? '#fff' : '#000',
            }}
            placeholder="Confirm Password"
            placeholderTextColor={
              isDarkMode ? '#afafaf' : '#77559990'
            }
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() =>
              setShowConfirmPassword(prev => !prev)
            }
          >
            <Icon
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              size={22}
              color={isDarkMode ? '#afafaf' : '#775599'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>
            Save Password
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ResetPasswordScreen;
