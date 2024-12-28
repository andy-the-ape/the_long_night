import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchCharacters } from "../services/fetchCharacters";
import { nightTheme } from "../constants/colors";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import CharacterCard from "../components/GOTComponents/GOTCharacterCard";
import GOTCharacterDetails from "../components/GOTComponents/GOTCharacterDetails";

const WinterfellScreen: React.FC = () => {
  // Existing: State to store the list of characters
  const [characters, setCharacters] = useState<any[]>([]);

  // New: State to track the currently selected character for viewing details
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  // New: State to track the list of characters selected for battle
  const [selectedForBattleIds, setSelectedForBattleIds] = useState<number[]>([]);

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

  // New: Toggles a character's selection for battle, allowing up to 3 characters
  const onSelectForBattleToggle = (id: number) => {
    setSelectedForBattleIds((prev) => {
      if (prev.includes(id)) {
        // Remove the character from the selected list if already selected
        return prev.filter((selectedId) => selectedId !== id);
      } else if (prev.length < 3) {
        // Add the character if less than 3 are selected
        return [...prev, id];
      } else {
        // No changes if already 3 are selected
        return prev;
      }
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
          charactersSelected={selectedForBattleIds} // Pass the list of selected characters for battle
          isSelected={selectedForBattleIds.includes(selectedCharacterId)} // Indicate if this character is selected for details
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
