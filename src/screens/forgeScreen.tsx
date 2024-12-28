import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, TextStyle, ViewStyle, StyleProp } from "react-native";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import GOTButton from "../components/GOTComponents/GOTButton";
import Lightbringer, { Material, SwordType } from "../components/lightBringer";
import { useGlobalState } from "../context/context"; // Import global state hook
import { useNavigation } from '@react-navigation/native'; // Import navigation

const ForgeScreen: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation
  const { craftedSword, setCraftedSword } = useGlobalState(); // Access global state for the crafted sword

  // State for selected material, initialized to either the globally stored material or a default
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(
    (craftedSword?.material as Material) || Material.ValyrianSteel
  );

  // State for selected sword type, initialized to either the globally stored type or a default
  const [selectedSwordType, setSelectedSwordType] = useState<SwordType>(
    (craftedSword?.type as SwordType) || SwordType.Greatsword
  );

  // Function to render selectable options for materials and sword types
  const renderOption = (
    options: string[], // List of options to display
    selected: string, // Currently selected option
    onSelect: (option: string) => void, // Callback for when an option is selected
    buttonStyle: StyleProp<ViewStyle>, // Style for the buttons
    textStyle: StyleProp<TextStyle> // Style for the text
  ) => (
    <FlatList
      data={options}
      horizontal
      keyExtractor={(item) => item} // Use option name as key
      contentContainerStyle={styles.optionColumn}
      renderItem={({ item }) => (
        <GOTButton
          title={item}
          onPress={() => onSelect(item)} // Handle option selection
          buttonStyle={StyleSheet.flatten([
            buttonStyle,
            selected === item && styles.optionButtonSelected, // Highlight the selected button
          ])}
          textStyle={StyleSheet.flatten([
            textStyle,
            selected === item && styles.optionTextSelected, // Highlight the selected text
          ])}
        />
      )}
    />
  );

    // Function to dynamically load the image based on the sword type
    const getSwordImage = (type: SwordType) => {
      switch (type) {
        case SwordType.Greatsword:
          return require('../../assets/images/swordIcons/greatsword.png');
        case SwordType.Longsword:
          return require('../../assets/images/swordIcons/longsword.png');
        case SwordType.Shortsword:
          return require('../../assets/images/swordIcons/shortsword.png');
        default:
          return require('../../assets/images/swordIcons/shortsword.png'); // Fallback for unsupported types
      }
    };

  // Function to handle the crafting of the sword
  const handleCraftSword = () => {
    setCraftedSword({
      material: selectedMaterial, // Store the selected material globally
      type: selectedSwordType, // Store the selected sword type globally
      imageUrl: getSwordImage(selectedSwordType), // Store the corresponding image URL globally
    });

    navigation.navigate('HomeScreen'); // Navigate to the HomeScreen after crafting the sword
  }

  return (
    <View style={styles.container}>
      <GOTHeader />
      <ImageBackground
        source={require("../../assets/images/forge.png")}
        style={styles.background}
      >
        {/* Dark Overlay */}
        <View style={styles.overlay} />
          <View style={styles.content}>
            {/* Render the Lightbringer component dynamically based on selected options */}
            <Lightbringer material={selectedMaterial} swordType={selectedSwordType} imageUrl={getSwordImage(selectedSwordType)} />

            <View style={styles.optionsContainer}>
              {/* Material Selection */}
              <View style={styles.group}>
                <Text style={styles.label}>Material:</Text>
                {renderOption(
                  Object.values(Material), // Display all available materials
                  selectedMaterial, // Currently selected material
                  (option) => setSelectedMaterial(option as Material), // Update material state on selection
                  styles.optionButton,
                  styles.optionText
                )}
              </View>

            {/* Sword Type Selection */}
            <View style={styles.group}>
              <Text style={styles.label}>Sword Type:</Text>
              {renderOption(
                Object.values(SwordType), // Display all available sword types
                selectedSwordType, // Currently selected sword type
                (option) => setSelectedSwordType(option as SwordType), // Update sword type state on selection
                styles.optionButton,
                styles.optionText
              )}
            </View>
          </View>
            <GOTButton
              title="Craft sword"
              onPress={handleCraftSword}
            />
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Add a dark overlay for better contrast
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  group: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: "GOT",
    color: "white",
    marginBottom: 10,
  },
  optionColumn: {
    flexDirection: "column",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
  optionButtonSelected: {
    backgroundColor: "gold",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "GOT",
    color: "white",
  },
  optionTextSelected: {
    color: "black",
    fontWeight: "bold",
  },
});