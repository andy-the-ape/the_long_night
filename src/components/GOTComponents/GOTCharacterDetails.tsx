import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { fetchCharacterById } from "../../services/fetchCharacters";
import { nightTheme } from "../../constants/colors";
import GOTButton from "./GOTButton";

type CharacterDetailsProps = {
  characterId?: number; // Existing: Prop for the currently viewed character ID
  onToggle: (id: number) => void; // New: Callback function to handle selecting/deselecting a character
  isSelected: boolean; // New: Flag to indicate if the character is selected
  charactersSelected: number[]; // New: List of IDs for currently selected characters
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  characterId,
  onToggle,
  isSelected,
  charactersSelected,
}) => {
  // Existing: State to store data for the currently viewed character
  const [character, setCharacter] = useState<any | null>(null);

  // New: State to store the details of all selected characters
  const [selectedCharacters, setSelectedCharacters] = useState<any[]>([]);

  // Existing: Fetches data for the currently viewed character
  useEffect(() => {
    const getCharacter = async () => {
      if (characterId !== undefined) {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      }
    };
    getCharacter();
  }, [characterId]);

  // New: Fetches data for all currently selected characters
  useEffect(() => {
    const getSelectedCharacters = async () => {
      const selectedData = await Promise.all(
        charactersSelected.map((id) => fetchCharacterById(id))
      );
      setSelectedCharacters(selectedData);
    };
    getSelectedCharacters();
  }, [charactersSelected]);

  // Existing: Renders an empty view if no character is loaded
  if (!character) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <Text style={styles.characterName}>{character.fullName}</Text>
      <Text style={styles.characterTitle}>{character.title}</Text>
      <Text style={styles.characterFamily}>{character.family}</Text>
      <Text style={styles.characterId}>ID: {character.id}</Text>
      <View style={styles.buttonContainer}>
        <GOTButton
          onPress={() => onToggle(character.id)}
          title={isSelected ? "Deselect" : "Select for Battle"}
        />
        <Text style={styles.buttonContainer}>
          {charactersSelected.length} Characters selected:
        </Text>
        <FlatList
          data={selectedCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.listText} >* {item.fullName}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: nightTheme.background,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "GOT",
    color: nightTheme.textSecondary,
  },
  listText: {
    fontSize: 14,
    fontFamily: "GOT",
    color: nightTheme.primary,
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  characterName: {
    fontSize: 24,
    fontFamily: "GOT",
    color: nightTheme.primary,
  },
  characterTitle: {
    fontSize: 18,
    fontFamily: "GOT",
    color: nightTheme.textSecondary,
  },
  characterFamily: {
    fontSize: 18,
    fontFamily: "GOT",
    color: nightTheme.textSecondary,
  },
  characterId: {
    fontSize: 16,
    fontFamily: "GOT",
    color: nightTheme.accent,
  },
});

export default CharacterDetails;
