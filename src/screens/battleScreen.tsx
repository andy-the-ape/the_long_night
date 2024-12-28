import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  FlatList,
  Dimensions
} from "react-native";
import * as Location from "expo-location"; // Added Location module to fetch user's location
import GOTHeader from "../components/GOTComponents/GOTHeader";
import GOTButton from "../components/GOTComponents/GOTButton";
import { nightTheme } from "../constants/colors";
import { useGlobalState } from "../context/context"; // Added global state to access crafted sword and selected characters
import Lightbringer from "../components/lightBringer";

const { width, height } = Dimensions.get("window"); // Use screen dimensions for responsive styling

const BattleScreen: React.FC = () => {
  // Access global state for selected characters and crafted sword
  const { selectedCharactersForBattle, craftedSword } = useGlobalState();

  // State to store the user's current location coordinates
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // State to store any error messages related to location fetching
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      // Request location permissions from the user
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied."); // Set error message if permissions are denied
        return;
      }
    };
    requestPermissions();
  }, []); // Runs once when the component mounts

  
  // Function to fetch the user's current location
  const fetchLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location. Please try again.");
    }
  };

  // Function to render each character card
  const renderCharacter = ({
    item,
  }: {
    item: { id: number; name: string; imageUrl: string };
  }) => (
    <View style={styles.characterCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.characterImage} />
      <Text style={styles.characterName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <GOTHeader />
      <ImageBackground
        source={require("../../assets/images/nightKing.jpg")}
        style={styles.background}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Dark Overlay */}
        <View style={styles.overlay} />
        <View style={styles.content}>
          {/* Conditionally render the crafted sword or a placeholder message */}
          {craftedSword ? (
            <View style={styles.swordContainer}>
              <Lightbringer material={craftedSword.material} swordType={craftedSword.type} imageUrl={craftedSword.imageUrl}/>
            </View>
          ) : (
            <Text style={styles.swordText}>No sword crafted yet!</Text>
          )}

          {/* Render the selected characters */}
          <Text style={styles.label}>Chosen Characters:</Text>
          {selectedCharactersForBattle.length > 0 ? (
            <FlatList
            data={selectedCharactersForBattle} // List of selected characters
            renderItem={renderCharacter} // Render each character card
              keyExtractor={(item) => item.id.toString()} // Use character ID as a unique key
              contentContainerStyle={styles.charactersList}
              numColumns={3} // Arrange characters in rows of 3
            />
          ) : (
            <Text style={styles.characterName}>No characters selected!</Text> // Placeholder when no characters are selected
          )}

          {/* Button to fetch and display the user's location */}
          <GOTButton onPress={fetchLocation} title="Battle" />
          {/* Display error message or fetched coordinates */}
          {errorMsg ? (
            <Text style={styles.errorText}>{errorMsg}</Text>
          ) : coordinates ? (
            <Text style={styles.locationText}>
              Latitude: {coordinates.latitude.toFixed(4)}, Longitude:{" "}
              {coordinates.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text style={styles.locationText}>Press to get location.</Text>
          )}
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
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
  backgroundImageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    alignItems: "center",
    marginBottom: 50,
    gap: 15,
  },
  swordContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  swordImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  swordText: {
    fontSize: 16,
    fontFamily: "GOT",
    color: nightTheme.accent,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "GOT",
    color: nightTheme.accent,
    marginVertical: 10,
  },
  charactersList: {
    marginBottom: 20,
  },
  characterCard: {
    alignItems: "center",
    justifyContent: "center",
    width: width / 3 - 20, // Ensure three cards fit in one row
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  characterName: {
    fontSize: 12,
    fontFamily: "GOT",
    color: nightTheme.accent,
    textAlign: "center", // Center-align the text
    flexWrap: "wrap", // Enable text wrapping
    maxWidth: 80, // Restrict the width of the text
  },
  locationText: {
    marginTop: 20,
    fontSize: 16,
    color: nightTheme.Special,
    fontFamily: "GOT",
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: nightTheme.Special,
    fontFamily: "GOT",
  },
});
