import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Haptics from 'react-native-haptic-feedback';
import {signup} from '../../api/authApi';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import styles from './authStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDisableWhileSubmitting} from '../../utils/useDisableWhileSubmitting';

type Props = StackScreenProps<AuthStackParamList, 'Signup'>;
const haptic = () =>
  Haptics.trigger('impactLight', {enableVibrateFallback: true});

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const color = useColorScheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {run, getDisabledState} = useDisableWhileSubmitting();
  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const create = async () => {
    if (!email || !phone || !name || !password) {
      Toast.show({type: 'error', text1: 'Fill all fields'});
      haptic();
      return;
    }
    if (password !== cpass) {
      Toast.show({type: 'error', text1: 'Passwords do not match'});
      haptic();
      return;
    }
    await run(async () => {
      try {
        const role = 'Traveler';
        const result = await signup(email, password, phone, name, role);
        Toast.show({
          type: 'success',
          text1: 'Account created Successfully',
          text2: 'You can now Log in',
        });
        navigation.replace('Login');
      } catch (err: any) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Something went wrong. Please try again later';
        Toast.show({
          type: 'error',
          text1: 'Signup failed',
          text2: message || 'Server error',
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
            Sign Up
          </Text>
          <Text
            style={color === 'dark' ? styles.Darksubtitle : styles.subtitle}>
            Welcome to Travifai
          </Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Name"
              placeholderTextColor={color === 'dark' ? '#afafaf' : '#77559990'}
              style={[
                color === 'dark' ? styles.inputDark : styles.input,
                styles.half,
              ]}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor={color === 'dark' ? '#afafaf' : '#77559990'}
              style={[
                color === 'dark' ? styles.inputDark : styles.input,
                styles.half,
              ]}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TextInput
            placeholder="Email ID"
            placeholderTextColor={color === 'dark' ? '#afafaf' : '#77559990'}
            style={color === 'dark' ? styles.inputDark : styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
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
              onChangeText={setPass}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={{padding: 8}}>
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color={color === 'dark' ? '#afafaf' : '#775599'}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              color === 'dark'
                ? styles.passwordContainerDark
                : styles.passwordContainer,
            ]}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={color === 'dark' ? '#afafaf' : '#77559990'}
              style={{flex: 1, color: color === 'dark' ? '#fff' : '#000'}}
              secureTextEntry={!showConfirmPassword}
              value={cpass}
              onChangeText={setCpass}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              style={{padding: 8}}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={22}
                color={color === 'dark' ? '#afafaf' : '#775599'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, getDisabledState() && {opacity: 0.6}]}
            disabled={getDisabledState()}
            onPress={create}>
            <Text style={styles.buttonText}>
              {getDisabledState() ? 'Creating' : 'Create'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={color === 'dark' ? styles.linkAltDark : styles.linkAlt}>
              Have an account?{' '}
              <Text style={color === 'dark' ? styles.linkDark : styles.link}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default SignupScreen;
