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
import {resetPassword} from '../../api/authApi';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import {bgImg} from './ForgotPassword';
import styles from './authStyles';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = StackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({navigation, route}) => {
  const mode = useColorScheme();
  const {email, otp} = route.params;
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const reset = async () => {
    if (pass !== cpass)
      return Toast.show({type: 'error', text1: 'Passwords do not match'});
    try {
      await resetPassword(email, pass, cpass);
      Toast.show({type: 'success', text1: 'Password reset'});
      navigation.popToTop();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message || 'Server error',
      });
    }
  };

  return (
    <ImageBackground source={bgImg(mode)} style={styles.bg}>
      <View style={[styles.card, mode === 'dark' && styles.cardDark]}>
        <Text style={mode == 'dark' ? styles.DarkTitle : styles.title}>
          Reset Password
        </Text>

        <View
          style={[
            mode === 'dark'
              ? styles.passwordContainerDark
              : styles.passwordContainer,
          ]}>
          <TextInput
            placeholder="New Password"
            placeholderTextColor={mode === 'dark' ? '#afafaf' : '#77559990'}
            secureTextEntry={!showPassword}
            style={{flex: 1, color: mode === 'dark' ? '#fff' : '#000'}}
            value={pass}
            onChangeText={setPass}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={{padding: 8}}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={mode === 'dark' ? '#afafaf' : '#775599'}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            mode === 'dark'
              ? styles.passwordContainerDark
              : styles.passwordContainer,
          ]}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={mode === 'dark' ? '#afafaf' : '#77559990'}
            secureTextEntry={!showConfirmPassword}
            style={{flex: 1, color: mode === 'dark' ? '#fff' : '#000'}}
            value={cpass}
            onChangeText={setCpass}
          />
          <TouchableOpacity
            onPress={toggleShowConfirmPassword}
            style={{padding: 8}}>
            <Icon
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={22}
              color={mode === 'dark' ? '#afafaf' : '#775599'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default ResetPasswordScreen;
