import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import {useCallback, useState} from 'react';
import styles from './productCardView.style';
import {COLORS} from '../../constants';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {usePostData} from '../../hook/usePostData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const ProductCardView = ({item, onCartUpdate}) => {
  const [userData, setUserData] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      checkExistingUser();
    }, []),
  );

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    if (id) {
      const userId = `user${JSON.parse(id)}`;
      try {
        const currentUser = await AsyncStorage.getItem(userId);
        if (currentUser !== null) {
          const parsedData = JSON.parse(currentUser);
          setUserData(parsedData);
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.log('Error retrieving the data', error);
      }
    } else {
      setIsUserLoggedIn(false);
    }
  };

  const {postData} = usePostData(
    'https://coffee-booking.onrender.com/api/cart/add',
    onCartUpdate,
  );

  const handleAddToCart = () => {
    if (!isUserLoggedIn) {
      // Handle the case where the user is not logged in
      console.log('User not logged in, cannot add to cart');
      // Optionally, prompt the user to log in
      Alert.alert(
        'Login Required',
        'You need to be logged in to add items to the cart.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Login', onPress: () => navigation.navigate('LoginScreen')},
        ],
        {cancelable: false},
      );
      return;
    }

    const productToAdd = {
      productId: item._id,
      userId: userData?.id,
      quantity: 1,
    };
    console.log('Product to Add:', productToAdd);
    postData(productToAdd, onCartUpdate);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetailScreen', {item})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            // source={require('../../assets/images/fn2.jpg')}
            source={{
              url: item?.imageUrl,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item?.supplier}
          </Text>
          <Text style={styles.price}>{item?.price}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Ionicons name='add-circle' size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
