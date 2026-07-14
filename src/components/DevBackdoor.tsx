import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const DevBackdoor = () => {
  const navigation = useNavigation();

  const handleReset = async () => {
    try {
      await AsyncStorage.clear();
      Toast.show({
        type: 'success',
        text1: 'App reset successfully',
      });

      // Navigate back to Splash or Home
      navigation.reset({
        index: 0,
        routes: [{name: 'Splash' as never}],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Reset failed',
        text2: error?.message,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleReset}>
      <Text style={styles.text}>🛠 Reset</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    opacity: 0.6,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DevBackdoor;
