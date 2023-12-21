import {useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {
  CartScreen,
  NewRivalScreen,
  ProductDetailScreen,
  LoginScreen,
  FavoritesScreen,
  OrderScreen,
  SignUpScreen,
} from './screens';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const fetchFonts = async () =>
  await Font.loadAsync({
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setDataLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!dataLoaded) {
    return null; // Return nothing or some loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='CartScreen'
          component={CartScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='ProductDetailScreen'
          component={ProductDetailScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='NewRivalScreen'
          component={NewRivalScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='OrderScreen'
          component={OrderScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='FavoritesScreen'
          component={FavoritesScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='SignUpScreen'
          component={SignUpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
