import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {mockCities} from '../../utils/traveler';

const CitySuggestionsCarousel = () => {
  return (
    <View style={styles.preferenceBox}>
      <View style={styles.preferenceRow}>
        <Text style={styles.preferenceTitle}>Based on your preferences</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockCities}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.cityItem}>
            <Image source={item.image} style={styles.cityImage} />
            <Text style={styles.cityName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  preferenceBox: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    color: '#9443d8',
    fontWeight: '600',
  },
  cityItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  cityImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#9443d8',
  },
  cityName: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
});

export default CitySuggestionsCarousel;
