import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {checkTokenExpiry, getAuthData} from '../utils/session';
import type {StackNavigationProp} from '@react-navigation/stack';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Auth: undefined;
  Dashboard: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    const initializeApp = async () => {
      const {token} = await getAuthData();
      const isTokenValid = await checkTokenExpiry();

      setTimeout(() => {
        if (!token || !isTokenValid) {
          navigation.replace('Auth');
        } else {
          navigation.replace('Dashboard');
        }
      }, 1500);
    };

    initializeApp();
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? '#59077E' : '#D084FF'},
      ]}>
      <View style={styles.topContent}>
        <Text style={styles.headingText}>Travifai</Text>
        <Text style={styles.subText}>
          Together Karein Explore, Milkar Badhe More
        </Text>
        <Image
          source={require('../assets/Images/namaste.png')}
          style={styles.namasteImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomImageContainer}>
        <Image
          source={require('../assets/Images/welcomebg.png')}
          style={styles.busImage}
          resizeMode="cover"
        />
      </View>

      <TouchableOpacity
        testID="forceSkip"
        style={styles.arrowContainer}
        onPress={() => navigation.replace('Home')}>
        <Text style={styles.arrow}>{'>>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 40,
  },
  headingText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 36,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  namasteImage: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.06,
  },
  bottomImageContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.6,
  },
  busImage: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  arrow: {
    fontSize: 28,
    color: '#fff',
  },
});

export default SplashScreen;
