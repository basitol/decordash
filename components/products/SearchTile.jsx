import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './searchTile.style';
import {useNavigation} from '@react-navigation/native';

const SearchTile = ({item}) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('ProductDetailScreen', {item})}>
        <View style={styles.image}>
          <Image source={{url: item?.imageUrl}} style={styles.productImg} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item?.title}</Text>
          <Text style={styles.supplier}>{item?.supplier}</Text>
          <Text style={styles.price}>{item?.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
