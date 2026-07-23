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

import { verifyOtp } from '../../api/authApi';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { bgImg } from './ForgotPassword';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'OtpVerification'>;

const OTP_LENGTH = 6;

const OtpVerificationScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { email } = route.params;

  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    const trimmedOtp = otp.trim();

    if (trimmedOtp.length !== OTP_LENGTH) {
      Toast.show({
        type: 'error',
        text1: `OTP must be ${OTP_LENGTH} digits.`,
      });
      return;
    }

    try {
      await verifyOtp(email, trimmedOtp);

      navigation.navigate('ResetPassword', {
        email,
        otp: trimmedOtp,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'OTP verification failed',
        text2:
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
          Enter Verification Code
        </Text>

        <Text
          style={isDarkMode ? styles.Darksubtitle : styles.subtitle}
        >
          We sent a 6-digit code to {email}
        </Text>

        <TextInput
          value={otp}
          onChangeText={setOtp}
          placeholder="000000"
          placeholderTextColor={
            isDarkMode ? '#afafaf' : '#77559990'
          }
          style={isDarkMode ? styles.inputDark : styles.input}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOtp}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OtpVerificationScreen;
