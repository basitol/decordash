import {StyleSheet, Platform} from 'react-native';
import {SIZES} from '../../constants';

// styles/productList.style.js
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1, // Ensure the container takes the available space
    paddingTop: Platform.OS === 'ios' ? SIZES.large + 4 : SIZES.xxlarge,
    paddingHorizontal: '1%',
    paddingBottom: 60,
  },
  separator: {
    height: 30, // Reduce the height to decrease space between rows
  },
});

export default styles;
