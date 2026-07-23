import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Haptics from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Ionicons';

import { signup } from '../../api/authApi';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { useDisableWhileSubmitting } from '../../utils/useDisableWhileSubmitting';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'Signup'>;

const triggerHaptic = () =>
  Haptics.trigger('impactLight', {
    enableVibrateFallback: true,
  });

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const backgroundImage = isDarkMode
    ? require('../../assets/Images/BgImageDarkMode.png')
    : require('../../assets/Images/BgImageLightMode.png');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { run, getDisabledState } = useDisableWhileSubmitting();

  const handleSignup = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (
      !trimmedName ||
      !trimmedPhone ||
      !trimmedEmail ||
      !password ||
      !confirmPassword
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields.',
      });
      triggerHaptic();
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match.',
      });
      triggerHaptic();
      return;
    }

    await run(async () => {
      try {
        await signup(
          trimmedEmail,
          password,
          trimmedPhone,
          trimmedName,
        );

        Toast.show({
          type: 'success',
          text1: 'Account created successfully',
          text2: 'You can now sign in.',
        });

        navigation.replace('Login');
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2:
            error?.response?.data?.message ??
            error?.message ??
            'Something went wrong.',
        });

        triggerHaptic();
      }
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.bg}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.card, isDarkMode && styles.cardDark]}>
          <Text style={isDarkMode ? styles.DarkTitle : styles.title}>
            Sign Up
          </Text>

          <Text
            style={isDarkMode ? styles.Darksubtitle : styles.subtitle}
          >
            Welcome to Travifai
          </Text>

          <View style={styles.row}>
            <TextInput
              style={[
                isDarkMode ? styles.inputDark : styles.input,
                styles.half,
              ]}
              placeholder="Name"
              placeholderTextColor={
                isDarkMode ? '#afafaf' : '#77559990'
              }
              autoCapitalize="words"
              autoCorrect={false}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={[
                isDarkMode ? styles.inputDark : styles.input,
                styles.half,
              ]}
              placeholder="Phone"
              placeholderTextColor={
                isDarkMode ? '#afafaf' : '#77559990'
              }
              keyboardType="phone-pad"
              autoCorrect={false}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TextInput
            style={isDarkMode ? styles.inputDark : styles.input}
            placeholder="Email"
            placeholderTextColor={
              isDarkMode ? '#afafaf' : '#77559990'
            }
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

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
              placeholder="Password"
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
                name={
                  showConfirmPassword ? 'eye' : 'eye-off'
                }
                size={22}
                color={isDarkMode ? '#afafaf' : '#775599'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              getDisabledState() && { opacity: 0.6 },
            ]}
            disabled={getDisabledState()}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>
              {getDisabledState()
                ? 'Creating...'
                : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text
              style={
                isDarkMode
                  ? styles.linkAltDark
                  : styles.linkAlt
              }
            >
              Have an account?{' '}
              <Text
                style={
                  isDarkMode
                    ? styles.linkDark
                    : styles.link
                }
              >
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;
