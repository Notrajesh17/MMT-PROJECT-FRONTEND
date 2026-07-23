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

import { login } from '../../api/authApi';
import { devReset } from '../../utils/session';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { useDisableWhileSubmitting } from '../../utils/useDisableWhileSubmitting';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;

const ROLE = 'Traveler';

const triggerHaptic = () =>
  Haptics.trigger('impactLight', {
    enableVibrateFallback: true,
  });

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const backgroundImage = isDarkMode
    ? require('../../assets/Images/BgImageDarkMode.png')
    : require('../../assets/Images/BgImageLightMode.png');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { run, getDisabledState } = useDisableWhileSubmitting();

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please enter both email and password.',
      });
      triggerHaptic();
      return;
    }

    await run(async () => {
      try {
        await login(trimmedEmail, password, ROLE);

        Toast.show({
          type: 'success',
          text1: `Welcome back! ${ROLE}`,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } catch (error: any) {
        const backendMessage =
          error?.response?.data?.message ??
          error?.message ??
          'Something went wrong';

        const registeredRole = error?.response?.data?.registeredRole;

        const isRoleMismatch =
          backendMessage.toLowerCase().includes('mismatch') ||
          backendMessage.toLowerCase().includes('incorrect role');

        if (isRoleMismatch) {
          Toast.show({
            type: 'error',
            text1: 'Incorrect Role Selected',
            text2: registeredRole
              ? `This email is registered as ${registeredRole}.`
              : backendMessage,
          });

          await devReset();

          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' as never }],
          });

          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: backendMessage,
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
            Sign In
          </Text>

          <TextInput
            style={isDarkMode ? styles.inputDark : styles.input}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? '#afafaf' : '#77559990'}
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
              placeholderTextColor={isDarkMode ? '#afafaf' : '#77559990'}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={handleTogglePassword}
              style={{ padding: 8 }}
            >
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
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
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              {getDisabledState() ? 'Please Wait...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={isDarkMode ? styles.linkDark : styles.link}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
          >
            <Text
              style={isDarkMode ? styles.linkAltDark : styles.linkAlt}
            >
              New to Travifai?{' '}
              <Text style={isDarkMode ? styles.linkDark : styles.link}>
                Create account
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
