import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './favoriteScreen.Style';
import {Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import {COLORS} from '../constants';
import {useNavigation} from '@react-navigation/native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const clearFavorites = async () => {
    try {
      await AsyncStorage.removeItem('favorites');
      console.log('Favorites cleared');
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFavorite = async itemToRemove => {
    try {
      // Filter out the item to remove
      const updatedFavorites = favorites.filter(
        item => item._id !== itemToRemove._id,
      );

      // Update AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      // Update local state
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderFavoriteItem = ({item}) => {
    // console.log(item);
    return (
      <View style={styles.favoriteItem}>
        <View style={styles.left}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.supplier}>{item.supplier}</Text>
            <Text style={styles.price}>{item.price}</Text>
            {/* Add more details as needed */}
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeFavorite(item)}>
          <SimpleLineIcons name='trash' size={24} color='#000' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
      ) : (
        <Text style={styles.emptyMessage}>No favorites added yet.</Text>
      )}

      <TouchableOpacity
        style={styles.clearFavoritesButton}
        onPress={clearFavorites}>
        <Text style={styles.clearFavoritesButtonText}>
          Delete All Favorites
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
