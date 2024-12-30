import { View, Animated, Text, TextInput, StyleSheet, Image, ImageBackground, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import React from 'react';
import { useState, useEffect, useRef } from 'react';

const factor = 0.8;
const activeColor = '#ba6bff'
const notActiveColor = "white"
const connectCircleSize = 350
const moonShownTop = 60
const moonHiddenTop = -300
const cloudsShownBottom = -50
const cloudsHiddenBottom = 200

function sleepSync(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // Busy wait
  }
}

export const Connect = () => {
  const [connected, setConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const currentMoonTop = useRef(new Animated.Value(moonHiddenTop)).current;
  const currentCloudsBottom = useRef(new Animated.Value(cloudsHiddenBottom)).current;

  useEffect(() => {
  }, [loading]);

  function clicked() {
    console.log('Clicked')
    if (!loading) {
      if (connected) {
        HideMoonAndClouds()
        setConnected(false)
      } else {
        setLoading((true));
        setTimeout(() => {
          sleepSync(1500);
          showMoonAndClouds();
          setLoading(false);
          setConnected(true);
        }, 0);
      }
    }
  }

  function showMoonAndClouds() {
    Animated.timing(currentMoonTop, {
      toValue: 0, useNativeDriver: true,
    }).start();
    Animated.timing(currentCloudsBottom, {
      toValue: 0, useNativeDriver: true,
    }).start()
  }
  function HideMoonAndClouds() {
    Animated.timing(currentMoonTop, {
      toValue: moonHiddenTop, useNativeDriver: true,
    }).start();
    Animated.timing(currentCloudsBottom, {
      toValue: cloudsHiddenBottom, useNativeDriver: true,
    }).start()
  }

  return (
    <LinearGradient
      colors={['#0f0f34', '#03030f']}
      style={styles.linearGradient}>

      {/* moon */}
      <Animated.View style={[styles.moonShadowContainer, { transform: [{ translateY: currentMoonTop }] }]}>
        <Image
          source={require('./assets/moon.gif')}
          style={styles.moonImage}
        />
      </Animated.View>

      {/* clouds */}
      <Animated.View style={[styles.cloudsContainer, { transform: [{ translateY: currentCloudsBottom }] }]}>
        <Image
          source={require('./assets/clouds.gif')}
          style={styles.cloudsImage}
        />
      </Animated.View>

      {/* circle inside loading ring */}
      <View style={styles.centeredView}>
        <Text style={[styles.circleText]}>MAMAVPLUSE</Text>
        <ImageBackground opacity={loading ? 1 : 0} source={require("./assets/loading.gif")} style={[styles.loadingRingImage]} >
          <Pressable disabled={loading} onTouchStart={clicked} style={styles.centeredView}>
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
    elevation: 70,
  },
  moonImage: {
    opacity: 0.35,
    height: 200 * factor,
    width: 200 * factor,
    resizeMode: 'fit',
  },
  cloudsContainer: {
    height: 230 * factor,
    position: 'absolute',
    bottom: cloudsShownBottom,
    alignSelf: "center"
  },
  cloudsImage: {
    resizeMode: "contain",
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
