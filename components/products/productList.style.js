import {StyleSheet} from 'react-native';
import {SIZES} from '../../constants';

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//   },
//   container: {
//     alignItems: 'center',
//     paddingLeft: SIZES.small / 2,
//   },
//   separator: {
//     height: 16,
//   },
// });

// styles/productList.style.js
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1, // Ensure the container takes the available space
    paddingTop: SIZES.xxlarge,
    paddingHorizontal: '1%',
    paddingBottom: 60,
  },
  separator: {
    height: 30, // Reduce the height to decrease space between rows
  },
});

export default styles;
