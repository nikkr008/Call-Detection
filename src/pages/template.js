import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/header';
import {useUserContext, PracticeContext} from '../utils/context';

export default function Template({navigation}) {
  const user = useUserContext();
  const {updateUser} = useUserContext();
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Templates'} />
      {/* <View style={styles.searchCon}>
        <TextInput placeholderTextColor={"#bbb"} style={styles.input} placeholder='Search' />
        <MaterialIcons name="filter-list" color={"#000"} size={20} />
      </View> */}
      {user?.user?.messageTemplate?.length === 0 ? (
        <View style={styles.emptyCon}>
          <Text style={styles.emptyText}>No Templates Found</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {user?.user?.messageTemplate?.map((item, index) => {
            return (
              <TouchableHighlight
                underlayColor={'#fff'}
                key={item?.messagetemplateid}
                onPress={() =>
                  navigation.navigate('Edit', {id: item?.messagetemplateid})
                }
                style={[styles.cardCon, {marginTop: index === 0 ? 15 : 10}]}>
                <View style={styles.card}>
                  <View style={styles.cardTitleCon}>
                    {item?.templatetype?.toLowerCase() === 'dialed' ? (
                      <Feather
                        name="arrow-up-right"
                        size={15}
                        color="#0f80d0"
                      />
                    ) : item?.templatetype?.toLowerCase() === 'missed' ? (
                      <MaterialIcons name="call-missed" size={15} color="red" />
                    ) : item?.templatetype?.toLowerCase() === 'none' ? (
                      <Feather name="minus" size={15} color="#0f80d0" />
                    ) : (
                      <Feather
                        name="arrow-down-left"
                        size={15}
                        color="#0aaf65"
                      />
                    )}
                    <Text
                      style={[styles.cardTitle, {textTransform: 'capitalize'}]}>
                      {item?.templatetype}
                    </Text>
                  </View>
                  <View style={styles.cardBodyCon}>
                    <Image
                      style={styles.cardImg}
                      source={{
                        uri:
                          item?.templateimage ||
                          'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
                      }}
                    />
                    <View>
                      <Text style={[styles.cardName, {width: width - 100}]}>
                        {item?.templatename}
                      </Text>
                      <Text
                        style={[styles.cardSubTitle, {width: width - 100}]}
                        numberOfLines={2}>
                        {item?.templatecontent}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
          <View style={{height: 7.5}} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  input: {
    height: 40,
    flex: 1,
    color: '#000',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  cardCon: {
    marginHorizontal: 20,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12.5,
  },
  cardTitleCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12.5,
  },
  cardBodyCon: {
    flexDirection: 'row',
    marginLeft: 12.5,
    marginRight: 12.5,
    marginTop: 7,
  },
  cardTitle: {
    fontSize: 14,
    color: '#9d9d9d',
    marginLeft: 5,
  },
  cardName: {
    fontSize: 15,
    color: '#000',
    marginLeft: 10,
  },
  cardSubTitle: {
    fontSize: 15,
    color: '#000',
    marginLeft: 10,
    marginTop: 3,
  },
  cardImg: {
    height: 45,
    width: 45,
    borderRadius: 5,
  },
  cardIconCon: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  emptyCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 15,
  },
});
