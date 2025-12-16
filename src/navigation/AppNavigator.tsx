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
import ThesisSupervisorsScreen from '../screens/ThesisSupervisorsScreen';
import PartnersScreen from '../screens/PartnersScreen';
import CharterScreen from '../screens/CharterScreen';
import DataHubThesisSupervisorsScreen from '../screens/DataHubThesisSupervisorsScreen';
import DataHubPartnersScreen from '../screens/DataHubPartnersScreen';
import DataHubCharterScreen from '../screens/DataHubCharterScreen';
import CyberThesisSupervisorsScreen from '../screens/CyberThesisSupervisorsScreen';
import CyberPartnersScreen from '../screens/CyberPartnersScreen';
import CyberCharterScreen from '../screens/CyberCharterScreen';
import MossovetThesisSupervisorsScreen from '../screens/MossovetThesisSupervisorsScreen';
import MossovetPartnersScreen from '../screens/MossovetPartnersScreen';
import MossovetCharterScreen from '../screens/MossovetCharterScreen';
import TechnoThesisSupervisorsScreen from '../screens/TechnoThesisSupervisorsScreen';
import TechnoPartnersScreen from '../screens/TechnoPartnersScreen';
import TechoCharterScreen from '../screens/TechnoCharterScreen';
import AutoThesisSupervisorsScreen from '../screens/AutoThesisSupervisorsScreen';
import AutoPartnersScreen from '../screens/AutoPartnersScreen';
import AutoCharterScreen from '../screens/AutoCharterScreen';

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
        <Stack.Screen name="ThesisSupervisors" component={ThesisSupervisorsScreen} />
        <Stack.Screen name="Partners" component={PartnersScreen} />
        <Stack.Screen name="Charter" component={CharterScreen} />
        <Stack.Screen name="DataHubThesisSupervisors" component={DataHubThesisSupervisorsScreen} />
<Stack.Screen name="DataHubPartners" component={DataHubPartnersScreen} />
<Stack.Screen name="DataHubCharter" component={DataHubCharterScreen} />
<Stack.Screen name="CyberThesisSupervisors" component={CyberThesisSupervisorsScreen} />
<Stack.Screen name="CyberPartners" component={CyberPartnersScreen} />
<Stack.Screen name="CyberCharter" component={CyberCharterScreen} />
<Stack.Screen name="MossovetThesisSupervisors" component={MossovetThesisSupervisorsScreen} />
<Stack.Screen name="MossovetPartners" component={MossovetPartnersScreen} />        
<Stack.Screen name="MossovetCharter" component={MossovetCharterScreen} options={{ headerShown: false }} />        
<Stack.Screen name="TechnoThesisSupervisors" component={TechnoThesisSupervisorsScreen} options={{ title: 'Техно - Руководители', headerShown: false}} />        
<Stack.Screen name="TechnoPartners" component={TechnoPartnersScreen} options={{ title: 'Партнеры Техно', headerShown: false }} />        
<Stack.Screen name="TechnoCharter" component={TechoCharterScreen} options={{title: 'Устав колледжа',  headerShown: false}} />        
<Stack.Screen name="AutoThesisSupervisors" component={AutoThesisSupervisorsScreen} options={{ title: 'Авто - Руководители', headerShown: false }} />        
<Stack.Screen 
  name="AutoPartners" 
  component={AutoPartnersScreen} 
  options={{ 
    title: 'Авто - Партнеры', 
    headerShown: false 
  }} 
/> 
<Stack.Screen 
  name="AutoCharter" 
  component={AutoCharterScreen} 
  options={{ 
    title: 'Устав колледжа', 
    headerShown: false 
  }} 
/>       
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