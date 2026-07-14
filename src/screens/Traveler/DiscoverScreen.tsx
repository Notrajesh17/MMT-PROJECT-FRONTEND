import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import CitySuggestionsCarousel from '../../components/Traveler/CitySuggestionsCarousel';
import HotelSearchButton from '../../components/Traveler/HotelSearchButton';
import {useNavigation} from '@react-navigation/native';

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000),
  ); // default +1 day
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [travelAgency, setTravelAgency] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [persons, setPersons] = useState(2);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <ImageBackground
      source={require('../../assets/Images/search-bg.png')}
      style={styles.bg}
      resizeMode="cover">
      <View style={styles.overlay}>
        <CitySuggestionsCarousel />
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => navigation.goBack()}>
          <Icon name="times" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.formCard}>
          {/* Location & Person */}
          <View style={styles.row}>
            <View style={styles.formBlock}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter location"
                placeholderTextColor="#aaa"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <View style={styles.formBlock}>
              <Text style={styles.label}>Person</Text>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  onPress={() => setPersons(Math.max(1, persons - 1))}
                  style={styles.counterBtn}>
                  <Text style={styles.counterSymbol}>-</Text>
                </TouchableOpacity>
                <Text style={styles.value}>
                  {persons < 10 ? `0${persons}` : persons}
                </Text>
                <TouchableOpacity
                  onPress={() => setPersons(persons + 1)}
                  style={styles.counterBtn}>
                  <Text style={styles.counterSymbol}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Check-in Date */}
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowCheckIn(true)}>
            <Icon name="calendar" size={18} color="#9443d8" />
            <Text style={styles.dateText}>
              Check-in: {formatDate(checkInDate)}
            </Text>
          </TouchableOpacity>

          {/* Check-out Date */}
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowCheckOut(true)}>
            <Icon name="calendar" size={18} color="#9443d8" />
            <Text style={styles.dateText}>
              Check-out: {formatDate(checkOutDate)}
            </Text>
          </TouchableOpacity>

          {/* Rooms & Search */}
          <View style={styles.row}>
            <View style={styles.formBlock}>
              <Text style={styles.label}>Rooms</Text>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  onPress={() => setRooms(Math.max(1, rooms - 1))}
                  style={styles.counterBtn}>
                  <Text style={styles.counterSymbol}>-</Text>
                </TouchableOpacity>
                <Text style={styles.value}>
                  {rooms < 10 ? `0${rooms}` : rooms}
                </Text>
                <TouchableOpacity
                  onPress={() => setRooms(rooms + 1)}
                  style={styles.counterBtn}>
                  <Text style={styles.counterSymbol}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.filterBtn}>
              <Icon name="sliders" size={18} color="#fff" />
            </TouchableOpacity>

            <HotelSearchButton />
          </View>

          {/* Checkbox */}
          <TouchableOpacity
            onPress={() => setTravelAgency(!travelAgency)}
            style={styles.checkboxRow}>
            <Icon
              name={travelAgency ? 'check-square' : 'square-o'}
              size={20}
              color="#9443d8"
            />
            <Text style={styles.checkboxLabel}>
              Do you wish for travel agency assistance?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker Modals */}
        {showCheckIn && (
          <DateTimePicker
            value={checkInDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={new Date()}
            onChange={(e, date) => {
              if (date) {
                setCheckInDate(date);
                const nextDay = new Date(date);
                nextDay.setDate(nextDay.getDate() + 1);
                if (nextDay > checkOutDate) setCheckOutDate(nextDay);
              }
              setShowCheckIn(false);
            }}
          />
        )}

        {showCheckOut && (
          <DateTimePicker
            value={checkOutDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={new Date(checkInDate.getTime() + 86400000)}
            onChange={(e, date) => {
              if (date) setCheckOutDate(date);
              setShowCheckOut(false);
            }}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  bg: {flex: 1},
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    color: '#000',
    fontSize: 16,
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 4,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  formBlock: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    color: '#999',
    fontSize: 13,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 4,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  counterBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  counterSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  filterBtn: {
    backgroundColor: '#9443d8',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontStyle: 'italic',
    color: '#000',
  },
  closeIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
