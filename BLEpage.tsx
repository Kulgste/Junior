import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const BLEpage = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (connecting) {
      timer = setTimeout(() => {
        setConnecting(false);
        Alert.alert('Connection failed');
      }, 60000); // 1 minute timeout
    }
    return () => clearTimeout(timer);
  }, [connecting]);

  const handleConnect = () => {
    setConnecting(true);
    // Add your connection logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connect Stickr tag</Text>
        <Pressable style={styles.button} onPress={handleConnect} disabled={connecting}>
          {connecting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Connect</Text>
          )}
        </Pressable>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    width: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#c12d38',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
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

export default BLEpage;