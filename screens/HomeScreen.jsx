import {useState, useCallback} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons, Fontisto} from '@expo/vector-icons';
import styles from './home.style';
import {Carousel, Headings, ProductRow, Welcome} from '../components';
import useCheckUser from '../hook/useCheckUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [cartCount, setCartCount] = useState(0);
  const {userData, isUserLoggedIn} = useCheckUser();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      updateCartCount();
    }, []),
  );

  const updateCartCount = async () => {
    try {
      const count = await AsyncStorage.getItem('cartCount');
      if (count !== null) {
        setCartCount(JSON.parse(count));
        console.log('Cart Count from AsyncStorage:', JSON.parse(count));
      }
    } catch (error) {
      console.error('Error retrieving cart count:', error);
    }
  };

  const onCartUpdate = () => {
    updateCartCount();
  };

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} />

          <Text style={styles.location}>
            {isUserLoggedIn
              ? `${userData?.location}, Nigeria`
              : 'Lagos, Nigeria'}
          </Text>

          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{cartCount}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
              <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow onCartUpdate={onCartUpdate} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
