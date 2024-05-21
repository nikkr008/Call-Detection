import { View, Text, StatusBar, StyleSheet, Image, useWindowDimensions, TouchableHighlight } from 'react-native'
import React from 'react'
import WelcomeImg from '../assets/welcome.png'

export default function Welcome({navigation}) {
  const {height, width} = useWindowDimensions()
  return (
    <View style={styles.container}>
      <Image source={WelcomeImg} style={[styles.image,{height:width}]}/>
      <Text style={styles.title}>Team work all</Text>
      <Text style={styles.descr}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Text>
      <View style={[styles.btnCon,{width:width - 40}]}>
        <TouchableHighlight style={[styles.btn1,{width:(width/2)-27.5}]} onPress={()=>navigation.navigate("SignIn")}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#7a73ff"} style={[styles.btn2,,{width:(width/2)-27.5}]} onPress={()=>navigation.navigate("Register")}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"#fff",
      alignItems:"center",
      justifyContent:"center"
    },
    image:{
      aspectRatio:1,
    },
    title:{
      fontSize:24,
      color:"#000",
      fontWeight:"600"
    },
    descr:{
      width:200,
      color:"#777",
      textAlign:"center",
      marginTop:15,
      lineHeight:20,
      fontWeight:"500",
    },
    btnCon:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginTop:35,
      marginBottom:30
    },
    btn1:{
      height:50,
      borderRadius:8,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"#000"
    },
    btn2:{
      height:50,
      borderRadius:8,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"#6c64ff"
    },
    btnText:{
      color:"#fff",
      fontSize:16,
      fontWeight:"500"
    }
})