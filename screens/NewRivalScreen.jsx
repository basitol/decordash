import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './newRival.style';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../constants';
import {ProductList} from '../components';

const NewRivalScreen = ({navigation, item}) => {
  //   const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name='chevron-back-circle'
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Products</Text>
        </View>
        <ProductList item={item} />
      </View>
    </SafeAreaView>
  );
};

export default NewRivalScreen;
