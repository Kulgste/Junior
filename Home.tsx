import React, { useState, useEffect, useRef } from 'react';
import { 
  Platform, 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  Pressable, 
  Animated 
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

// Reusable component to animate button presses
const AnimatedPressable = ({ onPress, children, style }: { onPress: () => void, children: React.ReactNode, style?: any }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => onPress && onPress());
  };
  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

const HomePage = ({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any> }) => {
  // Sidebar animation state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current; // Sidebar starts offscreen

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      // Animate sidebar out then update state
      Animated.timing(sidebarAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSidebarOpen(false));
    } else {
      // Set state first then animate sidebar in
      setIsSidebarOpen(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Sticker name state (updated via route) and animation value for the device card
  const [stickerName, setStickerName] = useState('Stickr1');
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (route.params?.updatedStickerName) {
      setStickerName(route.params.updatedStickerName);
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
    }).start(() => navigation.navigate('Preset'));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with menu button and logo */}
      <View style={styles.header}>
        <Image style={styles.headerImage} source={require('./assets/Logo.png')} />
      </View>

      {/* Body with Animated Device Card */}
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
              <Text style={styles.deviceTitle}>{stickerName}</Text>
              <Text style={styles.deviceStatus}>Connected</Text>
            </View>
          </Pressable>
        </Animated.View>
      </View>

      {/* Footer with Navigation Icons */}
      <View style={styles.footer}>
        <AnimatedPressable onPress={toggleSidebar} style={styles.animatedFooterButton}>
          <Image style={styles.footerImage} source={require('./assets/Menu.png')} />
        </AnimatedPressable>
        <AnimatedPressable onPress={() => navigation.navigate("ViewProfile")} style={styles.animatedFooterButton}>
          <Image style={styles.footerProfileImage} source={require('./assets/Profile.png')} />
        </AnimatedPressable>
        <AnimatedPressable onPress={() => navigation.navigate("BLEpage")} style={styles.animatedFooterButton}>
          <Image style={styles.footerBLE} source={require('./assets/Ble tag.png')} />
        </AnimatedPressable>
      </View>

      {/* Animated Sidebar Navigation */}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
        <AnimatedPressable onPress={() => { navigation.navigate("FirstPage"); toggleSidebar(); }}>
          <Text style={styles.sidebarText}>Home</Text>
        </AnimatedPressable>
        <AnimatedPressable onPress={() => { navigation.navigate("ViewProfile"); toggleSidebar(); }}>
          <Text style={styles.sidebarText}>Profile</Text>
        </AnimatedPressable>
        <AnimatedPressable onPress={toggleSidebar}>
          <Text style={styles.sideBarBack}>Go Back</Text>
        </AnimatedPressable>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(51,51,51)',
    paddingTop: 20,
  },
  // Header styles
  header: {
    height: 100,
    backgroundColor: '#f0f4f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderBottomWidth: 10,
    borderColor: 'rgb(193,45,56)',
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  headerImage: {
    width: '40%',
    height: '100%',
    resizeMode: 'contain',
  },
  // Body styles
  body: {
    flex: 1,
    marginTop: 120, // Leave space for header
    alignItems: 'center',
    justifyContent: 'center',
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
  // Footer styles
  footer: {
    height: 100,
    backgroundColor: '#f0f4f7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 10,
    borderColor: 'rgb(193,45,56)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20,
  },
  animatedFooterButton: {
    // Additional styling for animated footer buttons (if needed)
  },
  footerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  footerBLE: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
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
  // Sidebar styles
  sidebar: {
    width: '80%',
    backgroundColor: 'rgb(255,255,255)',
    paddingTop: 50,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sidebarText: {
    fontSize: 20,
    marginVertical: 10,
    paddingVertical: 15,
    ...Platform.select({
      ios: { fontWeight: '200' },
      android: { fontWeight: '300' },
    }),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  sideBarBack: {
    fontSize: 20,
    marginVertical: 10,
    ...Platform.select({
      ios: { fontWeight: '200' },
      android: { fontWeight: '300' },
    }),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    marginTop: 20,
  },
});

export default HomePage;
