import { View, Text, TextInput, StyleSheet, Image, ImageBackground, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import moonSource from './assets/moon.gif';
import cloudsSource from './assets/clouds_no_bg.gif';
import loadingRingSource from './assets/ring-resize.svg';

import React from 'react';
import { useState, useEffect } from 'react';

const factor = 0.8;
const activeColor = '#ba6bff'
const notActiveColor = "white"

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
          source={moonSource}
          style={styles.moonImage}
        />
      </View>

      {/* clouds */}
      <Image
        source={cloudsSource}
        style={styles.cloudsImage}
      />

      {/* text above the circle */}
      <Text style={[styles.circleText, styles.centeredView]}>MAMAVPLUSE</Text>

      {/* circle inside loading ring */}
      {
        loading &&

        <View style={styles.centeredView}>
          <ImageBackground source={loadingRingSource} style={[styles.loadingRingImage, { opacity: loading ? 1 : 0 }]} >
            <TouchableOpacity onPressIn={clicked} onTouchStart={clicked} style={styles.centeredView}>
              <View style={styles.connectCircle}></View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      }
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
    position: "absolute",
  },
  linearGradient: {
    flex: 1,
    padding: 15,
  },
  moonShadowContainer: {
    backgroundColor: '#ba6bff',
    borderRadius: 500,
    position: 'absolute',
  },
  moonImage: {
    opacity: 0.35,
    height: 200 * factor,
    width: 200 * factor,
    resizeMode: 'fit',
  },
  cloudsImage: {
    height: 230 * factor,
    resizeMode: 'fit,',
    position: 'absolute',
  },
  connectCircle: {
    borderColor: "white",
    borderRadius: 1500,
    width: 290 * factor,
    height: 290 * factor,
    borderWidth: 3,
  },
  loadingRingImage: {
    height: 365 * factor,
    width: 365 * factor,
    resizeMode: 'cover',
  }
});
