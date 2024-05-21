import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useUserContext} from '../utils/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Profile({navigation}) {
  const {user} = useUserContext();

  const OnLogOut = async () => {
    await AsyncStorage.removeItem('CallZ1_User').then(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Loading'}],
      });
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.arrowCon}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={'#000'} />
        </TouchableHighlight>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.arrowCon} />
      </View>
      <View style={styles.profileCon}>
        <Image
          style={styles.profileImage}
          src="https://res.cloudinary.com/rsmglobal/image/fetch/t_default/f_auto/q_auto/https://www.rsm.global/elsalvador/sites/default/files/styles/crop_thumbnail/public/media/01%20Global%20assets/02_Thumbnails%201240x930px/02_profile%20photo%20placeholder_male%20.png"
        />
        <View>
          <Text style={styles.name}>{user?.customername}</Text>
          <Text style={styles.plan}>Basics</Text>
        </View>
        <View style={styles.flexCon} />
        <TouchableHighlight underlayColor={'#fff'} onPress={() => OnLogOut()}>
          <Feather name="log-out" size={18} color={'#000'} />
        </TouchableHighlight>
      </View>
      <Text style={styles.subTitle}>Phone Number</Text>
      <View style={styles.profileCon1}>
        <Text style={styles.profileConText}>
          {user?.businessmobilenumber || user?.loginmobilenumber}
        </Text>
      </View>
      <Text style={styles.subTitle}>Email Address</Text>
      <View style={styles.profileCon1}>
        <Text style={styles.profileConText}>{user?.email}</Text>
      </View>
      <Text style={styles.subTitle}>Account Type</Text>
      <View style={styles.profileCon1}>
        <Text style={styles.profileConText}>{user?.accounttype}</Text>
      </View>
      {user?.accounttype === 'business' ? (
        <>
          <Text style={styles.subTitle}>Business Name</Text>
          <View style={styles.profileCon1}>
            <Text style={styles.profileConText}>{user?.businessname}</Text>
          </View>
          <Text style={styles.subTitle}>Business Phone</Text>
          <View style={styles.profileCon1}>
            <Text style={styles.profileConText}>
              {user?.businessmobilenumber}
            </Text>
          </View>
        </>
      ) : null}
      <Text style={styles.subTitle}>Message Type</Text>
      <View style={styles.profileCon1}>
        <Text style={styles.profileConText}>{user?.messagetype}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  flexCon: {
    flex: 1,
  },
  arrowCon: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  profileCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  profileCon1: {
    maxHeight: 45,
    justifyContent: 'center',
    flex: 1,
    color: '#000',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 7.5,
  },
  profileConText: {
    color: '#000',
    marginLeft: 10,
    fontSize: 15,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#6c64ff',
  },
  name: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 10,
  },
  plan: {
    fontSize: 14,
    color: '#6c64ff',
    marginLeft: 10,
    marginTop: 3,
  },
  subTitle: {
    color: '#9d9d9d',
    fontSize: 14,
    marginHorizontal: 20,
    marginTop: 10,
  },
});
