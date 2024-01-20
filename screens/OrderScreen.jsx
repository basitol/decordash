import React, {useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import {useOrder} from '../hook/useOrder';
import useCheckUser from '../hook/useCheckUser';
import {useFocusEffect} from '@react-navigation/native';
import styles from './orderScreen.style';
import {UpperRow} from '../components';

const OrderScreen = ({navigation}) => {
  const {getUserOrders, orders, isLoading, error} = useOrder();
  const {userData} = useCheckUser();
  console.error(error);

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.id) {
        getUserOrders(userData.id);
      }
    }, [userData, getUserOrders]),
  );

  const getStatusIndicator = status => {
    const isSuccess =
      status.toLowerCase() === 'paid' || status.toLowerCase() === 'successful';
    return (
      <View style={styles.payment}>
        <Text>Payment Status : </Text>
        <View
          style={[
            styles.statusIndicator,
            isSuccess ? styles.statusSuccess : styles.statusOther,
          ]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    );
  };

  const renderOrderItem = ({item}) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => navigation.navigate('OrderDetails', {item})}>
      <Text style={styles.orderTitle}>Order ID: {item._id}</Text>
      <Text style={styles.detailText}>Total: ${item.total.toFixed(2)}</Text>
      {getStatusIndicator(item.paymentStatus)}
      <Text style={styles.detailText}>Delivered: {item.delivery_status}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (error) {
    // Assuming error is an object with a message property
    return (
      <Image
        source={require('../assets/images/emptycart.png')}
        style={styles.emptyImage}
      />
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.emptyOrdersText}>You have no orders yet.</Text>
        <Text style={styles.instructionsText}>
          Start by adding items to your cart and then proceed to checkout.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductList')}
          style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Browse Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <UpperRow headerText={'Orders'} onPress={() => navigation.goBack()} />
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;
