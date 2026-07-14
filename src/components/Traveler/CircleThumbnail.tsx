import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  imageUri: string;
  label: string;
}

const CircleThumbnail: React.FC<Props> = ({ imageUri, label }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CircleThumbnail;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#B132C0',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});