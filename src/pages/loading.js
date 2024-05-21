import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserContext} from '../utils/context';

export default function Loading({navigation}) {
  const {updateUser} = useUserContext();

  const getData = async () => {
    await AsyncStorage.getItem('CallZ1_User').then(val => {
      if (JSON.parse(val)?.loginmobilenumber) {
        updateUser(JSON.parse(val));
        navigation.replace('Tabs');
        // if (JSON.parse(val)?.issubscription) {
        //   navigation.replace('Tabs')
        // } else {
        //   navigation.replace('Plans')
        // }
      } else {
        updateUser(null);
        navigation.replace('Welcome');
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 16,
  },
});
