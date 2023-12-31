// hooks/useCheckUser.js
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCheckUser = () => {
  const [userData, setUserData] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    if (id) {
      const userId = `user${JSON.parse(id)}`;
      try {
        const currentUser = await AsyncStorage.getItem(userId);
        if (currentUser !== null) {
          const parsedData = JSON.parse(currentUser);
          setUserData(parsedData);
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error('Error retrieving the data', error);
      }
    }
  };

  return {userData, isUserLoggedIn};
};

export default useCheckUser;
