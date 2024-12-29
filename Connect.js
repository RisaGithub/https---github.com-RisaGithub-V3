import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import moonGif from './assets/moon.gif';
import cloudsGif from './assets/clouds_no_bg.gif';

import sv from './assets/ring-resize.svg';
import { useState, useEffect } from 'react';

const factor = 0.9;
const activeColor = '#ba6bff'
const notActiveColor = "white"
const framerate = 1;
const speed = 2;



export const Connect = () => {
  const [moonTop, setMoonTop] = React.useState(-400);
  const [cloudsTop, setCloudsTop] = React.useState(400);
  const [currentColor, setcurrentColor] = React.useState(notActiveColor);
  const [loading, setLoading] = React.useState(false);
  const [moonAnimating, setMoonAnimating] = React.useState(false);
  const [cloudsAnimating, setCloudsAnimating] = React.useState(false);

  useEffect(() => { Clicked() }, [])

  let text_top = loading ? -22 : -190
  // Function to animate the moon
  function ShowMoon() {
    setMoonAnimating(true);
    let moonInterval = setInterval(() => {
      setMoonTop((prevMoonTop) => {
        if (prevMoonTop >= -90) {
          clearInterval(moonInterval); // Stop the animation when the moon reaches its destination
          return prevMoonTop;
        }
        return prevMoonTop + speed; // Move the moon upwards
      });
    }, framerate); // Adjust the speed by changing the interval time (10ms)
    setMoonAnimating(false);
  }

  // Function to animate the clouds
  function ShowClouds() {
    setCloudsAnimating(true);
    let cloudsInterval = setInterval(() => {
      setCloudsTop((prevCloudsTop) => {
        if (prevCloudsTop <= 200) {
          clearInterval(cloudsInterval); // Stop the animation when the clouds reach their destination
          return prevCloudsTop;
        }
        return prevCloudsTop - speed; // Move the clouds downwards
      });
    }, framerate); // Adjust the speed by changing the interval time (10ms)
    setCloudsAnimating(false);
  }

  // Function to hide the moon
  function HideMoon() {
    //setMoonTop(-400)
    let moonInterval = setInterval(() => {
      setMoonTop((prevMoonTop) => {
        if (prevMoonTop <= -400) {
          clearInterval(moonInterval); // Stop the animation when the moon reaches its destination
          return prevMoonTop;
        }
        return prevMoonTop - speed; // Move the moon upwards
      });
    }, framerate);

  }

  // Function to hide the clouds
  function HideClouds() {
    //setCloudsTop(500)
    let cloudsInterval = setInterval(() => {
      setCloudsTop((prevCloudsTop) => {
        if (prevCloudsTop >= 450) {
          clearInterval(cloudsInterval); // Stop the animation when the clouds reach their destination
          return prevCloudsTop;
        }
        return prevCloudsTop + speed; // Move the clouds downwards
      });
    }, framerate);
  }

  function Clicked() {
    if (currentColor !== activeColor) {
      // Start loading
      setLoading(true);
      setTimeout(() => {
        // Set color to not active after 2 seconds
        setcurrentColor(notActiveColor);
        ShowClouds()
        ShowMoon()

        // After 2 seconds, stop loading and set the current color to active
        setLoading(false);
        setcurrentColor(activeColor);
      }, 1500);
    } else if (!moonAnimating && !cloudsAnimating) {
      setcurrentColor(notActiveColor);

      HideClouds();
      HideMoon();
    }
  }


  return (
    <LinearGradient
      colors={['#0f0f34', '#03030f']}
      style={styles.linearGradient}>
      <View style={[styles.centeredView, { paddingVertical: 150 }]}>
        <View style={[styles.moonContainer, { right: 200, top: moonTop }]}>
          <Image
            source={moonGif}
            style={[
              {
                opacity: 0.35,
                height: 200 * factor,
                width: 200 * factor,
                resizeMode: 'fit',
              },
            ]}
          />
        </View>
        <View style={[styles.centeredView]}></View>

        <TouchableOpacity onPress={Clicked} style={styles.centeredView} disabled={loading}>
          <View style={[styles.centeredView, {
            borderColor: currentColor,
            shadowColor: currentColor,
            shadowOpacity: 1,
            shadowRadius: 20,
            borderRadius: 1500,
            width: 290 * factor,
            height: 290 * factor,
            position: 'absolute',
            borderWidth: 3,
          }]}>
            <Text style={[styles.text, { top: text_top }]}>MAMAVPLUSE</Text>
            {
              loading &&
              <Image source={sv} style={
                {
                  height: 365 * factor,
                  width: 365 * factor,
                  resizeMode: 'cover',
                  top: -27,
                }} />
            }

          </View>
        </TouchableOpacity>

        <View style={[{ top: cloudsTop }]}>
          <Image
            source={cloudsGif}
            style={[
              {
                height: 230 * factor,
                resizeMode: 'fit,',
              },
            ]}
          />
        </View>
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
  text: {
    fontSize: 25,
    color: '#ba6bff',
    padding: 10,
    top: -190,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  moonContainer: {
    backgroundColor: '#ba6bff',
    borderRadius: 500,
    shadowColor: '#ba6bff',
    shadowOpacity: 0.8,
    shadowRadius: 50,
  },
});
