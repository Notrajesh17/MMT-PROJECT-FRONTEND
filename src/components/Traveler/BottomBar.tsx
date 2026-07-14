import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const iconMap = {
  Home: 'home',
  TravelAgency: 'building',
  Taxi: 'car',
  Calendar: 'calendar',
  Reels: 'video-camera',
  Profile: 'user',
};

const BottomTabBar = ({state, descriptors, navigation}) => (
  <View style={styles.container}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      const iconName = iconMap[route.name] || 'circle';

      return (
        <TouchableOpacity
          key={route.key}
          onPress={() => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }}
          style={styles.tab}>
          <Icon
            name={iconName}
            size={20}
            color={isFocused ? '#110642' : '#666'}
          />
          <Text style={[styles.label, {color: isFocused ? '#110642' : '#666'}]}>
            {route.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#FFF8F1',
    borderTopWidth: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomTabBar;
