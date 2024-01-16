import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {UpperRow} from '../components';
import {COLORS} from '../constants';

const OrderDetails = ({route}) => {
  const {item, navigation} = route.params;
  console.log('item from order details page', item);
  if (!item) {
    return <Text>Loading...</Text>; // Consider using a loading spinner here
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <UpperRow
          headerText={'Order Details'}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.detailContainer}>
            <Text style={styles.title}>Order ID:</Text>
            <Text style={styles.content}>{item._id}</Text>

            <Text style={styles.title}>Address:</Text>
            <Text style={styles.content}>{item.address}</Text>

            <Text style={styles.title}>City:</Text>
            <Text style={styles.content}>{item.city}</Text>

            {/* Add additional details similarly */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    // padding: 20,
  },
  detailContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  // Add more styles as needed
});

export default OrderDetails;
