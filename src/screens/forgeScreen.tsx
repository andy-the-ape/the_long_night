import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import Lightbringer from "../components/lightBringer";

const ForgeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <GOTHeader />
      <ImageBackground
        source={require("../../assets/images/forge.png")}
        style={styles.background}
      >
        <View style={styles.content}>
          <Lightbringer/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
});
