// src/components/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Replace this with your own Google logo image or use a link
const googleIcon = require('../../assets/images/google.png'); // Adjust this path to your image

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Blue Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Switch to Signup Screen */}
      <View style={styles.switchScreen}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Google Sign-In Button Styled like the Login Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image source={googleIcon} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Background color for the login screen
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff', // Blue color
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    padding: 13,
    backgroundColor: '#007bff', // Blue color to match login button
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row', // Align text and icon
    marginTop: 20, 
    display:'flex',
    justifyContent:'center' // Space between the Google button and Sign Up link
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10, // Space between the icon and text
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    display:'flex',
    justifyContent:'center'
  },
  switchScreen: {
    marginTop: 10,
    flexDirection: 'row',
  },
  signupText: {
    color: '#007bff', // Blue color for the signup link
    fontWeight: 'bold',
  },
});
