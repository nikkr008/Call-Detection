import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/header';
import {useUserContext} from '../utils/context';

export default function Home({navigation}) {
  const {user} = useUserContext();
  const {width} = useWindowDimensions();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await fetch('http://62.72.56.22:8001/messagetrans/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginMobileNumber: user?.loginmobilenumber,
      }),
    })
      .then(res => {
        if (res?.ok) {
          res.json().then(e => {
            setData(e?.results[0]);
          });
          setLoading(false);
        } else {
          Alert.alert('Error getting data');
        }
      })
      .catch(err => {
        Alert.alert('Error getting data');
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={'Overview'} />
      {loading ? (
        <View style={styles.emptyCon}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={[styles.cardCon, {marginTop: 15}]}>
            <View style={[styles.card, {width: (width - 40) / 2 - 5}]}>
              <Text style={styles.cardTitle}>Total Logs</Text>
              <Text style={styles.cardSubTitle}>
                {data?.receivedCallMessageCount +
                  data?.dialedCallMessageCount +
                  data?.missedCallMessageCount || 0}
              </Text>
              <View style={styles.cardIconCon}>
                <Feather name="pie-chart" size={15} color="#6c64ff" />
              </View>
            </View>
            <View style={[styles.card, {width: (width - 40) / 2 - 5}]}>
              <Text style={styles.cardTitle}>Received Call</Text>
              <Text style={styles.cardSubTitle}>
                {data?.receivedCallMessageCount || 0}
              </Text>
              <View style={styles.cardIconCon}>
                <Feather name="arrow-down-left" size={15} color="#0aaf65" />
              </View>
            </View>
          </View>
          <View style={styles.cardCon}>
            <View style={[styles.card, {width: (width - 40) / 2 - 5}]}>
              <Text style={styles.cardTitle}>Dialed Call</Text>
              <Text style={styles.cardSubTitle}>
                {data?.dialedCallMessageCount || 0}
              </Text>
              <View style={styles.cardIconCon}>
                <Feather name="arrow-up-right" size={15} color="#0f80d0" />
              </View>
            </View>
            <View style={[styles.card, {width: (width - 40) / 2 - 5}]}>
              <Text style={styles.cardTitle}>Missed Call</Text>
              <Text style={styles.cardSubTitle}>
                {data?.missedCallMessageCount || 0}
              </Text>
              <View style={styles.cardIconCon}>
                <MaterialIcons name="call-missed" size={15} color="red" />
              </View>
            </View>
          </View>
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
  cardCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    paddingVertical: 12.5,
  },
  cardTitle: {
    fontSize: 14,
    color: '#9d9d9d',
    marginLeft: 12.5,
  },
  cardSubTitle: {
    fontSize: 18,
    color: '#000',
    marginLeft: 12.5,
    fontWeight: '600',
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
