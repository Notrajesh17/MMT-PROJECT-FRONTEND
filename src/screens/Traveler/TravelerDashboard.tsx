import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/Traveler/CustomHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchHomepageProperties} from '../../api/home';

const screenWidth = Dimensions.get('window').width;

const TravelerDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const agencies = [
    {
      title: 'Hills Adventure, Manali',
      price: '15000',
      image:
        'https://static.toiimg.com/thumb/msid-83750861,width-748,height-499,resizemode=4,imgsize-195043/.jpg',
    },
    {
      title: 'Beach Adventure, Goa',
      price: '15000',
      image: 'https://www.exoticgoa.com/images/adventure.jpg',
    },
  ];

  useEffect(() => {
    const loadProperties = async () => {
      const data = await fetchHomepageProperties();
      setProperties(data);
      setLoading(false);
    };
    loadProperties();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size="large" />;
  }

  const displayedProperties = showAll ? properties : properties.slice(0, 5);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <ImageBackground
          source={require('../../assets/Images/dashboard-bg.png')}
          style={styles.headerBg}
          imageStyle={{
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}>
          <CustomHeader />
        </ImageBackground>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}>
          {['Hotels', 'Villas', 'Resorts', 'Beach Resorts', 'Staycation'].map(
            (cat, idx) => (
              <TouchableOpacity key={idx} style={styles.filterTab}>
                <Text style={styles.filterText}>{cat}</Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        {/* Recommended Hotels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Hotels</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={displayedProperties}
            keyExtractor={item => item.propertyId}
            renderItem={({item}) => {
              const room = item.roomType?.[0];
              const image =
                room?.uploadRoomImageUrls?.[0] ??
                'https://via.placeholder.com/150';

              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('PropertyDetails', {
                      hotel: {
                        title: item.hotelName,
                        location: `${item.location?.city || ''}, ${
                          item.location?.state || ''
                        }`,
                        image,
                        roomTypes: item.roomType.map(r => ({
                          type: r.roomtypeNames,
                        })),
                        price: room?.baseRate || 0,
                        amenities: room?.amenities || [],
                        gallery: room?.uploadRoomImageUrls || [],
                        usp: `${item.propertyType} in ${
                          item.location?.city || 'unknown'
                        }`,
                        propertyFacts: `${item.propertyType}`,
                        locationMap:
                          'https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=5&size=400x200',
                      },
                    })
                  }>
                  <Image source={{uri: image}} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.hotelName}</Text>
                    <Text style={styles.cardSub}>
                      {item.location?.city}, {item.location?.state}
                    </Text>
                    <Text style={styles.cardPrice}>
                      ₹{room?.baseRate || 'N/A'}/night
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          {properties.length > 5 && (
            <TouchableOpacity onPress={() => setShowAll(!showAll)}>
              <Text style={styles.showMore}>
                {showAll ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Travel Agencies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Agencies</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={agencies}
            keyExtractor={(item, index) => `agency-${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('TravelAgency')}>
                <Image source={{uri: item.image}} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardPrice}>₹{item.price}/person</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF8F1'},
  headerBg: {
    paddingTop: 15,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  filters: {flexDirection: 'row', marginTop: 16, paddingHorizontal: 16},
  filterTab: {
    backgroundColor: '#ffeef3',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {fontSize: 13, fontWeight: '600', color: '#e91e63'},
  section: {marginTop: 24, paddingHorizontal: 16},
  sectionTitle: {fontSize: 16, fontWeight: 'bold', marginBottom: 12},
  card: {
    width: screenWidth * 0.6,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {width: '100%', height: 120},
  cardContent: {padding: 10},
  cardTitle: {fontWeight: 'bold', fontSize: 14},
  cardSub: {fontSize: 12, color: '#888', marginVertical: 2},
  cardPrice: {color: '#e91e63', fontWeight: 'bold', fontSize: 13},
  showMore: {
    color: '#e91e63',
    textAlign: 'right',
    paddingRight: 16,
    paddingTop: 6,
    fontWeight: '500',
  },
});

export default TravelerDashboardScreen;
