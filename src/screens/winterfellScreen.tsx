import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchCharacters } from "../services/fetchCharacters";
import { nightTheme } from "../constants/colors";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import CharacterCard from "../components/GOTComponents/GOTCharacterCard";
import GOTCharacterDetails from "../components/GOTComponents/GOTCharacterDetails";
import { useGlobalState } from "../context/context";
import { useNavigation } from '@react-navigation/native';

const WinterfellScreen: React.FC = () => {
  const navigation = useNavigation(); // Initialize navigation
  // Existing: State to store the list of characters
  const [characters, setCharacters] = useState<any[]>([]);

  // New: State to track the currently selected character for viewing details
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  // New: Global state to track the list of characters selected for battle
  const { selectedCharactersForBattle, setSelectedCharactersForBattle } = useGlobalState();

  // Existing: Fetches the list of characters when the component mounts
  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };

    getCharacters();
  }, []);

  // New: Toggles the currently selected character for viewing details
  const onInteractToggle = (id: number) => {
    setSelectedCharacterId((prev) => (prev === id ? null : id));
  };

  const onSelectForBattleToggle = (id: number) => {
    setSelectedCharactersForBattle((prev) => {
      let updatedSelection;
  
      if (prev.some((char) => char.id === id)) {
        // Remove character if already selected
        updatedSelection = prev.filter((char) => char.id !== id);
      } else if (prev.length < 3) {
        // Add character if less than 3 selected
        const selectedChar = characters.find((char) => char.id === id);
        updatedSelection = selectedChar ? [...prev, selectedChar] : prev;
      } else {
        updatedSelection = prev; // No changes if already 3 are selected
      }
  
      // Close character details if this character's ID matches the currently selected one
      if (id === selectedCharacterId) {
        setSelectedCharacterId(null);
      }
  
      // Navigate to HomeScreen if 3 characters are selected
      if (updatedSelection.length === 3) {
        navigation.navigate('HomeScreen');
      }
  
      return updatedSelection;
    });
  };

  return (
    <View style={styles.container}>
      <GOTHeader/>
      {/* New: Conditionally render character details if one is selected */}
      {selectedCharacterId !== null && (
        <GOTCharacterDetails 
          onToggle={onSelectForBattleToggle} // Pass handler for battle selection
          characterId={selectedCharacterId} // Pass the ID of the selected character for details
          charactersSelectedForBattle={selectedCharactersForBattle.map((char) => char.name)} // Pass the list of selected characters for battle
          isSelected={selectedCharactersForBattle.some(
            (char) => char.id === selectedCharacterId
          )} // Indicate if this character is selected for details
        />
      )}
      <Text style={styles.screenTitle}>Characters</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard character={item} onToggle={onInteractToggle} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: nightTheme.background,
  },
  characterDetailsContainer: {
    padding: 10,
    backgroundColor: nightTheme.accent,
    borderRadius: 8,
    marginVertical: 10,
  },
  screenTitle: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "GOT",
    margin: 10,
  },
});

export default WinterfellScreen;
