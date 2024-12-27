import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchCharacterById } from '../../services/fetchCharacters';
import { nightTheme } from '../../constants/colors';

type CharacterDetailsProps = {
  characterId?: number;
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ characterId }) => {
  const [character, setCharacter] = useState<any | null>(null);

  useEffect(() => {
    const getCharacter = async () => {
      if (characterId !== undefined) {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      }
    };

    getCharacter();
  }, [characterId]);

  if (!character) {
    return <View/>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <Text style={styles.characterName}>{character.fullName}</Text>
      <Text style={styles.characterTitle}>{character.title}</Text>
      <Text style={styles.characterId}>ID: {character.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
    backgroundColor: nightTheme.background,
    borderRadius: 8, 
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  characterName: {
    fontSize: 24,
    fontFamily: 'GOT',
    color: nightTheme.primary,
  },
  characterTitle: {
    fontSize: 18,
    fontFamily: 'GOT',
    color: nightTheme.textSecondary,
  },
  characterFamily: {
    fontSize: 18,
    fontFamily: 'GOT',
    color: nightTheme.textSecondary,
  },
  characterId: {
    fontSize: 16,
    fontFamily: 'GOT',
    color: nightTheme.accent,
  },
});

export default CharacterDetails;