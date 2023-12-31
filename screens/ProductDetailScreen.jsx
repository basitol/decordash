import React, {useState, useEffect, useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from '@expo/vector-icons';
import styles from './productDetailScreen.style';
import {COLORS, SIZES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      const favoriteStatus = favorites.some(
        favItem => favItem._id === item._id,
      );
      setIsFavorite(favoriteStatus);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [item]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await checkFavoriteStatus();
      };

      fetchData();
    }, [checkFavoriteStatus]),
  );

  const handleFavoriteToggle = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (isFavorite) {
        favorites = favorites.filter(favItem => favItem._id !== item._id);
      } else {
        favorites.push(item);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    count > 0 ? setCount(count - 1) : null;
  };

  const ratingValue = 4.2;
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name='chevron-back-circle' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFavoriteToggle}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color={isFavorite ? COLORS.primary : COLORS.gray}
          />
        </TouchableOpacity>
      </View>
      <Image source={{uri: item?.imageUrl}} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item?.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item?.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map(index => {
              let iconName = 'star-outline';
              if (ratingValue >= index) {
                iconName = 'star';
              } else if (ratingValue >= index - 0.5) {
                iconName = 'star-half';
              }
              return (
                <Ionicons key={index} name={iconName} color='gold' size={24} />
              );
            })}
            <Text style={styles.ratingText}>({ratingValue})</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name='plus' size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{`    ${count}    `}</Text>
            <TouchableOpacity
              onPress={() => {
                decrement();
              }}>
              <SimpleLineIcons name='minus' size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{item?.description}</Text>
        </View>

        <View style={{marginBottom: SIZES.small}}>
          <View style={styles.location}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name='location-outline' size={20} />
              <Text>{'  ' + 'Lagos' + '  '}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name='truck-delivery-outline' size={20} />
              <Text>{'  ' + 'Free Delivery' + '  '}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.addCart}>
            <Fontisto name='shopping-bag' size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
