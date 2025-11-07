import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import DepartmentScreen from '../screens/DepartmentScreen';
import DigitalLoadingScreen from '../screens/DigitalLoadingScreen';
import DigitalMainScreen from '../screens/DigitalMainScreen';
import DataHubLoadingScreen from '../screens/DataHubLoadingScreen';
import DataHubMainScreen from '../screens/DataHubMainScreen';
import CyberLoadingScreen from '../screens/CyberLoadingScreen';
import CyberMainScreen from '../screens/CyberMainScreen';
import MossovetLoadingScreen from '../screens/MossovetLoadingScreen';
import MossovetMainScreen from '../screens/MossovetMainScreen';
import TechnoLoadingScreen from '../screens/TechnoLoadingScreen';
import TechnoMainScreen from '../screens/TechnoMainScreen';
import AutoLoadingScreen from '../screens/AutoLoadingScreen';
import AutoMainScreen from '../screens/AutoMainScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Department" component={DepartmentScreen} />
        <Stack.Screen name="DigitalLoading" component={DigitalLoadingScreen} />
        <Stack.Screen name="DigitalMain" component={DigitalMainScreen} />
        <Stack.Screen name="DataHubLoading" component={DataHubLoadingScreen} />
        <Stack.Screen name="DataHubMain" component={DataHubMainScreen} />
        <Stack.Screen name="CyberLoading" component={CyberLoadingScreen} />
        <Stack.Screen name="CyberMain" component={CyberMainScreen} />
        <Stack.Screen name="MossovetLoading" component={MossovetLoadingScreen} />
        <Stack.Screen name="MossovetMain" component={MossovetMainScreen} />
        <Stack.Screen name="TechnoLoading" component={TechnoLoadingScreen} />
        <Stack.Screen name="TechnoMain" component={TechnoMainScreen} />
        <Stack.Screen name="AutoLoading" component={AutoLoadingScreen} />
        <Stack.Screen name="AutoMain" component={AutoMainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            headerShown: true, 
            title: 'Главная' 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}