import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { StackScreenProps } from '@react-navigation/stack';

import { forgotPassword } from '../../api/authApi';
import { AuthStackParamList } from '../../navigation/AuthStack';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const backgroundImage = (mode: 'light' | 'dark' | null) =>
  mode === 'dark'
    ? require('../../assets/Images/BgImageDarkMode.png')
    : require('../../assets/Images/BgImageLightMode.png');

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [email, setEmail] = useState('');

  const handleSendOtp = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Toast.show({
        type: 'error',
        text1: 'Please enter your email.',
      });
      return;
    }

    try {
      await forgotPassword(trimmedEmail);

      Toast.show({
        type: 'success',
        text1: 'OTP sent successfully.',
      });

      navigation.navigate('OtpVerification', {
        email: trimmedEmail,
      });
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
      source={backgroundImage(colorScheme)}
      style={styles.bg}
    >
      <View style={[styles.card, isDarkMode && styles.cardDark]}>
        <Text style={isDarkMode ? styles.DarkTitle : styles.title}>
          Forgot Password
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter registered email"
          placeholderTextColor={isDarkMode ? '#afafaf' : '#77559990'}
          style={isDarkMode ? styles.inputDark : styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSendOtp}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;
