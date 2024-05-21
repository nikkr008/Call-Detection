import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({navigation, title}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.flexCon} />
      {title === 'Templates' ? (
        <TouchableHighlight
          underlayColor={'#f5f5f5'}
          style={styles.iconCon}
          onPress={() => navigation.navigate('Create')}>
          <Ionicons name="add-circle-outline" color={'#000'} size={20} />
        </TouchableHighlight>
      ) : title ===
        'Overview' ? // <TouchableHighlight underlayColor={"#f5f5f5"} style={styles.iconCon} onPress={()=>navigation.navigate('Create')}>
      //   <Ionicons name="notifications-outline" color={"#000"} size={20}/>
      // </TouchableHighlight>
      null : null}
      <TouchableHighlight
        style={styles.profileImgCon}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          style={styles.profileImage}
          src="https://res.cloudinary.com/rsmglobal/image/fetch/t_default/f_auto/q_auto/https://www.rsm.global/elsalvador/sites/default/files/styles/crop_thumbnail/public/media/01%20Global%20assets/02_Thumbnails%201240x930px/02_profile%20photo%20placeholder_male%20.png"
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  profileImgCon: {
    marginLeft: 17,
    borderRadius: 16,
  },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6c64ff',
  },
  iconCon: {
    padding: 3,
    borderRadius: 20,
  },
});
