import {Image, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {StatusBar} from 'expo-status-bar';
import styles from './profileScreen.style';
import {COLORS} from '../constants';
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkExistingUser();
    }, []),
  );

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    if (id) {
      const userId = `user${JSON.parse(id)}`;
      try {
        const currentUser = await AsyncStorage.getItem(userId);
        if (currentUser !== null) {
          const parsedData = JSON.parse(currentUser);
          setUserData(parsedData);
          setUserLogin(true);
        } else {
          setUserLogin(false);
        }
      } catch (error) {
        console.log('Error retrieving the data', error);
      }
    } else {
      setUserLogin(false);
    }
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['id', `user${userData.id}`, 'cartCount']);
      setUserLogin(false);
      setUserData(null);
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen after logout
    } catch (error) {
      console.log('Error logging out user: ', error);
    }
  };

  const logout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel pressed'),
      },
      {
        text: 'Continue',
        onPress: () => userLogout(),
      },
      {default: 1},
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all saved data on your device?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Clear Cache'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('Clear Cache Pressed'),
        },
      ],
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Delete Account'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => console.log('Delete Account Pressed'),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />

        <View style={{width: '100%'}}>
          <Image
            source={require('../assets/images/space.jpg')}
            style={styles.cover}
          />
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/profile.jpeg')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true
              ? userData?.username
              : // 'Abdulbasit Quadri'
                'Please login to your account'}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>{userData?.email}</Text>
              </View>
            </TouchableOpacity>
          )}

          {userLogin === false ? (
            <></>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate('FavoritesScreen')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='heart-outline'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('OrderScreen')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='truck-delivery-outline'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('CartScreen')}>
                <View style={styles.menuItem(0.2)}>
                  <SimpleLineIcons
                    name='bag'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name='cached'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name='logout' size={24} color={COLORS.primary} />
                  <Text style={styles.menuText}>Log out</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name='deleteuser'
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default ProfileScreen;
