import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchCharacters } from "../services/fetchCharacters";
import { nightTheme } from "../constants/colors";
import GOTHeader from "../components/GOTComponents/GOTHeader";
import CharacterCard from "../components/GOTComponents/GOTCharacterCard";
import GOTCharacterDetails from "../components/GOTComponents/GOTCharacterDetails";

const WinterfellScreen: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [selectedForBattleIds, setSelectedForBattleIds] = useState<number[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };

    getCharacters();
  }, []);

  const onInteractToggle = (id: number) => {
    setSelectedCharacterId((prev) => (prev === id ? null : id));
  };

  const onSelectForBattleToggle = (id: number) => {
    setSelectedForBattleIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      } else {
        return prev;
      }
    });
  };

  return (
    <View style={styles.container}>
      <GOTHeader/>
      {selectedCharacterId !== null && (
        <GOTCharacterDetails 
        onToggle={onSelectForBattleToggle} 
        characterId={selectedCharacterId}
        charactersSelected={selectedForBattleIds} 
        isSelected={selectedForBattleIds.includes(selectedCharacterId)} />
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
