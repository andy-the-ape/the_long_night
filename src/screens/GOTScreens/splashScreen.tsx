import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { nightTheme } from '../../constants/colors';
import GOTButton from '../../components/GOTComponents/GOTButton';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3); 
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../../assets/images/theWall.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>THE LONG NIGHT</Text>
        <GOTButton 
          title="TO WESTEROS" 
          onPress={handlePress} 
          buttonStyle={styles.button} 
          textStyle={styles.buttonText} 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'GOT',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: nightTheme.highlight, 
  },
  buttonText: {
    color: 'white', 
  },
});

export default SplashScreen;
