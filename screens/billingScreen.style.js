import {StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.small,
    width: SIZES.width - 44,
    zIndex: 999,
    marginTop: Platform.OS === 'ios' ? 12 : 30,
  },
  headerText: {
    fontFamily: 'bold',
    fontSize: SIZES.xlarge,
    color: COLORS.primary,
    marginLeft: SIZES.large,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 10,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    fontSize: SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    alignItems: 'center',
    marginTop: SIZES.large,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  orderSummary: {
    marginVertical: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
  },
  orderInfoHeader: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: SIZES.small,
    color: COLORS.primary,
  },
  summaryText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  total: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  orderInfoText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  // Add more styles as needed
});

export default styles;
