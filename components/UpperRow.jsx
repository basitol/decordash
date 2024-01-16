import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import styles from './upperRow.style';
import {COLORS, SIZES} from '../constants';

const UpperRow = ({onPress, headerText}) => {
  return (
    <View style={styles.upperRow}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name='chevron-back-circle' size={30} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

export default UpperRow;
