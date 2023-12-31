import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './welcome.style';
import {COLORS, SIZES} from '../../constants/theme';
import {Feather, Ionicons} from '@expo/vector-icons';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText(COLORS.black, SIZES.xsmall)}>
        Find The Most
      </Text>
      <Text style={styles.welcomeText(COLORS.primary, 0)}>
        Luxurious Furniture
      </Text>

      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name='search' size={24} style={styles.searchIcon} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            value=''
            style={styles.searchInput}
            onPressIn={() => {
              navigation.navigate('SearchScreen');
            }}
            placeholder='What are you looking for'
          />
        </View>

        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name='camera-outline'
              size={SIZES.xlarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
