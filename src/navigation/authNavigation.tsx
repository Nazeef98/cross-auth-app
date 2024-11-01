import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import SignupScreen from '../screens/signUp';
const Stack = createStackNavigator();

const AuthNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={'login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="signUp" component={SignupScreen} />

    </Stack.Navigator>
  );
};
export default AuthNavigator;
