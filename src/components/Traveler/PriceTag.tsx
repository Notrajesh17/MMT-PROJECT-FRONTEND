import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  originalPrice: number;
  discountedPrice: number;
}

const PriceTag: React.FC<Props> = ({ originalPrice, discountedPrice }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.original}>₹{originalPrice}</Text>
      <Text style={styles.discounted}>₹{discountedPrice}/night</Text>
    </View>
  );
};

export default PriceTag;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  original: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 6,
    fontSize: 12,
  },
  discounted: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});