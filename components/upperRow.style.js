import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  upperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.small,
    width: SIZES.width - 44,
    zIndex: 999,
    // marginTop: 30,
    marginTop: Platform.OS === 'ios' ? 12 : 30,
    marginHorizontal: 20,
  },
  headerText: {
    fontFamily: 'bold',
    fontSize: SIZES.xlarge,
    color: COLORS.primary,
    marginLeft: SIZES.large,
  },
});

export default styles;
