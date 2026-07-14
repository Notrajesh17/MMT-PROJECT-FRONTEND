import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

interface ComingSoonProps {
  showLogout?: boolean;
  containerStyle?: ViewStyle;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  showLogout = false,
  containerStyle,
}) => {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'Splash' as never}],
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Logout failed',
        text2: error?.message || '',
      });
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FontAwesome5 name="clock" size={80} color="#aaa" />
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>
        We're working hard to bring you this feature!
      </Text>

      {showLogout && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome5 name="sign-out-alt" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF6E9',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 40,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
