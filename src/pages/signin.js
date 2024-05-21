import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const OnSignIn = async () => {
    setLoading(true);
    await fetch('http://62.72.56.22:8001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginMobileNumber: email,
        UserPassword: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(e => {
            console.log(e);
            Alert.alert(e?.message);
          });
          // Alert.alert('Invalid username or password')
        } else {
          response.json().then(async e => {
            if (e?.results?.length > 0) {
              if (e?.results[0]?.issubscription === 0) {
                await AsyncStorage.setItem(
                  'CallZ1_User',
                  JSON.stringify(e?.results[0]),
                ).then(() => {
                  console.log('ok');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Plans'}],
                  });
                });
              } else {
                await AsyncStorage.setItem(
                  'CallZ1_User',
                  JSON.stringify(e?.results[0]),
                ).then(() => {
                  console.log('ok');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Tabs'}],
                  });
                });
              }
            }
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log('err', err);
        Alert.alert(err?.message);
      });
  };

  useEffect(() => {
    askPermission();
  }, []);

  const askPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ]);
      // setPermission(true);
      console.log('Permissions are:', permissions);
    } catch (err) {
      console.warn(err);
      // setPermission(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lets Sign you in</Text>
      <Text style={styles.subTitle}>
        Welcome Back,{'\n'}You have been missed
      </Text>
      <TextInput
        keyboardType="phone-pad"
        value={email}
        onChangeText={setEmail}
        selectionColor={'#6c64ff'}
        style={styles.input}
        placeholderTextColor={'#aaa'}
        placeholder="Enter phone number"
      />
      <TextInput
        keyboardType="visible-password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        selectionColor={'#6c64ff'}
        style={styles.input}
        placeholderTextColor={'#aaa'}
        placeholder="Password"
      />
      {/* <Text style={styles.forgotText}>Forgot Password?</Text> */}
      <TouchableHighlight
        underlayColor={'#7a73ff'}
        style={[styles.btn, {opacity: email && password ? 1 : 0.7}]}
        onPress={() => (email && password ? OnSignIn() : null)}>
        <Text style={styles.btnText}>{loading ? 'Signing In' : 'Sign In'}</Text>
      </TouchableHighlight>
      <View style={styles.lineCon}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Or</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.regCon}>
        <Text style={styles.regText}>
          Don't have an account?{' '}
          <Text
            style={{color: '#6c64ff'}}
            onPress={() => navigation.navigate('Register')}>
            Register Now
          </Text>
        </Text>
      </View>
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
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginVertical: 15,
    lineHeight: 28,
  },
  input: {
    height: 45,
    color: '#000',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 15,
    fontWeight: '500',
    fontSize: 15,
  },
  btn: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6c64ff',
    marginTop: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  forgotText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 20,
  },
  lineCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  line: {
    height: 2,
    flex: 1,
    backgroundColor: '#ddd',
  },
  lineText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  regCon: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
});
