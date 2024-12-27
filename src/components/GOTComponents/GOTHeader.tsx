import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { nightTheme } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const GOTHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        <View style={styles.row}>
          <Image
            source={require("../../../assets/images/starkLogo.png")}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>The Long Night</Text>
            <Image
              source={require("../../../assets/images/longClaw.png")}
              style={styles.sword1}
            />
            <Image
              source={require("../../../assets/images/longClaw.png")}
              style={styles.sword2}
            />
          </View>
          <Image
            source={require("../../../assets/images/tarLogo.png")}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: nightTheme.background,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 60,
    marginHorizontal: 10,
  },
  textContainer: {
    position: "relative",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: "GOT",
    zIndex: 1,
  },
  sword1: {
    position: "absolute",
    width: "100%",
    height: 40,
    resizeMode: "contain",
    zIndex: 0,
    opacity: 0.75,
    transform: [{ rotate: "15deg" }],
  },
  sword2: {
    position: "absolute",
    width: "100%",
    height: 40,
    resizeMode: "contain",
    zIndex: 0,
    opacity: 0.75,
    transform: [{ rotate: "165deg" }],
  },
  buttonText: {
    color: "white",
    fontFamily: "GOT",
    fontSize: 18,
  },
  divider: {
    width: "100%",
    height: 8,
    backgroundColor: nightTheme.highlight,
  },
});

export default GOTHeader;
