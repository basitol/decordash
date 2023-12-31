import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log('API Response:', result.data.data);
      setResponse(result.data.data);

      // Update cart count and cart data in AsyncStorage if the URL is related to cart operations
      if (url.includes('/cart')) {
        await updateCartCountInStorage(result.data.data);
        await updateCartInStorage(result.data.data);
        console.log('Updated Cart Count:', result.data.data);
      }

      // Call onSuccess callback if provided
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
      // console.log('API Response:', result);
      setResponse(result.data.data);

      // Update cart count and cart data in AsyncStorage if the URL is related to cart operations
      if (removeUrl.includes('/cart')) {
        await updateCartCountInStorage(result.data.data);
        await updateCartInStorage(result.data.data);
        console.log('Updated Cart Data:', result.data.data);
      }

      // Call the onSuccessCallback if provided
      if (onSuccess && typeof onSuccess === 'function') {
        // Fetch the updated cart items after storage updates
        // await fetchCartItems();
        onSuccess(result.data.data);
      }
    } catch (e) {
      console.error('Error in removeItemFromCart:', e.message);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {response, isLoading, error, postData, removeItemFromCart};
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
