import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {
  primary: '#2A4D50',
  secondary: '#DDF0FF',
  tertiary: '#FF7754',

  gray: '#83829A',
  gray2: '#C1C0C8',

  offwhite: '#F3F4F8',
  white: '#FFFFFF',
  black: '#000000',
  red: '#e81e4d',
  green: '#00C135',
  lightWhite: '#FAFAFC',
  // Add or modify colors as needed
};

const SIZES = {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 44,
  height: height,
  width: width,
  // Add or modify sizes as needed
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  // Add or modify shadow styles as needed
};

export {COLORS, SIZES, SHADOWS};
