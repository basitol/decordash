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

  // const handleLogin = async (values, onSuccess, onFailure) => {
  //   setLoader(true);

  //   try {
  //     const loginEndpoint =
  //       'https://coffee-booking.onrender.com/api/auth/login';
  //     const loginResponse = await axios.post(loginEndpoint, values);

  //     if (loginResponse.status === 200) {
  //       const userData = loginResponse.data.data;
  //       await AsyncStorage.setItem(
  //         `user${userData.id}`,
  //         JSON.stringify(userData),
  //       );
  //       if (userData && userData.id) {
  //         await AsyncStorage.setItem('id', JSON.stringify(userData.id));

  //         // Fetch additional data like cart and order history
  //         const cartEndpoint = `https://coffee-booking.onrender.com/api/cart/${userData.id}`;
  //         const cartResponse = await axios.get(cartEndpoint);
  //         await AsyncStorage.setItem(
  //           'cart',
  //           JSON.stringify(cartResponse.data.data),
  //         );

  //         // Update cart count in AsyncStorage
  //         await updateCartCountInStorage(cartResponse.data.data);

  //         // Similarly, fetch and store order history if needed

  //         onSuccess && onSuccess();
  //       }
  //     } else {
  //       onFailure && onFailure('Invalid credentials');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //     onFailure && onFailure(err.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // const handleLogin = async (values, onSuccess, onFailure) => {
  //   setLoader(true);
  //   console.log(values);

  //   try {
  //     const loginEndpoint =
  //       'https://coffee-booking.onrender.com/api/auth/login';

  //     console.log('Sending login request to:', loginEndpoint);

  //     const loginResponse = await axios.post(loginEndpoint, values);

  //     console.log('Login response:', loginResponse);

  //     if (loginResponse.status === 200) {
  //       const userData = loginResponse.data.data;
  //       console.log('User data:', userData);

  //       await AsyncStorage.setItem(
  //         `user${userData.id}`,
  //         JSON.stringify(userData),
  //       );

  //       if (userData && userData.id) {
  //         await AsyncStorage.setItem('id', JSON.stringify(userData.id));

  //         const cartEndpoint = `https://coffee-booking.onrender.com/api/cart/${userData.id}`;

  //         console.log('Fetching cart data from:', cartEndpoint);

  //         const cartResponse = await axios.get(cartEndpoint);

  //         console.log('Cart response:', cartResponse);

  //         await AsyncStorage.setItem(
  //           'cart',
  //           JSON.stringify(cartResponse.data.data),
  //         );

  //         await updateCartCountInStorage(cartResponse.data.data);

  //         console.log('Login successful!');
  //         onSuccess && onSuccess();
  //       }
  //     } else {
  //       console.log('Invalid credentials');
  //       onFailure && onFailure('Invalid credentials');
  //     }
  //   } catch (err) {
  //     console.error('Error during login:', err);
  //     setError(err.message);
  //     onFailure && onFailure(err.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleLogin = async (values, onSuccess, onFailure) => {
    setLoader(true);

    try {
      const loginEndpoint =
        'https://coffee-booking.onrender.com/api/auth/login';
      const loginResponse = await axios.post(loginEndpoint, values);

      console.log('Login response:', loginResponse);

      if (loginResponse.status === 200) {
        const userData = loginResponse.data.data;
        console.log('User data:', userData);

        await AsyncStorage.setItem(
          `user${userData.id}`,
          JSON.stringify(userData),
        );

        if (userData && userData.id) {
          await AsyncStorage.setItem('id', JSON.stringify(userData.id));

          const cartEndpoint = `https://coffee-booking.onrender.com/api/cart/${userData.id}`;

          console.log('Fetching cart data from:', cartEndpoint);

          try {
            const cartResponse = await axios.get(cartEndpoint);

            console.log('Cart response:', cartResponse);

            await AsyncStorage.setItem(
              'cart',
              JSON.stringify(cartResponse.data.data),
            );

            await updateCartCountInStorage(cartResponse.data.data);
          } catch (cartError) {
            // Handle 404 or other errors for the cart endpoint
            // console.error('Error fetching cart data:', cartError);
            // You can choose to ignore the error or handle it as needed
          }

          console.log('Login successful!');
          onSuccess && onSuccess();
        }
      } else {
        console.log('Invalid credentials');
        onFailure && onFailure('Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message);
      onFailure && onFailure(err.message);
    } finally {
      setLoader(false);
    }
  };

  return {handleLogin, loader, error};
};

export default useLogin;
