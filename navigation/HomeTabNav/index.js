import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Homeie from "../../screens/HomeScrn"




const Stack = createNativeStackNavigator();
const HomeNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Homeie'} component={Homeie} />      
      
      
    </Stack.Navigator>
  );
};

export default HomeNavigator;