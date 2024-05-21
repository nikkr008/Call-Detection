import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loading from '../pages/loading';
import Welcome from '../pages/welcome';
import SignIn from '../pages/signin';
import Register from '../pages/register';
import Plans from '../pages/plans';
import Home from '../pages/home';
import Template from '../pages/template';
import Create from '../pages/create';
import Edit from '../pages/edit';
import Settings from '../pages/settings';
import Profile from '../pages/profile';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <PracticeProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Loading"
          options={{animation: 'fade'}}
          component={Loading}
        />
        <Stack.Screen
          name="Welcome"
          options={{animation: 'fade'}}
          component={Welcome}
        />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Plans" component={Plans} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen
          name="Tabs"
          options={{animation: 'fade'}}
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </PracticeProvider>
  );
};

function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 0,
          borderTopWidth: 1,
          borderColor: '#eee',
        },
        tabBarActiveTintColor: '#6c64ff',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home-sharp" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Template"
        component={Template}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="file-document-multiple"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={Settings}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="settings-sharp" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Routes;

const styles = StyleSheet.create({});
