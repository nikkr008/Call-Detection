import { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import DeviceInfo from 'react-native-device-info';
import Octicons from 'react-native-vector-icons/Octicons'

export default function Register({ navigation }) {
  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [deviceID, setDeviceID] = useState("")
  const [deviceName, setDeviceName] = useState("")
  const [loading, setLoading] = useState(false)
  const [busName, setBusName] = useState("")
  const [busPhone, setBusPhone] = useState("")
  const [busAdd, setBusAdd] = useState("")

  const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
  const phoneRegex = /^(?:\+91)?\d{10}$/

  const OnSignUp = async () => {
    if (type === 'business' && !phoneRegex.test(busPhone)) {
      Alert.alert('Invalid phone number')
    } else if (!phoneRegex.test(phone)) {
      Alert.alert('Invalid phone number')
    } else if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address')
    } else {
      setLoading(true)
      await fetch('http://62.72.56.22:8001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "DeviceUniqueId": deviceID,
          "DeviceName": deviceName,
          "LoginMobileNumber": phone,
          "UserPassword": password,
          "CustomerName": name,
          "Email": email,
          "AccountType": type,
          "BusinessMobileNumber": busPhone,
          "BusinessName": busName,
          "BusinessAddress": busAdd
        })
      }).then(response => {
        if (!response.ok) {
          response.json().then((e) => {
            console.log(e);
            Alert.alert(e?.message)
          })
        } else {
          Alert.alert('User registered successfully', 'Please login to continue', [
            {
              text: 'Close',
              onPress: () => navigation.replace('SignIn'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => navigation.replace('SignIn')
            },
          ])
        }
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
        console.log('err', err);
        Alert.alert(err?.message)
      })
    }
  }

  const getDev = async () => {
    const val = await DeviceInfo.getDeviceName()
    const val1 = DeviceInfo.getDeviceId()
    setDeviceName(val)
    setDeviceID(val1)
  }

  useEffect(() => {
    getDev()
  }, [])

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Lets Register Account</Text>
        <Text style={styles.subTitle}>Hello user, you have{'\n'}a greatful journey</Text>
        <TextInput value={name} onChangeText={setName} selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Name*' />
        <TextInput keyboardType='phone-pad' value={phone} onChangeText={setPhone} selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Phone*' />
        <TextInput keyboardType='email-address' value={email} onChangeText={setEmail} selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Email*' />
        <TextInput keyboardType='visible-password' value={password} onChangeText={setPassword} secureTextEntry selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Password*' />
        <TouchableHighlight underlayColor={"#fff"} style={styles.selectCon} onPress={() => setShow(true)}>
          <View style={styles.select}>
            <Text style={styles.selectText}>{type ? type : "Select account type*"}</Text>
            <Octicons name="chevron-right" color="#000" size={20} />
          </View>
        </TouchableHighlight>
        {type === 'business' ?
          <>
            <TextInput value={busName} onChangeText={setBusName} selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Business Name*' />
            <TextInput keyboardType='phone-pad' value={busPhone} onChangeText={setBusPhone} selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Business Phone*' />
            <TextInput value={busAdd} onChangeText={setBusAdd} selectionColor={"#6c64ff"} style={styles.input} placeholderTextColor={"#aaa"} placeholder='Business Address*' />
          </>
          : null}
        {type === 'business' ?
          <TouchableHighlight underlayColor={"#7a73ff"} style={[styles.btn, { opacity: name && type && phone && email && password && busName && busPhone && busAdd ? 1 : 0.7 }]} onPress={() => name && type && phone && email && password && busName && busPhone && busAdd ? OnSignUp() : null}>
            <Text style={styles.btnText}>{loading ? "Please Wait" : "Register"}</Text>
          </TouchableHighlight>
          :
          <TouchableHighlight underlayColor={"#7a73ff"} style={[styles.btn, { opacity: name && type && phone && email && password ? 1 : 0.7 }]} onPress={() => name && type && phone && email && password ? OnSignUp() : null}>
            <Text style={styles.btnText}>{loading ? "Please Wait" : "Register"}</Text>
          </TouchableHighlight>
        }
        <View style={styles.regCon}>
          <Text style={styles.regText}>Already have an account? <Text style={{ color: "#6c64ff" }} onPress={() => navigation.navigate('SignIn')}>Login</Text></Text>
        </View>
      </ScrollView>
      <Modal visible={show} onRequestClose={() => setShow(false)} transparent statusBarTranslucent animationType='fade'>
        <View style={styles.modal}>
          <View style={styles.modalCon}>
            <TouchableHighlight underlayColor={"#fff"} style={styles.modalItem} onPress={() => {
              setType('personal')
              setShow(false)
            }}>
              <Text style={styles.modalItemText}>Personal</Text>
            </TouchableHighlight>
            <View style={styles.modalSep} />
            <TouchableHighlight underlayColor={"#fff"} style={styles.modalItem} onPress={() => {
              setType('business')
              setShow(false)
            }}>
              <Text style={styles.modalItemText}>Business</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    color: "#000",
    fontWeight: "700",
    marginTop: 40
  },
  subTitle: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
    marginVertical: 15,
    lineHeight: 28
  },
  input: {
    height: 45,
    color: "#000",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 15,
    fontWeight: "500",
    fontSize: 15
  },
  btn: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6c64ff",
    marginTop: 30
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  },
  forgotText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    marginTop: 20
  },
  lineCon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30
  },
  line: {
    height: 2,
    flex: 1,
    backgroundColor: "#ddd"
  },
  lineText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 10
  },
  regCon: {
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  regText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
  selectCon: {
    maxHeight: 45,
    height: 45,
    flexDirection: "row",
    flex: 1,
    color: "#000",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: "#fff",
    marginTop: 7.5,
    paddingRight: 12.5,
    marginTop: 15,
  },
  select: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    color: "#000",
    marginLeft: 10,
    fontSize: 15,
    textTransform: "capitalize"
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "100%",
    width: "100%",
    justifyContent: "center"
  },
  modalCon: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden"
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  modalItemText: {
    color: "#000",
    fontSize: 15
  },
  modalSep: {
    height: 1,
    backgroundColor: "#eee"
  },
})