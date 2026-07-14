import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SearchBar: React.FC<{placeholder?: string}> = ({placeholder}) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="search" size={16} color="#aaa" style={styles.icon} />
      <TextInput
        placeholder={placeholder || 'Search Hotels'}
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
});

export default SearchBar;
