import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { nightTheme } from '../../constants/colors';

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
      <TouchableOpacity style={styles.button} onPress={() => onToggle(character.id)}>
        <Text style={styles.buttonText}>Interact</Text>
      </TouchableOpacity>
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
  button: {
    borderRadius: 5,
    backgroundColor: nightTheme.background,
    padding: 10,
  },
  buttonText: {
    color: nightTheme.highlight,
    fontWeight: 'bold',
    padding: 5,
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