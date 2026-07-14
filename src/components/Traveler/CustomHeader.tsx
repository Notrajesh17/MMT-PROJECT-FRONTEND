import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const CustomHeader = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'No, take me back',
          style: 'cancel',
        },
        {
          text: 'Yes, log out',
          style: 'destructive',
          onPress: async () => {
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
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.row}>
      <Text style={styles.logo}>Travifai</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
          <FontAwesome5
            name="search"
            size={18}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5
            name="heart"
            size={18}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5
            name="comment"
            size={18}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome5
            name="sign-out-alt"
            size={18}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
});
