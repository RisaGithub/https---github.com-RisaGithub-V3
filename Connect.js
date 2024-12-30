import { View, Text, TextInput, StyleSheet, Image, ImageBackground, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import React from 'react';
import { useState, useEffect } from 'react';

const factor = 0.8;
const activeColor = '#ba6bff'
const notActiveColor = "white"
const connectCircleSize = 350
const moonShownTop = 60
const cloudsShownBottom = -20

export const Connect = () => {
  const [currentColor, setcurrentColor] = React.useState(notActiveColor);
  const [loading, setLoading] = React.useState(true);

  function clicked() {
    console.log('Clicked')
  }

  return (
    <LinearGradient
      colors={['#0f0f34', '#03030f']}
      style={styles.linearGradient}>

      {/* moon */}
      <View style={styles.moonShadowContainer}>
        <Image
          source={require('./assets/moon.gif')}
          style={styles.moonImage}
        />
      </View>

      {/* clouds */}
      <Image
        source={require('./assets/clouds.gif')}
        style={styles.cloudsImage}
      />

      {/* circle inside loading ring */}
      <View style={styles.centeredView}>
        <Text style={[styles.circleText]}>MAMAVPLUSE</Text>
        <ImageBackground source={require("./assets/loading.gif")} style={[styles.loadingRingImage, { opacity: loading ? 1 : 0 }]} >
          <Pressable onPressIn={clicked} onTouchStart={clicked} style={styles.centeredView}>
            <View style={[styles.connectCircle, { borderColor: loading ? 0 : "white" }]}></View>
          </Pressable>
        </ImageBackground>
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 25,
    color: '#ba6bff',
    bottom: connectCircleSize / 13,
    position: 'relative',
  },
  linearGradient: {
    flex: 1,
    padding: 15,
  },
  moonShadowContainer: {
    backgroundColor: '#ba6bff',
    borderRadius: 500,
    position: 'absolute',
    left: -25,
    top: moonShownTop,

    shadowColor: '#ba6bff',
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 50,
  },
  moonImage: {
    opacity: 0.35,
    height: 200 * factor,
    width: 200 * factor,
    resizeMode: 'fit',
  },
  cloudsImage: {
    height: 230 * factor,
    resizeMode: "contain",
    position: 'absolute',
    bottom: cloudsShownBottom,
    alignSelf: "center"
  },
  connectCircle: {
    borderColor: "white",
    borderRadius: 1500,
    width: connectCircleSize * factor,
    height: connectCircleSize * factor,
    borderWidth: 3,
    backgroundColor: '#090921',

    shadowColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  loadingRingImage: {
    height: connectCircleSize * factor + 12,
    width: connectCircleSize * factor + 12,
    resizeMode: 'cover',
  },
  shadowPropMoon: {
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  }
});
