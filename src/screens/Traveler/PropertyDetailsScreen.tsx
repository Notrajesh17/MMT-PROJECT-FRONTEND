import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');

const PropertyDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {hotel} = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}>
        <Icon name="times" size={22} color="#000" />
      </TouchableOpacity>

      {/* Header Image Carousel */}
      <FlatList
        data={hotel.gallery || []}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.headerImage} />
        )}
      />

      {/* Tabs: Photos / Videos */}
      <View style={styles.tabBar}>
        <Text style={styles.activeTab}>Photos</Text>
        <Text style={styles.inactiveTab}>Videos</Text>
      </View>

      {/* Amenities */}
      <View style={styles.amenities}>
        {(hotel.amenities || []).map((item, idx) => (
          <View key={idx} style={styles.amenityChip}>
            <Text style={styles.amenityText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* USP & Property Facts */}
      <View style={styles.USPSection}>
        <Text style={styles.uspText}>{hotel.usp}</Text>
        <Text style={styles.readMore}>Read more</Text>
        <Text style={styles.factsTitle}>Property Hospitality Facts</Text>
        <Text style={styles.factsValue}>{hotel.propertyFacts}</Text>
      </View>

      {/* Map + Nearby */}
      <View style={styles.mapContainer}>
        <Image source={{uri: hotel.locationMap}} style={styles.mapImage} />
      </View>

      {/* Room Types */}
      <View style={styles.roomTypeSection}>
        <Text style={styles.roomTypeTitle}>Room Type</Text>
        <FlatList
          data={hotel.roomTypes}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => (
            <View style={styles.roomChip}>
              <Text style={styles.roomChipText}>{item.type}</Text>
            </View>
          )}
        />
        <Text style={styles.priceLabel}>
          Starting from ₹{hotel.price}/night + extra fees
        </Text>
      </View>

      {/* Book Now */}
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFBEF'},
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 100,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },
  headerImage: {width, height: 250},
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fcefff',
    borderRadius: 20,
    margin: 16,
    padding: 10,
  },
  activeTab: {
    padding: 10,
    color: '#e91e63',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  inactiveTab: {
    padding: 10,
    color: '#888',
    marginHorizontal: 10,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  amenityChip: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  amenityText: {fontSize: 12, color: '#333'},
  USPSection: {
    backgroundColor: '#fcefff',
    margin: 16,
    borderRadius: 14,
    padding: 14,
  },
  uspText: {color: '#333', fontSize: 13, marginBottom: 6},
  readMore: {color: '#e91e63', fontSize: 12, marginBottom: 10},
  factsTitle: {fontWeight: 'bold', fontSize: 13, color: '#555'},
  factsValue: {color: '#9c27b0', fontWeight: '600', fontSize: 14},
  mapContainer: {margin: 16},
  mapImage: {width: '100%', height: 180, borderRadius: 10},
  roomTypeSection: {marginHorizontal: 16},
  roomTypeTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 6},
  roomChip: {
    backgroundColor: '#e1d3f8',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  roomChipText: {color: '#5a189a', fontWeight: '600'},
  priceLabel: {
    marginTop: 10,
    fontWeight: '600',
    color: '#000',
    fontSize: 15,
  },
  bookBtn: {
    backgroundColor: '#e91e63',
    margin: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default PropertyDetailsScreen;
