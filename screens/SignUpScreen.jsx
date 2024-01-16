import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UpperRow, Button} from '../components';
import {SIZES, COLORS} from '../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
  location: Yup.string()
    .min(3, 'Please provide a valid location address')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Please provide a valid username')
    .required('Required'),
});

const SignUpScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [obscureText, setObscureText] = useState(false);

  const handleSignUp = async values => {
    setLoader(true);
    try {
      const endpoint = 'https://coffee-booking.onrender.com/api/auth/register';
      const response = await axios.post(endpoint, values);

      if (response.status === 200 || response.status === 201) {
        // Handle successful signup
        console.log('Signup successful:', response.data);
        navigation.navigate('LoginScreen'); // Navigate to login screen after signup
      } else {
        // Handle other HTTP statuses
        Alert.alert('Signup Failed', 'Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      Alert.alert(
        'Error',
        'An error occurred during signup. Please try again.',
      );
    } finally {
      setLoader(false);
    }
  };

  const inValidForm = () => {
    Alert.alert('Invalid Form', 'Please provide all required fields', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Continue',
        onPress: () => {},
      },
      {default: 1},
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View>
            <UpperRow onPress={() => navigation.goBack()} />

            <Image
              source={require('../assets/images/bk.png')}
              style={styles.cover}
            />

            <Text style={styles.title}>Unlimited Luxurious Furniture </Text>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                location: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSignUp}>
              {({
                handleChange,
                handleBlur,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
              }) => (
                <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.textLabel}>Username</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.username ? COLORS.primary : COLORS.offwhite,
                      )}>
                      <MaterialCommunityIcons
                        name='face-man-profile'
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />

                      <TextInput
                        placeholder='Enter username'
                        onChangeText={handleChange('username')}
                        onFocus={() => {
                          setFieldTouched('username');
                        }}
                        onBlur={() => setFieldTouched('username', '')}
                        value={values.username}
                        autocapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>

                    {touched.username && errors.username && (
                      <Text style={styles.errorMessage}>{errors.username}</Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.textLabel}>Email</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.primary : COLORS.offwhite,
                      )}>
                      <MaterialCommunityIcons
                        name='email-outline'
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />

                      <TextInput
                        placeholder='Enter email'
                        onChangeText={handleChange('email')}
                        onFocus={() => {
                          setFieldTouched('email');
                        }}
                        onBlur={() => setFieldTouched('email', '')}
                        value={values.email.toLowerCase()}
                        autocapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>

                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.textLabel}>Location</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.location ? COLORS.primary : COLORS.offwhite,
                      )}>
                      <Ionicons
                        name='location-outline'
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />

                      <TextInput
                        placeholder='Enter location'
                        onChangeText={handleChange('location')}
                        onFocus={() => {
                          setFieldTouched('location');
                        }}
                        onBlur={() => setFieldTouched('location', '')}
                        value={values.location}
                        autocapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                    </View>

                    {touched.location && errors.location && (
                      <Text style={styles.errorMessage}>{errors.location}</Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.textLabel}>Password</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.password ? COLORS.primary : COLORS.offwhite,
                      )}>
                      <MaterialCommunityIcons
                        name='lock-outline'
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />

                      <TextInput
                        secureTextEntry={obscureText}
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        onFocus={() => {
                          setFieldTouched('password');
                        }}
                        onBlur={() => {
                          setFieldTouched('password', '');
                        }}
                        value={values.password}
                        autocapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                      />

                      <TouchableOpacity
                        onPress={() => setObscureText(!obscureText)}>
                        <MaterialCommunityIcons
                          name={obscureText ? 'eye-outline' : 'eye-off-outline'}
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>

                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>

                  <Button
                    title={'S I G N U P'}
                    onPress={isValid ? handleSubmit : inValidForm}
                    isValid={isValid}
                    loader={loader}
                  />

                  {/* <Text
                        style={styles.registration}
                        onPress={() => navigation.navigate('SignUpScreen')}>
                        Register
                    </Text> */}
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  cover: {
    height: SIZES.height / 3,
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
