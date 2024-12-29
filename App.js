import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Home } from './Home.js';
import { Connect } from './Connect.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, title: '' }} // Removes the header for the Home screen
        />
        <Stack.Screen
          name="Connect"
          component={Connect}
          options={{ headerShown: false, title: '' }} // Removes the header for the Connect screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
