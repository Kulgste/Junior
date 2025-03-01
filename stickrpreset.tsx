import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import MapView, { Circle } from 'react-native-maps';
import * as Location from 'expo-location';

type StickrPresetProps = {
  navigation: NavigationProp<any>;
};

type PresetHeaderProps = {
  stickerName: string;
  isEditing: boolean;
  tempName: string;
  onChangeTempName: (text: string) => void;
  onToggleEdit: () => void;
  navigation: NavigationProp<any>;
};

const PresetHeader: React.FC<PresetHeaderProps> = ({
  stickerName,
  isEditing,
  tempName,
  onChangeTempName,
  onToggleEdit,
  navigation,
}) => (
  <View style={styles.header}>
    <Pressable
      onPress={() =>
        navigation.navigate('Home', { updatedStickerName: stickerName })
      }
    >
      <Image style={styles.homeIcon} source={require('./assets/home.png')} />
    </Pressable>
    <View style={styles.headerContent}>
      {isEditing ? (
        <TextInput
          style={styles.stickerNameInput}
          value={tempName}
          onChangeText={onChangeTempName}
          autoFocus
        />
      ) : (
        <Text style={styles.stickerName}>{stickerName}</Text>
      )}
      <Pressable onPress={onToggleEdit} style={styles.editButton}>
        <Image
          style={styles.pencilIcon}
          source={require('./assets/editing.png')}
        />
      </Pressable>
    </View>
  </View>
);

type LocationMapProps = {
  location: Location.LocationObject | null;
};

const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  if (!location) {
    return (
      <View style={styles.body}>
        <Text style={styles.locationText}>Location not available</Text>
      </View>
    );
  }

  const { latitude, longitude } = location.coords;
  return (
    <View style={styles.body}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Circle
          center={{ latitude, longitude }}
          radius={50}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor="rgba(0, 0, 255, 0.3)"
        />
      </MapView>
    </View>
  );
};

const StickrPreset: React.FC<StickrPresetProps> = ({ navigation }) => {
  const [stickerName, setStickerName] = useState('Stickr1');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(stickerName);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        Alert.alert('Error retrieving location');
      }
    })();
  }, []);

  const handleToggleEdit = () => {
    if (isEditing) {
      setStickerName(tempName);
      navigation.navigate('Home', { updatedStickerName: tempName });
    }
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PresetHeader
        stickerName={stickerName}
        isEditing={isEditing}
        tempName={tempName}
        onChangeTempName={setTempName}
        onToggleEdit={handleToggleEdit}
        navigation={navigation}
      />
      <LocationMap location={location} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  // Header styles
  header: {
    height: 120,
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    borderBottomWidth: 3,
    borderColor: '#C12D38',
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    width: 40,
    height: 40,
    tintColor: '#C12D38',
  },
  stickerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 15,
  },
  stickerNameInput: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    borderBottomWidth: 2,
    borderColor: '#C12D38',
    width: 160,
    marginRight: 15,
    paddingVertical: 2,
  },
  pencilIcon: {
    width: 28,
    height: 28,
    tintColor: '#C12D38',
  },
  editButton: {
    padding: 5,
  },
  // Body and Map styles
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
  },
});

export default StickrPreset;