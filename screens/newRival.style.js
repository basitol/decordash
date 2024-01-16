import {StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    width: SIZES.width - 20,
    marginHorizontal: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: Platform.OS === 'ios' ? 0 : 42,
    zIndex: 999,
  },
  heading: {
    fontFamily: 'semibold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});

export default styles;
