import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import LoadingScreen from './src/components/GOTComponents/loadingScreen';
import StackNavigator from './src/navigation/stackNavigator';
import { Provider } from './src/context/context';


const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'GOT': require('./assets/fonts/GOT.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider>
      <NavigationContainer>
      <StackNavigator/>
      </NavigationContainer>
    </Provider>
  );
};

export default App;