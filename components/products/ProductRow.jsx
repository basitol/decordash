import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React from 'react';
import styles from './productRow.style';
import {COLORS, SIZES} from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hook/useFetch';

const ProductRow = ({onCartUpdate}) => {
  const {data, isLoading, error} = useFetch();
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.large} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ProductCardView item={item} onCartUpdate={onCartUpdate} />
          )}
          keyExtractor={item => item._id}
          horizontal
          // contentContainerStyle={{columnGap: SIZES.medium}}
        />
      )}
    </View>
  );
};

export default ProductRow;
