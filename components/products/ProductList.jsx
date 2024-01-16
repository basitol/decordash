import {FlatList, ActivityIndicator, View, ScrollView} from 'react-native';
import React from 'react';
import styles from './productList.style';
import useFetch from '../../hook/useFetch';
import {COLORS, SIZES} from '../../constants';
import ProductCardView from './ProductCardView';

const ProductList = () => {
  const {data, isLoading} = useFetch();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxlarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2} // Ensure two columns are displayed
        renderItem={({item}) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // Add keyExtractor for unique keys
        keyExtractor={(item, index) => item.id || index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default ProductList;
