import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from '../../hooks/useCachedResources';
import { useColorScheme } from '@/hooks/useColorScheme';
import RootNav from '../../navigation/RootNav';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';


// App.js

import { Amplify } from 'aws-amplify';

import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);



function App() {
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootNav colorScheme={colorScheme}/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);