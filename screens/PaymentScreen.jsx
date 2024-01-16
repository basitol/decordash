import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import {useOrder} from '../hook/useOrder';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from '../constants';
import styles from './paymentScreen.style';

const PaymentScreen = ({route}) => {
  const {total, orderId} = route.params;
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Awaiting payment...');
  const {updateOrder} = useOrder();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPaymentIntentClientSecret = async () => {
      setIsLoading(true);
      try {
        const amountInCents = Math.round(total * 100);
        const response = await axios.post(
          'https://coffee-booking.onrender.com/create-payment-intent',
          {amount: amountInCents},
        );
        setClientSecret(response.data.clientSecret);
        setPaymentStatus('Ready to pay');
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to load payment information. Please try again later.',
        );
        setPaymentStatus('Failed to load payment info');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentIntentClientSecret();
  }, [total]);

  const handlePaymentSuccess = async () => {
    // Update the order status in your backend
    const updateData = {paymentStatus: 'paid'}; // Set the data to be updated
    await updateOrder(orderId, updateData);
    // You can handle the response and errors as needed
  };

  const handlePayment = async () => {
    if (!clientSecret) {
      Alert.alert(
        'Payment Error',
        'Unable to process payment. Please try again.',
      );
      return;
    }

    const {error} = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (!error) {
      const result = await stripe.presentPaymentSheet();
      if (result.error) {
        Alert.alert('Payment Error', result.error.message);
        setPaymentStatus('Payment failed');
      } else {
        Alert.alert('Success', 'Your payment was successful!');
        setPaymentStatus('Payment successful');
        handlePaymentSuccess(); // Call this function on successful payment
      }
    } else {
      Alert.alert('Payment Error', error.message);
      setPaymentStatus('Payment initialization failed');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name='chevron-back-circle'
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Payment</Text>
        </View>
        <Text style={styles.title}>Complete Your Payment</Text>
        <Text style={styles.instructions}>
          Please confirm the amount and proceed to payment.
        </Text>
        <Text style={styles.totalAmount}>
          Amount to Pay: ${total.toFixed(2)}
        </Text>
        <Text style={styles.status}>{paymentStatus}</Text>

        {isLoading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
