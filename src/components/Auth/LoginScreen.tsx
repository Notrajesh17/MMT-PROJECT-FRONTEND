import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Haptics from 'react-native-haptic-feedback';
import {login} from '../../api/authApi';
import {clearAuthData, devReset, getAuthData} from '../../utils/session';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import styles from './authStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDisableWhileSubmitting} from '../../utils/useDisableWhileSubmitting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetTo} from '../../navigation/RootNavigator';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;
const haptic = () =>
  Haptics.trigger('impactLight', {enableVibrateFallback: true});

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const color = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {run, getDisabledState} = useDisableWhileSubmitting();
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const submit = async () => {
    if (!email || !password) {
      Toast.show({type: 'error', text1: 'Enter both fields'});
      haptic();
      return;
    }
    await run(async () => {
      try {
        const role = 'Traveler';
        const result = await login(email, password, role);

        if (!role) {
          await devReset();
          throw new Error('Role is missing');
        }
        await login(email, password, role);

        Toast.show({type: 'success', text1: `Welcome back! ${role}`});
        navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
      } catch (err: any) {
        const backendMessage = err?.response?.data?.message || '';
        const registeredRole = err?.response?.data?.registeredRole;
        const isRoleMismatch =
          backendMessage.toLowerCase().includes('mismatch') ||
          backendMessage.toLowerCase().includes('incorrect role');

        if (isRoleMismatch) {
          Toast.show({
            type: 'error',
            text1: 'Incorrect Role Selected',
            text2: `This email is registered as ${registeredRole}.`,
          });
          await devReset();
          navigation.reset({
            index: 0,
            routes: [{name: 'Home' as never}],
          });
          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: err?.response?.data?.message || 'Server error',
        });
        //console.error(err);
        haptic();
      }
    });
  };

  return (
    <ImageBackground
      source={
        color === 'dark'
          ? require('../../assets/Images/BgImageDarkMode.png')
          : require('../../assets/Images/BgImageLightMode.png')
      }
      style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={[styles.card, color === 'dark' && styles.cardDark]}>
          <Text style={color === 'dark' ? styles.DarkTitle : styles.title}>
            Sign In
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={color === 'dark' ? '#afafaf' : '#77559990'}
            style={color === 'dark' ? styles.inputDark : styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View
            style={[
              color === 'dark'
                ? styles.passwordContainerDark
                : styles.passwordContainer,
            ]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={color === 'dark' ? '#afafaf' : '#77559990'}
              style={{flex: 1, color: color === 'dark' ? '#fff' : '#000'}}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={{padding: 8}}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color={color === 'dark' ? '#afafaf' : '#775599'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, getDisabledState() && {opacity: 0.6}]}
            disabled={getDisabledState()}
            onPress={submit}>
            <Text style={styles.buttonText}>
              {getDisabledState() ? 'Please Wait...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={color === 'dark' ? styles.linkDark : styles.link}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={color === 'dark' ? styles.linkAltDark : styles.linkAlt}>
              New to Travifai?{' '}
              <Text style={color === 'dark' ? styles.linkDark : styles.link}>
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
