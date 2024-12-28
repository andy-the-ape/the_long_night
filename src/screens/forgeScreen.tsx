import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, TextStyle, ViewStyle, StyleProp } from "react-native";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import GOTButton from "../components/GOTComponents/GOTButton";
import Lightbringer, { Material, SwordType } from "../components/lightBringer";
import { useGlobalState } from "../context/context";
import { useNavigation } from '@react-navigation/native';

const ForgeScreen: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation
  const { craftedSword, setCraftedSword } = useGlobalState();

  const [selectedMaterial, setSelectedMaterial] = useState<Material>(
    (craftedSword?.material as Material) || Material.ValyrianSteel
  );
  const [selectedSwordType, setSelectedSwordType] = useState<SwordType>(
    (craftedSword?.type as SwordType) || SwordType.Greatsword
  );

  const renderOption = (
    options: string[],
    selected: string,
    onSelect: (option: string) => void,
    buttonStyle: StyleProp<ViewStyle>,
    textStyle: StyleProp<TextStyle>
  ) => (
    <FlatList
      data={options}
      horizontal
      keyExtractor={(item) => item}
      contentContainerStyle={styles.optionColumn}
      renderItem={({ item }) => (
        <GOTButton
          title={item}
          onPress={() => onSelect(item)}
          buttonStyle={StyleSheet.flatten([
            buttonStyle,
            selected === item && styles.optionButtonSelected,
          ])}
          textStyle={StyleSheet.flatten([
            textStyle,
            selected === item && styles.optionTextSelected,
          ])}
        />
      )}
    />
  );

    // Dynamically load the image based on the swordType
    const getSwordImage = (type: SwordType) => {
      switch (type) {
        case SwordType.Greatsword:
          return require('../../assets/images/swordIcons/greatsword.png');
        case SwordType.Longsword:
          return require('../../assets/images/swordIcons/longsword.png');
        case SwordType.Shortsword:
          return require('../../assets/images/swordIcons/shortsword.png');
        default:
          return require('../../assets/images/swordIcons/shortsword.png'); // Fallback
      }
    };

  const handleCraftSword = () => {
    setCraftedSword({
      material: selectedMaterial,
      type: selectedSwordType,
      imageUrl: getSwordImage(selectedSwordType)
    });

    navigation.navigate('HomeScreen'); // Navigate to HomeScreen
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
            {/* Render Lightbringer dynamically */}
            <Lightbringer material={selectedMaterial} swordType={selectedSwordType} imageUrl={getSwordImage(selectedSwordType)} />

            <View style={styles.optionsContainer}>
              {/* Material Selection */}
              <View style={styles.group}>
                <Text style={styles.label}>Material:</Text>
                {renderOption(
                  Object.values(Material),
                  selectedMaterial,
                  (option) => setSelectedMaterial(option as Material),
                  styles.optionButton,
                  styles.optionText
                )}
              </View>

            {/* Sword Type Selection */}
            <View style={styles.group}>
              <Text style={styles.label}>Sword Type:</Text>
              {renderOption(
                Object.values(SwordType),
                selectedSwordType,
                (option) => setSelectedSwordType(option as SwordType),
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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