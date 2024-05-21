import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  PermissionsAndroid,
  Linking,
  Alert,
} from 'react-native';

import CallDetectorManager from 'react-native-call-detection';
import Header from '../components/header';
import {useUserContext} from '../utils/context';
import Toggle from '../components/toggle';
import Switch from '../components/switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share, {Social} from 'react-native-share';
import {NativeModules} from 'react-native';
import BackgroundService from 'react-native-background-actions';

const {WhatsappAccessibilityModule} = NativeModules;
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
var n = 0;
export default function Settings({navigation}) {
  const [incoming, setIncoming] = useState(false);
  const [number, setNumber] = useState(null);
  const [type, setType] = useState('');
  const [msgType, setMsgType] = useState('');
  const [camera, setCamera] = useState(false);
  const [log, setLog] = useState(false);
  const [notify, setNotify] = useState(false);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user, updateUser} = useUserContext();

  const getCamera = async () => {
    const res = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    setCamera(res);
  };

  const getCallLog = async () => {
    const res = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    );
    setLog(res);
  };

  const getNotify = async () => {
    const res = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    setNotify(res);
  };

  const getState = async () => {
    const res = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    );
    setState(res);
  };

  const toggleCamera = async () => {
    if (camera) {
      Linking.openSettings();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        setCamera(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (error) {
        console.error('Error toggling camera:', error);
      }
    }
  };

  const toggleLog = async () => {
    if (log) {
      Linking.openSettings();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        );
        setLog(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (error) {
        console.error('Error toggling logs:', error);
      }
    }
  };

  const toggleNotify = async () => {
    if (notify) {
      Linking.openSettings();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        setNotify(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (error) {
        console.error('Error toggling notification:', error);
      }
    }
  };

  const toggleState = async () => {
    if (state) {
      Linking.openSettings();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        setState(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (error) {
        console.error('Error toggling phone state:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setType(user?.accounttype);
      setMsgType(user?.messagetype);
      getCamera();
      getCallLog();
      getNotify();
      getState();
    }
  }, [user]);

  const updateStorage = async val => {
    await AsyncStorage.setItem('CallZ1_User', JSON.stringify(val)).then(() => {
      setLoading(false);
    });
  };

  const UpdateAccType = async val => {
    if (type !== val) {
      setLoading(true);
      await fetch('http://62.72.56.22:8001/config/accounttype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LoginMobileNumber: user?.loginmobilenumber,
          accountType: val,
        }),
      })
        .then(res => {
          if (res.ok) {
            const upUser = {
              ...user,
              accounttype: val,
            };
            updateUser(upUser);
            updateStorage(upUser);
            setType(val);
          } else {
            res.json().then(e => {
              console.log(e);
              Alert.alert(e?.message);
            });
            setLoading(false);
            // Alert.alert('Error updating account type')
          }
        })
        .catch(err => {
          setLoading(false);
          Alert.alert(err?.message);
          console.log(err);
        });
    }
  };
  const UpdateMsgType = async val => {
    if (msgType !== val) {
      setLoading(true);
      await fetch('http://62.72.56.22:8001/config/messagetype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LoginMobileNumber: user?.loginmobilenumber,
          MessageType: val,
        }),
      })
        .then(res => {
          if (res.ok) {
            const upUser = {
              ...user,
              messagetype: val,
            };
            updateUser(upUser);
            updateStorage(upUser);
            setMsgType(val);
          } else {
            res.json().then(e => {
              console.log(e);
              Alert.alert(e?.message);
            });
            setLoading(false);
            // Alert.alert('Error updating message type')
          }
        })
        .catch(err => {
          setLoading(false);
          Alert.alert(err?.message);
          console.log(err);
        });
    }
  };
  const UpdateAppStatus = async () => {
    setLoading(true);
    await fetch('http://62.72.56.22:8001/config/appstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginMobileNumber: user?.loginmobilenumber,
        AppStatus: user?.appstatus === 0 ? '1' : '0',
      }),
    })
      .then(res => {
        if (res.ok) {
          const upUser = {
            ...user,
            appstatus: user?.appstatus === 0 ? 1 : 0,
          };
          updateUser(upUser);
          updateStorage(upUser);
        } else {
          res.json().then(e => {
            console.log(e);
            Alert.alert(e?.message);
          });
          setLoading(false);
          // Alert.alert('Error updating app status')
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(err?.message);
        console.log(err);
      });
  };

  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    console.log(user?.messagetype);
    await new Promise(async resolve => {
      let i = 0;
      WhatsappAccessibilityModule.ReceiveText(user?.missedContent.toString());
      for (i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await BackgroundService.updateNotification({
          taskDesc: 'My counter is running' + i,
        });
        await sleep(delay);
      }
    });
  };
  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 1000,
    },
  };
  const startBackgroundService = async () => {
    console.log('entered start');
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'My counter is running',
    });
    // setFeatureOn(true);
  };
  const stopBackgroundService = async () => {
    console.log('entered stop');
    await BackgroundService.stop();
    // setFeatureOn(false);
    // console.log('featureOn ' + featureOn);
  };

  const initiateWhatsApp = async (msg, number, img) => {
    if (number.startsWith('+91')) {
      formatNum = number.toString().replace('+', '');
    } else {
      formatNum = '91' + number.toString().replace(/\D/g, '');
    }
    console.log(`number is ${number} and FormatNumber is ${formatNum}`);
    console.log(`formatNum ${formatNum}`);
    // console.log('Image ', img);
    const shareOptions = {
      message: `${msg}`,
      whatsAppNumber: formatNum,
      url: img ? `${img}` : '',
    };
    WhatsappAccessibilityModule.ReceiveStatus(user?.messagetype);
    console.log('whatsapp1 ' + user?.accounttype);
    if (user?.accounttype === 'personal') {
      Share.shareSingle({
        ...shareOptions,
        social: Share.Social.WHATSAPP,
      });
    } else {
      Share.shareSingle({
        ...shareOptions,
        social: Share.Social.WHATSAPPBUSINESS,
      });
    }
  };
  const startListenerTapped = () => {
    startBackgroundService();
    n = 1;
    callDetector = new CallDetectorManager(
      (event, number) => {
        console.log(event, number);
        if (event === 'Disconnected') {
          console.log('Disconnected');
          // console.log(otherContent);
          setIncoming(false);
          setNumber(number);
          initiateWhatsApp(user?.otherContent, number, user?.otherImage[0]);
          // console.log(user?.missedImage);
          WhatsappAccessibilityModule.ReceiveText(
            user?.otherContent.toString(),
          );
        } else if (event === 'Incoming') {
          console.log('Incomming');
          setIncoming(true);
          setNumber(number);
        } else if (event === 'Offhook') {
          console.log('offhook');
          setIncoming(true);
          setNumber(number);
          // initiateWhatsApp(otherContent, number);
          // WhatsappAccessibilityModule.ReceiveText(otherContent);
        } else if (event === 'Missed') {
          // setState({incoming: false, number: null});
          console.log('Missed');
          setIncoming(false);
          setNumber(number);
          initiateWhatsApp(user?.missedContent, number, user?.missedImage[0]);
          console.log(user?.missedImage);
          WhatsappAccessibilityModule.ReceiveText(
            user?.missedContent.toString(),
          );
        }
      },
      true,
      () => {},
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    );
    // setFeatureOn(true);
  };

  const stopListenerTapped = () => {
    stopBackgroundService();
    if (n === 1) {
      callDetector.dispose();
      console.log('in condition ', n);
      n = 0;
    }
    setIncoming(false);
    // console.log(callDetector);
    // setFeatureOn(false);
  };

  useEffect(() => {
    console.log(`App Status ${user?.appstatus}`);
    if (user?.appstatus === 1) {
      startListenerTapped();
    } else {
      stopListenerTapped();
    }
  }, [user?.appstatus, user]);

  const item = user?.messageTemplate;
  useEffect(() => {
    if (item) {
      const typeMissed = item.filter(
        template => template.templatetype === 'missed',
      );
      const missedTemplateContents = typeMissed.map(
        template => template.templatecontent,
      );
      const typeMissedImg = item.filter(
        template => template.templatetype === 'missed',
      );
      const MissedImgContent = typeMissed.map(
        template => template.templateimage,
      );
      console.log(`MissedImgContent ${MissedImgContent}`);
      const typeDialed = item.filter(
        template => template.templatetype === 'dialed',
      );
      const DialedTemplateContents = typeDialed.map(
        template => template.templatecontent,
      );
      const typeDialedImage = item.filter(
        template => template.templatetype === 'dialed',
      );
      const DialedImgContent = typeDialed.map(
        template => template.templateimage,
      );

      const upUser = {
        ...user,
        missedContent: missedTemplateContents,
        missedImage: MissedImgContent,
        otherContent: DialedTemplateContents,
        otherImage: DialedImgContent,
      };
      updateUser(upUser);
    }
    console.log('use effect templates filtering ');
  }, [item]);

  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} title={'Settings'} />
        <ScrollView style={styles.container}>
          <Text style={styles.subTitle}>Whatsapp Type</Text>
          <View style={styles.card}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => UpdateAccType('personal')}>
              <View style={styles.cardCon}>
                <Text style={styles.cardTitle}>Personal</Text>
                <Toggle active={type === 'personal'} />
              </View>
            </TouchableHighlight>
            <View style={styles.cardSep} />
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => UpdateAccType('business')}>
              <View style={styles.cardCon}>
                <Text style={styles.cardTitle}>Business</Text>
                <Toggle active={type === 'business'} />
              </View>
            </TouchableHighlight>
          </View>
          <Text style={styles.subTitle}>Automatic/Manual</Text>
          <View style={styles.card}>
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => UpdateMsgType('automatic')}>
              <View style={styles.cardCon}>
                <Text style={styles.cardTitle}>Automatic</Text>
                <Toggle active={msgType === 'automatic'} />
              </View>
            </TouchableHighlight>
            <View style={styles.cardSep} />
            <TouchableHighlight
              underlayColor={'#fff'}
              onPress={() => UpdateMsgType('manual')}>
              <View style={styles.cardCon}>
                <Text style={styles.cardTitle}>Manual</Text>
                <Toggle active={msgType === 'manual'} />
              </View>
            </TouchableHighlight>
          </View>
          <Text style={styles.subTitle}>App Status</Text>
          <View style={styles.card}>
            <View style={styles.cardCon}>
              <View>
                <Text style={styles.cardTitle}>App Status</Text>
                <Text style={styles.subTitle1}>
                  Please turn ON to start the app
                </Text>
              </View>
              <Switch
                active={user?.appstatus}
                onPress={() => UpdateAppStatus()}
              />
            </View>
          </View>
          <Text style={styles.subTitle}>Permissions</Text>
          <View style={styles.card}>
            <View style={styles.cardCon}>
              <View>
                <Text style={styles.cardTitle}>Camera</Text>
                <Text style={styles.subTitle1}>Lorem ipsum dolor sit amet</Text>
              </View>
              <Switch active={camera} onPress={() => toggleCamera()} />
            </View>
            <View style={styles.cardSep} />
            <View style={styles.cardCon}>
              <View>
                <Text style={styles.cardTitle}>Read Call Logs</Text>
                <Text style={styles.subTitle1}>Lorem ipsum dolor sit amet</Text>
              </View>
              <Switch active={log} onPress={() => toggleLog()} />
            </View>
            <View style={styles.cardSep} />
            <View style={styles.cardCon}>
              <View>
                <Text style={styles.cardTitle}>Post Notifications</Text>
                <Text style={styles.subTitle1}>Lorem ipsum dolor sit amet</Text>
              </View>
              <Switch active={notify} onPress={() => toggleNotify()} />
            </View>
            <View style={styles.cardSep} />
            <View style={styles.cardCon}>
              <View>
                <Text style={styles.cardTitle}>Read Phone State</Text>
                <Text style={styles.subTitle1}>Lorem ipsum dolor sit amet</Text>
              </View>
              <Switch active={state} onPress={() => toggleState()} />
            </View>
          </View>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Please Wait...</Text>
        </View>
      ) : null}
    </>
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
  subTitle: {
    color: '#9d9d9d',
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 20,
    marginTop: 14,
  },
  subTitle1: {
    color: '#9d9d9d',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
  },
  cardCon: {
    flex: 1,
    paddingVertical: 12.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  cardTitleCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12.5,
  },
  cardTitle: {
    fontSize: 16,
    color: '#000',
  },
  cardSep: {
    height: 1,
    backgroundColor: '#eee',
  },
  loading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 15,
  },
});
