import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, Animated } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

const HomePage = ({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
  const [stickerName, setStickerName] = useState('Stickr1');
  const scaleValue = new Animated.Value(1);

  // Update sticker name when receiving updatedStickerName
  useEffect(() => {
    if (route.params?.updatedStickerName) {
      setStickerName(route.params.updatedStickerName); // Set the updated sticker name
    }
  }, [route.params?.updatedStickerName]);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => navigation.navigate('StickrPreset'));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.headerImage} source={require('./assets/Logo.png')} />
      </View>

      {/* Device Option */}
      <View style={styles.body}>
        <Animated.View style={[styles.deviceCard, { transform: [{ scale: scaleValue }] }]}> 
          <Pressable 
            onPressIn={handlePressIn} 
            onPressOut={handlePressOut}
            style={({ pressed }) => [styles.devicePressable, pressed && styles.pressedStyle]}
          >
            <Image 
              style={[styles.deviceIcon, { tintColor: 'white' }]} 
              source={require('./assets/route.png')} 
            />
            <View>
              {/* Ensure that stickerName is properly wrapped in a Text component */}
              <Text style={styles.deviceTitle}>{stickerName}</Text> {/* Display updated sticker name */}
              <Text style={styles.deviceStatus}>Connected</Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable>
          <Image style={styles.footerImage} source={require('./assets/Menu.png')} />
        </Pressable>
        <Pressable>
          <Image style={styles.footerProfileImage} source={require('./assets/Profile.png')} />
        </Pressable>
        <Pressable>
          <Image style={styles.footerImage} source={require('./assets/Ble tag.png')} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(51,51,51)',
    paddingTop: 20,
  },
  header: {
    height: 100,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 10,
    borderColor: 'rgb(193, 45, 56)',
    position: 'absolute',
    width: '100%',
  },
  headerImage: {
    width: 100,
    height: 50,
  },
  body: {
    marginTop: 120,
    flex: 1,
    alignItems: 'center',
  },
  deviceCard: {
    width: '90%',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  devicePressable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pressedStyle: {
    opacity: 0.7,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  deviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  deviceStatus: {
    fontSize: 14,
    color: 'lightgreen',
  },
  footer: {
    height: 100,
    backgroundColor: '#f0f4f7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 10,
    borderColor: 'rgb(193, 45, 56)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20,
  },
  footerImage: {
    width: 50,
    height: 50,
  },
  footerProfileImage: {
    width: 115,
    height: 115,
    marginBottom: 35,
    borderWidth: 3,
    borderRadius: 75,
    borderColor: 'black',
    backgroundColor: '#f0f4f7',
  },
});

export default HomePage;
