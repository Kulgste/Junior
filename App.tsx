import React from 'react'
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './First'
import Lpage from './Login';
import Spage from './Signin';
import HomePage from './Home';
import ProfilePage from './Profile';
import StickrPreset from './stickrpreset';
import BLEpage from './BLEpage';
const Stack = createNativeStackNavigator()
const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name ="FirstPage" component={Login}></Stack.Screen>
        <Stack.Screen name ="LoginPage" component={Lpage}></Stack.Screen>
        <Stack.Screen name ="SignUpPage" component={Spage}></Stack.Screen>
        <Stack.Screen name ="Home" component={HomePage}></Stack.Screen>
        <Stack.Screen name ="ViewProfile" component={ProfilePage}></Stack.Screen>
        <Stack.Screen name ="Preset" component={StickrPreset}></Stack.Screen>
        <Stack.Screen name ="BLEpage" component={BLEpage}></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App