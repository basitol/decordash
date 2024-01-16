import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import styles from './billingScreen.style';
import {Ionicons} from '@expo/vector-icons';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import useCheckUser from '../hook/useCheckUser';
import {useOrder} from '../hook/useOrder';
import Toast from 'react-native-toast-message';
import {usePostData} from '../hook/usePostData';
import {UpperRow} from '../components';

// ... statesAndCities remains the same ...
const statesAndCities = {
  Lagos: ['Lagos', 'Ikeja', 'Lekki', 'Badagry'],
  Abuja: ['Garki', 'Asokoro', 'Maitama', 'Wuse'],
  Rivers: ['Port Harcourt', 'Obio-Akpor', 'Bonny'],
  Kano: ['Kano', 'Wudil', 'Bichi', 'Rano'],
  Oyo: ['Ibadan', 'Ogbomosho', 'Oyo', 'Iseyin'],
  Kaduna: ['Kaduna', 'Zaria', 'Kafanchan', 'Kagoro'],
  Enugu: ['Enugu', 'Nsukka', 'Awgu', 'Udi'],
  Delta: ['Warri', 'Asaba', 'Sapele', 'Agbor'],
  Anambra: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia'],
  AkwaIbom: ['Uyo', 'Eket', 'Ikot Ekpene', 'Oron'],
  // Add more states and cities as needed
};

const BillingScreen = ({route}) => {
  const navigation = useNavigation();
  const {subtotal, tax, total} = route.params;
  const {userData} = useCheckUser();
  const {createOrder} = useOrder(
    'https://coffee-booking.onrender.com/orders',
    handleOrderSuccess,
  );

  const [address, setAddress] = useState('');
  const [selectedState, setSelectedState] = useState('Lagos');
  const [selectedCity, setSelectedCity] = useState(statesAndCities['Lagos'][0]);
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    console.log(address, selectedCity, postalCode, country);
    if (!address || !selectedCity || !postalCode || !country) {
      Alert.alert('Missing Information', 'Please fill all the fields.');
      return;
    }

    // Confirm before creating the order
    Alert.alert('Confirm Order', 'Are you sure you want to place this order?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Order creation cancelled'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => createOrderAndNavigate(),
      },
    ]);
  };

  const createOrderAndNavigate = async () => {
    const orderData = {
      userId: userData.id,
      address,
      city: selectedCity,
      postalCode,
      country,
      subTotal: subtotal,
      total,
      paymentStatus: 'pending',
    };

    try {
      const response = await createOrder(orderData);

      // Check if the response contains the expected data
      if (
        response &&
        response.status &&
        response.message === 'Order created successfully'
      ) {
        // Show toast notification
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Order Created',
          text2: 'Your order has been created successfully.',
        });

        // Navigate after a short delay
        setTimeout(() => {
          navigation.navigate('PaymentScreen', {
            orderId: response.data._id,
            total,
          });
        }, 1500); // Delay of 1.5 seconds
      } else {
        // Handle cases where response is not as expected
        Alert.alert(
          'Order Creation Failed',
          'Unable to create the order. Please try again.',
        );
      }
    } catch (error) {
      console.error('Order creation error:', error);
      Alert.alert(
        'Order Creation Error',
        'An error occurred while creating the order. Please try again.',
      );
    }
  };

  const handleOrderSuccess = orderData => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <UpperRow
            headerText={'Billing And Address Info'}
            onPress={() => navigation.goBack()}
          />

          <View style={styles.orderSummary}>
            <Text style={styles.orderInfoHeader}>Order Info</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.summaryText}>Delivery Fee</Text>
              <Text style={styles.summaryText}>${tax.toFixed(2)}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.summaryText}>Total</Text>
              <Text style={styles.total}>${total.toFixed(2)}</Text>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder='Address'
            value={address}
            onChangeText={setAddress}
          />

          <RNPickerSelect
            onValueChange={value => setSelectedState(value)}
            style={pickerSelectStyles}
            items={Object.keys(statesAndCities).map(state => ({
              label: state,
              value: state,
            }))}
            placeholder={{label: 'Select State', value: null}}
            value={selectedState}
            useNativeAndroidPickerStyle={false}
          />

          <RNPickerSelect
            onValueChange={value => setSelectedCity(value)}
            style={pickerSelectStyles}
            items={statesAndCities[selectedState].map(city => ({
              label: city,
              value: city,
            }))}
            placeholder={{label: 'Select City', value: null}}
            value={selectedCity}
            useNativeAndroidPickerStyle={false}
          />

          <TextInput
            style={styles.input}
            placeholder='Postal Code'
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <TextInput
            style={styles.input}
            placeholder='Country'
            value={country}
            onChangeText={setCountry}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    marginVertical: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: SIZES.small,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }, // to ensure the text is never behind the icon

  inputAndroid: {
    height: 50,
    marginVertical: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: 'black', // Ensure placeholder color is visible
  },
});

export default BillingScreen;
