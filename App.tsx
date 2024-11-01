/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './src/screens/login';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/authNavigation';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}


export default App;
