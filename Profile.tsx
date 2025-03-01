import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Alert, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

// Helper function to mask password with bullet points
const maskText = (text: string) => '•'.repeat(text.length);

// Returns a valid image source based on profileImage state
const getProfileImageSource = (profileImage: string | number | null) => {
  if (typeof profileImage === 'string' && profileImage && profileImage !== 'null' && profileImage !== 'undefined') {
    return { uri: profileImage };
  }
  return require('./assets/Profile.png');
};

const ProfilePage = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [user, setUser] = useState<{ username: string; email: string; password: string } | null>(null);
  const [profileImage, setProfileImage] = useState<string | number | null>(require('./assets/Profile.png'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          Alert.alert('No user data found');
        }
        if (storedProfileImage) {
          setProfileImage(storedProfileImage);
        } else {
          setProfileImage(require('./assets/Profile.png'));
        }
      } catch (e) {
        Alert.alert('Error retrieving user data');
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access gallery was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setProfileImage(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <Pressable onPress={pickImage}>
          <Image source={getProfileImageSource(profileImage)} style={styles.profile} />
        </Pressable>
        <Pressable style={styles.changeButton} onPress={pickImage}>
          <Text style={styles.changeButtonText}>Change Profile Picture</Text>
        </Pressable>
        <Text style={styles.title}>Profile</Text>
        {user && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Username:</Text>
              <Text style={styles.value}>{user.username}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Password:</Text>
              <Text style={styles.value}>{maskText(user.password)}</Text>
            </View>
          </>
        )}
        <Pressable style={styles.googleButton} onPress={() => navigation.navigate('FirstPage')}>
          <Text style={styles.googleButtonText}>Sign out</Text>
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
    backgroundColor: '#ffffff', // white background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#ffffff', // white card
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c12d38', // red accent border
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60, // circular profile image
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#c12d38', // red title text
    marginVertical: 20,
  },
  changeButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#c12d38', // red button
    alignItems: 'center',
    marginBottom: 15,
  },
  changeButtonText: {
    color: '#ffffff', // white text
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    color: '#000000', // black text
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#000000', // black text
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
    backgroundColor: '#000000', // black button
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#ffffff', // white text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
