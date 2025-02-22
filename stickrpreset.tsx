import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, TextInput } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const StickrPreset = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [stickerName, setStickerName] = useState('Stickr1');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(stickerName);

  const handleRename = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setStickerName(tempName);
      navigation.navigate('Home', { updatedStickerName: tempName }); // Send updated name back
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home', { updatedStickerName: stickerName })}>
          <Image style={styles.homeIcon} source={require('./assets/home.png')} />
        </Pressable>
        <View style={styles.headerContent}>
          {isEditing ? (
            <TextInput
              style={styles.stickerNameInput}
              value={tempName}
              onChangeText={setTempName}
              autoFocus
            />
          ) : (
            <Text style={styles.stickerName}>{stickerName}</Text>
          )}
          <Pressable onPress={handleRename}>
            <Image style={styles.pencilIcon} source={require('./assets/editing.png')} />
          </Pressable>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Image style={styles.mapImage} source={require('./assets/IMG_0484.jpeg')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818', // Dark background for a modern feel
    paddingTop: 20,
  },
  header: {
    height: 120,
    backgroundColor: '#2E2E2E', // Dark header for contrast
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    borderBottomWidth: 3,
    borderColor: '#C12D38', // Accent color for contrast
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    width: 40,
    height: 40,
  },
  stickerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 15,
  },
  stickerNameInput: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    borderBottomWidth: 2,
    borderColor: '#C12D38', // Accent color for input field
    width: 160,
    marginRight: 15,
  },
  pencilIcon: {
    width: 30,
    height: 30,
    tintColor: '#C12D38', // Accent color for the pencil icon
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  mapImage: {
    width: '90%',
    height: '60%',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#444', // Subtle border around the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default StickrPreset;
