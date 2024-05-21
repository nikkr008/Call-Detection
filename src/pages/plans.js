import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React from 'react';

export default function Plans({navigation}) {
  const {height, width} = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subTitle}>Hello, Jeswin!</Text>
      <Text style={styles.title}>Choose your plan</Text>
      <TouchableHighlight
        underlayColor={'#fff'}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Loading'}],
          });
        }}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Basic Plan</Text>
          <Text style={styles.cardPrice}>$0/month</Text>
          <Text style={styles.cardFeatures}>☑ Lorem ipsum dolor sit amet</Text>
          <Text style={styles.cardFeatures}>☑ Lorem ipsum dolor sit amet</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'#fff'}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Loading'}],
          });
        }}>
        <View style={styles.card1}>
          <Text style={styles.cardText1}>Premium Plan</Text>
          <Text style={styles.cardPrice1}>$10/month</Text>
          <Text style={styles.cardFeatures1}>☑ Lorem ipsum dolor sit amet</Text>
          <Text style={styles.cardFeatures1}>☑ Lorem ipsum dolor sit amet</Text>
          <View style={styles.popular}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={'#fff'}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Loading'}],
          });
        }}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Enterprice Plan</Text>
          <Text style={styles.cardPrice}>$50/month</Text>
          <Text style={styles.cardFeatures}>☑ Lorem ipsum dolor sit amet</Text>
          <Text style={styles.cardFeatures}>☑ Lorem ipsum dolor sit amet</Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
    marginTop: 5,
  },
  subTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    lineHeight: 28,
    marginTop: 40,
  },
  card: {
    height: 165,
    backgroundColor: '#e1e0ff',
    marginTop: 15,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  card1: {
    height: 180,
    backgroundColor: '#6c64ff',
    marginTop: 15,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  cardLeft: {
    height: 200,
    width: 150,
    borderRadius: 15,
    marginLeft: -65,
    backgroundColor: '#d2d0ff',
    transform: 'rotate(30deg)',
  },
  cardText: {
    color: '#555',
    marginLeft: 20,
  },
  cardFeatures: {
    color: '#555',
    marginLeft: 20,
    marginTop: 5,
  },
  cardPrice: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 5,
  },
  cardText1: {
    color: '#eee',
    marginLeft: 20,
  },
  cardFeatures1: {
    color: '#eee',
    marginLeft: 20,
    marginTop: 5,
  },
  cardPrice1: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 5,
  },
  popular: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12.5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  popularText: {
    color: '#6c64ff',
  },
  skip: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 30,
  },
});
