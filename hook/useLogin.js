// hooks/useLogin.js
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

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

  const handleLogin = async (values, onSuccess, onFailure) => {
    setLoader(true);

    try {
      const loginEndpoint =
        'https://coffee-booking.onrender.com/api/auth/login';
      const loginResponse = await axios.post(loginEndpoint, values);

      if (loginResponse.status === 200) {
        const userData = loginResponse.data.data;
        await AsyncStorage.setItem(
          `user${userData.id}`,
          JSON.stringify(userData),
        );
        if (userData && userData.id) {
          await AsyncStorage.setItem('id', JSON.stringify(userData.id));

          // Fetch additional data like cart and order history
          const cartEndpoint = `https://coffee-booking.onrender.com/api/cart/${userData.id}`;
          const cartResponse = await axios.get(cartEndpoint);
          await AsyncStorage.setItem(
            'cart',
            JSON.stringify(cartResponse.data.data),
          );

          // Update cart count in AsyncStorage
          await updateCartCountInStorage(cartResponse.data.data);

          // Similarly, fetch and store order history if needed

          onSuccess && onSuccess();
        }
      } else {
        onFailure && onFailure('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      onFailure && onFailure(err.message);
    } finally {
      setLoader(false);
    }
  };

  return {handleLogin, loader, error};
};

export default useLogin;
