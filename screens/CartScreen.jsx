import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './cartScreen.style';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import {COLORS} from '../constants';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {usePostData} from '../hook/usePostData';
import useCheckUser from '../hook/useCheckUser';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const {userData} = useCheckUser();

  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, []),
  );

  const isCartEmpty = cartItems.length === 0;

  const fetchCartItems = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart !== null) {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart && parsedCart.products) {
          setCartItems(parsedCart.products);
          console.log('Cart Items', parsedCart.products);
        }
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const onCartUpdate = () => {
    fetchCartItems();
  };

  const {removeItemFromCart} = usePostData(
    'https://coffee-booking.onrender.com/api/cart/remove',
    onCartUpdate, // Pass onCartUpdate as onSuccessCallback
  );

  const handleRemoveFromCart = item => {
    // console.log(item);
    Alert.alert(
      'Remove Item From Cart',
      'Are you sure you want to remove this item from the cart?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            const productToRemove = {
              productId: item._id,
              userId: userData?.id,
            };
            removeItemFromCart(productToRemove);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const TAX_RATE = 0.08; // 8% tax rate

  const calculateOrderSummary = cartItems => {
    const subtotal = cartItems.reduce((total, item) => {
      const itemQuantity = item.quantity;
      const itemPrice = item?.cartItem?.price?.replace('$', '');

      // Add additional checks to ensure necessary properties are defined
      if (itemQuantity && itemPrice) {
        return total + itemQuantity * parseFloat(itemPrice);
      }

      return total;
    }, 0);

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {subtotal, tax, total};
  };

  const {subtotal, tax, total} = calculateOrderSummary(cartItems);

  const handleCheckoutPress = () => {
    if (isCartEmpty) {
      Alert.alert(
        'Empty Cart',
        'Your cart is empty. Add some items before checking out.',
      );
    } else {
      navigation.navigate('BillingScreen', {
        subtotal,
        tax,
        total,
        totalAmount: total,
      });
    }
  };

  const renderHeader = () => {
    return (
      // <View>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>
      // {/* Any other header content */}
      // </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        {/* Order Summary */}
        <View style={styles.orderSummary}>
          <Text style={styles.orderInfoHeader}>Cart Info</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
          </View>

          <Text>Delivery Fee not included yet</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          // onPress={() =>
          onPress={handleCheckoutPress}>
          <Text style={styles.checkoutButtonText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Image
                source={{uri: item.cartItem.imageUrl}}
                style={styles.productImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.cartItem.title}</Text>
                <Text style={styles.itemSupplier}>
                  {item.cartItem.supplier}
                </Text>
                <Text style={styles.price}>
                  {item.cartItem.price} * {item.quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveFromCart(item.cartItem)}
                style={styles.removeButton}>
                <AntDesign name='delete' size={24} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
