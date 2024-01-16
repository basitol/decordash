// orderScreen.style.js
import {StyleSheet, Platform} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  headerText: {
    fontFamily: 'bold',
    fontSize: SIZES.xlarge,
    color: COLORS.primary,
    textAlign: 'left',
    margin: 20,
  },
  orderItem: {
    flexDirection: 'column',
    gap: 8,
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
    alignItems: 'left', // Ensure content is aligned
  },
  orderTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    flex: 1, // Added for proper layout
  },
  icon: {
    marginRight: 10,
    color: COLORS.primary,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    // marginTop: 8,
    // Additional styling for the status indicator
  },
  statusSuccess: {
    backgroundColor: COLORS.primary, // Color for successful status
  },
  statusOther: {
    backgroundColor: COLORS.gray, // Color for other statuses
  },
  statusText: {
    color: 'white', // Text color inside the status indicator
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    color: '#333', // Adjust as needed
    marginRight: 5,
    fontFamily: 'regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ... more styles ...
  // Additional styles...
});

export default styles;
