import React, {useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {useOrder} from '../hook/useOrder';
import useCheckUser from '../hook/useCheckUser';
import {useFocusEffect} from '@react-navigation/native';
import styles from './orderScreen.style'; // Ensure this path is correct
import {UpperRow} from '../components';

const OrderScreen = ({navigation}) => {
  const {getUserOrders, orders, isLoading, error} = useOrder();
  const {userData} = useCheckUser();

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.id) {
        getUserOrders(userData.id);
      }
    }, [userData, getUserOrders]),
  );

  if (isLoading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

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
      onPress={() => navigation.navigate('OrderDetails', {item, navigation})}>
      <Text style={styles.orderTitle}>Order ID: {item._id}</Text>
      <Text style={styles.detailText}>Total: ${item.total.toFixed(2)}</Text>
      {/* <Text style={styles.detailText}>Status:
         {item.paymentStatus}</Text> */}
      {getStatusIndicator(item.paymentStatus)}
      <Text style={styles.detailText}>Delivered: {item.delivery_status}</Text>
      {/* <Ionicons name='chevron-forward-circle' size={24} style={styles.icon} /> */}
    </TouchableOpacity>
  );

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
