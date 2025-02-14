import React from 'react'
import {View, Text, Pressable, StyleSheet, SafeAreaView, Image} from 'react-native'
const impress = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button1:{
        height: '8%',
        width: '50%',
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgb(193, 45, 56)',
        },
    button2:{
            height: '8%',
            width: '50%',
            margin: 10,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(128, 128, 128)',
  
            },
    image: {
            height: '25%',
            width: '45%',
        },

})
const Login = () => {
    return(
        <View style={impress.container}>
            <Image source={require('./assets/Stickr Logo-1.png')} style= {impress.image}/>
            <Pressable style={impress.button1} >
                <Text style={{fontSize:32,color: 'white'}}>
                    LOGIN
                </Text>
            </Pressable>
            <Pressable style={impress.button2}>
                <Text style={{fontSize:32, color: 'white',}}>
                 SIGN UP
                </Text>
            </Pressable>
        </View>
    )
}
export default Login