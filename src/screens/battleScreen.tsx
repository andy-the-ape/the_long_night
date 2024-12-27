import React from 'react';
import { View,Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import GOTHeader from '../components/GOTComponents/GOTHeader';
import { nightTheme } from '../constants/colors';

const BattleScreen: React.FC = () => {

  function handlePress(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <GOTHeader />
      <ImageBackground
        source={require("../../assets/images/nightKing.jpg")}
        style={styles.background}
      >
        <View style={styles.content}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>Battle</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    );
};

export default BattleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    fontFamily: "GOT",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    width: "33%",
    height: "33%",
    backgroundColor: nightTheme.highlight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    bottom: 10
  },
});
