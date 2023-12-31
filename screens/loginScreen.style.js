import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.xxlarge,
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    color: COLORS.primary,
    // alignItems: 'center',
    textAlign: 'center',
    marginBottom: SIZES.xxlarge,
  },
  wrapper: {
    marginBottom: 20,
  },
  textLabel: {
    fontFamily: 'regular',
    fontSize: SIZES.xsmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: 'right',
  },
  inputWrapper: borderColor => ({
    borderWidth: 1,
    borderRadius: 12,
    borderColor: borderColor,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: 'regular',
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xsmall,
  },
  registration: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;
