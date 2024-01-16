import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    paddingTop: 20, // Added padding to the top
    paddingHorizontal: 20,
  },
  upperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 12 : 30,
    width: '100%',
    zIndex: 999,
  },
  heading: {
    fontFamily: 'bold',
    fontSize: SIZES.xlarge,
    color: COLORS.primary,
    marginLeft: 20,
    flex: 1,
  },
  title: {
    marginTop: 48,
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  totalAmount: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    color: COLORS.primary,
  },
  status: {
    fontSize: 16,
    color: COLORS.tertiary,
    marginBottom: 30,
    textAlign: 'center',
  },
  payButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'semibold',
    textAlign: 'center',
  },
});

export default styles;
