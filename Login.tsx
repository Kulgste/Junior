import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Lpage = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/Untitled design.png')}
        style={styles.image}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput
          value={identifier}
          onChangeText={setIdentifier}
          style={styles.loginInput}
          placeholder='Username or Email'
          placeholderTextColor='#666'
          autoCapitalize='none'
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.loginInput}
          placeholder='Password'
          placeholderTextColor='#666'
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <Pressable style={styles.googleButton} onPress={() => {}}>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </Pressable>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  loginInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#c12d38',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginBottom: 15,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Lpage;
