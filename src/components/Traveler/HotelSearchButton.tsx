import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const HotelSearchButton = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Discover</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {alignItems: 'center', paddingVertical: 10},
  button: {
    backgroundColor: '#9443d8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },
  text: {color: '#fff', fontWeight: '600', fontSize: 16},
});

export default HotelSearchButton;
