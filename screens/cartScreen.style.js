// styles/cartScreen.style.js
import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flex: 1,
    // padding: SIZES.medium,
    marginHorizontal: 20,
  },
  upperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.small,
    width: SIZES.width - 44,
    zIndex: 999,
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
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: SIZES.small,
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
    paddingTop: 8,
  },
  price: {
    paddingTop: 8,
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
  },
  summaryText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.small,
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
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
});

export default styles;
