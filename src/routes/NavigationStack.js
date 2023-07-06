import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Footer from '../components/Footer';
import List from '../components/List';
import ListSearch from '../components/ListSearch';
import CryptoData from '../components/CryptoData';
import ListFavorites from '../components/ListFavorites';
import Calculator from '../components/Calculator';

const Stack = createNativeStackNavigator();
const options = {
  presentation: "modal",
  animationTypeForReplace: "push",
  animation: "slide_from_right"
};
const tabOptions = { animation: "none" };

const NavigationStack = () => {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState();

  const getCurrentRoute = () => currentRoute;

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{colors: {background: '#220035'}}}
      onReady={() => setCurrentRoute(navigationRef.getCurrentRoute().name)}
      onStateChange={async () => setCurrentRoute(navigationRef.getCurrentRoute().name)}
    >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="List" component={List} options={tabOptions} />
        <Stack.Screen name="ListSearch" component={ListSearch} options={options} />
        <Stack.Screen name="CryptoData" component={CryptoData} options={options} />
        <Stack.Screen name="ListFavorites" component={ListFavorites} options={tabOptions} />
        <Stack.Screen name="Calculator" component={Calculator} options={tabOptions} />     
      </Stack.Navigator>
      <Footer navigationRef={navigationRef} getCurrentRoute={getCurrentRoute} />
    </NavigationContainer>
  );
};

export default NavigationStack;
