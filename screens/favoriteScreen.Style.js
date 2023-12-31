import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: SIZES.xlarge + 4,
    color: COLORS.primary,
    marginLeft: SIZES.small,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  left: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    // Add more styles as needed
  },
  infoContainer: {
    padding: 10,
    // Add more styles as needed
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    // Add more styles as needed
  },
  supplier: {
    fontFamily: 'light',
    color: COLORS.gray,
  },
  price: {
    fontSize: 14,
    color: COLORS.gray,
    // Add more styles as needed
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    // Add more styles as needed
  },

  deleteButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  clearFavoritesButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  clearFavoritesButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
