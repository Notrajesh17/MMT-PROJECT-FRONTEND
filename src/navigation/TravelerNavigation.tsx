import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TravelerDashboardScreen from '../screens/Traveler/TravelerDashboard';
import DiscoverScreen from '../screens/Traveler/DiscoverScreen';
import PropertyDetailsScreen from '../screens/Traveler/PropertyDetailsScreen';
import ComingSoon from '../components/ComingSoon';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabBar from '../components/Traveler/BottomBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TravellerTabs = () => (
  <Tab.Navigator
    tabBar={props => <BottomTabBar {...props} />}
    screenOptions={({route}) => ({
      headerShown: false,
    })}>
    <Tab.Screen name="Home" component={TravelerDashboardScreen} />
    <Tab.Screen name="TravelAgency" component={ComingSoon} />
    <Tab.Screen name="Taxi" component={ComingSoon} />
    <Tab.Screen name="Calendar" component={ComingSoon} />
    <Tab.Screen name="Reels" component={ComingSoon} />
    <Tab.Screen name="Profile" component={ComingSoon} />
  </Tab.Navigator>
);

const TravelerNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainTabs" component={TravellerTabs} />
    <Stack.Screen name="Discover" component={DiscoverScreen} />
    <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
    <Stack.Screen name="TravelAgency" component={ComingSoon} />
  </Stack.Navigator>
);

export default TravelerNavigator;
