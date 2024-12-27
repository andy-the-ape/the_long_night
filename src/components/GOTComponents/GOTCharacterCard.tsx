import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { nightTheme } from '../../constants/colors';
import GOTButton from './GOTButton';

type CharacterCardProps = {
  character: any;
  onToggle: (id: number) => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onToggle }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.title}>{character.title}</Text>
      </View>
      <GOTButton onPress={() => onToggle(character.id)} title="Interact">
      </GOTButton>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: nightTheme.highlight,
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'GOT',
  },
  title: {
    fontSize: 14,
    fontFamily: 'GOT',
    color: nightTheme.textSecondary,
  },
});

export default CharacterCard;