import {FlatList, ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import styles from './productList.style';
import useFetch from '../../hook/useFetch';
import {COLORS, SIZES} from '../../constants';
import ProductCardView from './ProductCardView';

const ProductList = () => {
  const {data, isLoading, error, refetch} = useFetch();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxlarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      /> */}

      <FlatList
        data={data}
        numColumns={2} // Ensure two columns are displayed
        renderItem={({item}) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // Add keyExtractor for unique keys
        keyExtractor={(item, index) => item.id || index.toString()}
      />
    </View>
  );
};

export default ProductList;
