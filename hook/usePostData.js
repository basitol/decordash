import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const usePostData = (url, onSuccess, onSuccessCallback) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCartCountInStorage = async cartData => {
    try {
      if (cartData && cartData.products) {
        const count = cartData.products.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        await AsyncStorage.setItem('cartCount', JSON.stringify(count));
      }
    } catch (e) {
      console.error('Error saving cart count:', e);
    }
  };

  const updateCartInStorage = async cartData => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
    } catch (e) {
      console.error('Error saving cart data:', e);
    }
  };

  const postData = async data => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.post(url, data);
      setResponse(result.data.data);

      if (url.includes('/cart')) {
        await updateCartCountInStorage(result.data.data);
        await updateCartInStorage(result.data.data);
        Toast.show({
          type: 'success',
          text1: 'Cart Updated',
          text2: 'Item added to cart successfully!',
        });
      }

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result.data.data);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // const removeItemFromCart = async productToRemove => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const removeUrl = `https://coffee-booking.onrender.com/api/cart/remove`;
  //     const result = await axios.post(removeUrl, productToRemove);
  //     console.log('API Response:', result);
  //     setResponse(result.data.data);

  //     await updateCartCountInStorage(result.data.data);
  //     await updateCartInStorage(result.data.data);
  //     console.log('Updated Cart Data:', result.data.data);

  //     // Call the onSuccessCallback if provided
  //     if (onSuccessCallback && typeof onSuccessCallback === 'function') {
  //       onSuccessCallback(result.data.data);
  //     }
  //   } catch (e) {
  //     console.error('Error in removeItemFromCart:', e.message);
  //     setError(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const removeItemFromCart = async productToRemove => {
    setIsLoading(true);
    setError(null);

    try {
      const removeUrl = `https://coffee-booking.onrender.com/api/cart/remove`;
      const result = await axios.post(removeUrl, productToRemove);
      setResponse(result.data.data);

      if (removeUrl.includes('/cart')) {
        await updateCartCountInStorage(result.data.data);
        await updateCartInStorage(result.data.data);
        Toast.show({
          type: 'success',
          text1: 'Cart Updated',
          text2: 'Item removed from cart successfully!',
        });
      }

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result.data.data);
      }
    } catch (e) {
      console.error('Error in removeItemFromCart:', e.message);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCart = async userId => {
    setIsLoading(true);
    setError(null);

    try {
      const deleteUrl = `https://coffee-booking.onrender.com/api/cart/${userId}`;
      const result = await axios.delete(deleteUrl);
      console.log('Cart Deleted:', result.data);

      setResponse(result.data);

      // Clear cart count and cart data in AsyncStorage
      await AsyncStorage.removeItem('cart');
      await AsyncStorage.removeItem('cartCount');

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result.data);
      }
    } catch (e) {
      console.error('Error in deleteCart:', e.message);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {response, isLoading, error, postData, removeItemFromCart, deleteCart};
};

const fetchCartData = async userId => {
  try {
    const response = await axios.get(
      `https://coffee-booking.onrender.com/api/cart/${userId}`,
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return null;
  }
};

export {fetchCartData, usePostData};
