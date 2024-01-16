import {useCallback, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useOrder = onSuccess => {
  const [response, setResponse] = useState(null);
  const [orders, setOrders] = useState(null); // Initialize the orders state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart'); // Assuming 'cart' is the key for your cart data
      await AsyncStorage.setItem('cartCount', JSON.stringify(0)); // Reset cart count to 0
    } catch (e) {
      console.error('Error clearing cart:', e);
    }
  };

  const createOrder = async orderData => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        'https://coffee-booking.onrender.com/api/orders',
        orderData,
      );
      setResponse(result.data);

      if (result.data && result.data.status === 201) {
        // Check for successful status
        clearCart(); // Clear the cart if order is successful

        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(result.data);
        }
      }

      return result.data; // Return the result data
    } catch (e) {
      setError(e.response ? e.response.data : e.message);
      console.error(
        'Order creation error:',
        e.response ? e.response.data : e.message,
      );
      return null; // Return null to indicate an error occurred
    } finally {
      setIsLoading(false);
    }
  };

  const getUserOrders = useCallback(async userId => {
    setIsLoading(true);
    setError(null);

    console.log('getUserOrders called with userId:', userId); // Log the userId

    try {
      const response = await axios.get(
        `https://coffee-booking.onrender.com/api/orders/user/${userId}`,
      );
      console.log('API response for getUserOrders:', response.data); // Log API response

      // Check if the orders are in response.data.data
      if (response.data && response.data.data) {
        setOrders(response.data.data);
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(response.data.data);
        }
      } else {
        setError('No orders found');
      }
    } catch (e) {
      setError(e.response ? e.response.data : e.message);
      console.error(
        'Error fetching orders:',
        e.response ? e.response.data : e.message,
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrder = async (orderId, updateData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.put(
        `https://coffee-booking.onrender.com/api/orders/${orderId}`,
        updateData,
      );
      setResponse(result.data);

      if (result.data && result.data.status === 200) {
        // Assuming 200 is the success status code
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(result.data);
        }
      }

      return result.data;
    } catch (e) {
      setError(e.response ? e.response.data : e.message);
      console.error(
        'Order update error:',
        e.response ? e.response.data : e.message,
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    getUserOrders,
    updateOrder,
    response,
    orders,
    isLoading,
    error,
  };
};

export {useOrder};
