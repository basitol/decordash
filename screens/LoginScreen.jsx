import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackBtn, Button} from '../components';
import {COLORS} from '../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import useLogin from '../hook/useLogin';
import styles from './loginScreen.style.js';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  email: Yup.string()
    .email('Provide a valid email address')
    .required('Required'),
});

const LoginScreen = ({navigation}) => {
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(false);
  const {handleLogin, loader, error} = useLogin();

  const onLoginSuccess = () => {
    navigation.navigate('Bottom Navigation');
  };

  const onLoginFailure = errorMessage => {
    Alert.alert('Login Error', errorMessage);
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
            <BackBtn onPress={() => navigation.navigate('ProfileScreen')} />

            <Image
              source={require('../assets/images/bk.png')}
              style={styles.cover}
            />

            <Text style={styles.title}>Unlimited Luxurious Furniture </Text>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={validationSchema}
              onSubmit={values =>
                handleLogin(values, onLoginSuccess, onLoginFailure)
              }>
              {({
                handleChange,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
              }) => (
                <View>
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
                        value={values.email}
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
                    title={'L O G I N'}
                    onPress={isValid ? handleSubmit : inValidForm}
                    isValid={isValid}
                    loader={loader}
                  />

                  <Text
                    style={styles.registration}
                    onPress={() => navigation.navigate('SignUpScreen')}>
                    You don't have an account yet, Register
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
