import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface HotelCardProps {
  image: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  oldPrice?: number;
  onPress?: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({
  image,
  title,
  location,
  rating,
  price,
  oldPrice,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#fff" />
          <Text style={styles.location}> {location}</Text>
        </View>
        <Text style={styles.breakfast}>
          Breakfast included · Free cancellation
        </Text>
        <Text style={styles.price}>Rs {price}/night</Text>
        {oldPrice && (
          <Text style={styles.oldPrice}>
            Starting from {oldPrice.toLocaleString()}
          </Text>
        )}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.ratingText}>Ratings</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    height: '60%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoContainer: {
    padding: 12,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    top: 130,
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  location: {
    color: '#fff',
    fontSize: 12,
  },
  breakfast: {
    fontSize: 10,
    color: '#fff',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  oldPrice: {
    fontSize: 10,
    color: '#f9c2c2',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    backgroundColor: '#FFA500',
    color: '#fff',
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#fff',
  },
});

export default HotelCard;
