import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  rating: number;
}

const RatingBadge: React.FC<Props> = ({ rating }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default RatingBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FFA726',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});