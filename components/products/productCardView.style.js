import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 2 - 20,
    height: 240,
    marginEnd: 22,
    marginBottom: 0,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    // width: 170,
    width: SIZES.width / 2 - 32,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  supplier: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 2,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xsmall,
    right: SIZES.xsmall,
  },
});

export default styles;
