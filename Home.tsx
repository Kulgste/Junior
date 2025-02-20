import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const HomePage = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={require('./assets/Logo.png')}
        />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.bodyText}>No BLE Tags</Text>
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation:1,
    borderBottomWidth:10,
    borderColor: 'rgb(193, 45, 56)',
    position: 'absolute',
    paddingTop: 20,
    width: '100%' 

  },
  headerImage: {
    width: 100,
    height:50,
    opacity:1,
  },
  body: {
    marginTop:70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:70,
    textAlign:'center',
  },
  bodyText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    textAlign:'center',
    
  },
  footer: {
    height: 100,
    backgroundColor: '#f0f4f7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 10,
    borderColor: 'rgb(193, 45, 56)',
    position:'absolute',
    bottom:0,
    width:'100%',
    paddingBottom:20,
  },
  footerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  footerProfileImage:{
    width:115,
    height:115,
    elevation:100,
    marginBottom:35,
    borderWidth:3,
    borderRadius:75,
    borderColor:'black',
    backgroundColor:'#f0f4f7',
  }
});

export default HomePage;
