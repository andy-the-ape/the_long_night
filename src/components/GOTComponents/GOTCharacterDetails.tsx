import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { fetchCharacterById } from "../../services/fetchCharacters";
import { nightTheme } from "../../constants/colors";
import GOTButton from "./GOTButton";

type CharacterDetailsProps = {
  characterId?: number;
  onToggle: (id: number) => void;
  isSelected: boolean;
  charactersSelected: number[];
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  characterId,
  onToggle,
  isSelected,
  charactersSelected,
}) => {
  const [character, setCharacter] = useState<any | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<any[]>([]);

  useEffect(() => {
    const getCharacter = async () => {
      if (characterId !== undefined) {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      }
    };
    getCharacter();
  }, [characterId]);

  useEffect(() => {
    const getSelectedCharacters = async () => {
      const selectedData = await Promise.all(
        charactersSelected.map((id) => fetchCharacterById(id))
      );
      setSelectedCharacters(selectedData);
    };
    getSelectedCharacters();
  }, [charactersSelected]);

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
