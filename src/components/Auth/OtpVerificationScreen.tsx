import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import {bgImg} from './ForgotPassword';
import styles from './authStyles';
import {verifyOtp} from '../../api/authApi';

type Props = StackScreenProps<AuthStackParamList, 'OtpVerification'>;

const OtpVerificationScreen: React.FC<Props> = ({navigation, route}) => {
  const mode = useColorScheme();
  const {email} = route.params;
  const [otp, setOtp] = useState('');

  const verify = async () => {
    if (otp.length !== 6) {
      Toast.show({type: 'error', text1: 'OTP must be 6 digits'});
      return;
    }

    try {
      await verifyOtp(email, otp);
      navigation.navigate('ResetPassword', {email, otp});
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'OTP verification failed',
        text2: err?.response?.data?.message || 'Server error',
      });
    }
  };

  return (
    <ImageBackground source={bgImg(mode)} style={styles.bg}>
      <View style={[styles.card, mode === 'dark' && styles.cardDark]}>
        <Text style={mode == 'dark' ? styles.DarkTitle : styles.title}>
          Enter Verification Code
        </Text>
        <Text style={mode == 'dark' ? styles.Darksubtitle : styles.subtitle}>
          We sent a 6‑digit code to {email}
        </Text>
        <TextInput
          placeholder="000000"
          placeholderTextColor={mode === 'dark' ? '#afafaf' : '#77559990'}
          keyboardType="numeric"
          maxLength={6}
          style={mode === 'dark' ? styles.inputDark : styles.input}
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity style={styles.button} onPress={verify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default OtpVerificationScreen;
