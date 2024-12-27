import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/GOTScreens/splashScreen';
import HomeScreen from '../screens/GOTScreens/homeScreen';
import ForgeScreen from '../screens/forgeScreen';
import WinterfellScreen from '../screens/winterfellScreen';
import BattleScreen from '../screens/battleScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen 
        name="SplashScreen" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ForgeScreen" 
        component={ForgeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="WinterfellScreen" 
        component={WinterfellScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BattleScreen" 
        component={BattleScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;