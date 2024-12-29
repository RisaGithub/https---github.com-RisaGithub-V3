import { View, Text, TextInput, StyleSheet, Keyboard, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useState, useEffect } from 'react';

export const Home = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [LoginFocused, setLoginFocused] = React.useState(false);
  const [PasswordFocused, setPasswordFocused] = React.useState(false);
  const focusedColor = '#234ae2';
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');
  const opac = (keyboardStatus === 'Keyboard Shown') ? 0 : 1;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <LinearGradient colors={['#0f0f34', '#03030f']} style={styles.linearGradient}>
      <View style={[styles.centeredView, { paddingVertical: 150 }]}>
        <View style={[styles.centeredView, { flex: 1 }]}>
          <Text style={[styles.text, { opacity: opac }]}>Добро пожаловать!</Text>
          <Text style={[styles.text, { opacity: opac }]}>Вход</Text>
        </View>
        <View style={[styles.centeredView, { flex: 5 }]}>
          <TextInput
            style={[styles.input, styles.text, LoginFocused && { borderColor: focusedColor }]}
            onFocus={() => setLoginFocused(true)}
            onBlur={() => setLoginFocused(false)}
            placeholder="Введите логин"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <TextInput
            style={[styles.input, styles.text, PasswordFocused && { borderColor: focusedColor }]}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Введите пароль"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <TouchableOpacity
            style={[styles.text, styles.btn]}
            onPress={() => navigation.navigate('Connect')} // Navigate to Connect
          >
            <Text style={{ color: 'white', fontSize: 22 }}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0)",
    height: 65,
    width: 280,
    paddingHorizontal: 30,
    outlineStyle: 'none',
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    fontSize: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: "white",
    height: 65,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "rgba(186, 107, 255, 0.5)",
    paddingHorizontal: 40,
    paddingVertical: 13,
    outlineStyle: 'none',
    marginVertical: 30,
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
