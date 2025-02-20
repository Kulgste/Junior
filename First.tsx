import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('./assets/Logo.png')} 
        style={styles.image} 
      />
      <View style={styles.buttonContainer}>
        <Pressable 
          onPress={() => navigation.navigate("LoginPage")} 
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Pressable 
          onPress={() => navigation.navigate("SignUpPage")} 
          style={styles.signUpButton}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    height: 50,
    width: '80%',
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#c12d38',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c12d38',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  signUpButton: {
    height: 50,
    width: '80%',
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;