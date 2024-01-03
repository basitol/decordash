// styles/cartScreen.style.js
import {Platform, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
  },
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
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    overflow: 'hidden',
    shadowColor: COLORS.gray,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.small,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: SIZES.small,
    gap: 6,
  },
  itemTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemSupplier: {
    fontSize: SIZES.medium,
    fontWeight: 'light',
    color: COLORS.gray,
    // paddingTop: 8,
  },
  price: {
    // paddingTop: 8,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: SIZES.small,
  },
  quantityText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  quantity: {
    fontSize: SIZES.medium,
    marginHorizontal: SIZES.small,
  },

  orderInfoContainer: {
    marginTop: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small,
  },
  orderInfoHeader: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: SIZES.small,
    color: COLORS.primary,
  },
  orderSummary: {
    marginTop: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    marginHorizontal: 20,
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
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
    alignItems: 'center',
    marginTop: SIZES.large,
    marginBottom: SIZES.large,
    marginHorizontal: 20,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
});

export default styles;
