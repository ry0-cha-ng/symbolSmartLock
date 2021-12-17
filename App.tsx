import React from 'react';
import {  StyleSheet,  Text,  TouchableOpacity,  View,  ImageBackground} from 'react-native';

function Lock() {
  
}

function Unlock() {

}

export default function App() {



  return (
    <ImageBackground source={require("../src/assets/background_img.png")} resizeMode="stretch">
      <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>鍵開ける</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#000',
  },
  button: {
    borderRadius: 50,

  },
});
