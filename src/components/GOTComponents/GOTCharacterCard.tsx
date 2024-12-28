import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { nightTheme } from '../../constants/colors';
import GOTButton from './GOTButton'; // New: Replaced TouchableOpacity with reusable GOTButton component

type CharacterCardProps = {
  character: any; // Existing: Prop for character data
  onToggle: (id: number) => void; // Existing: Callback function to handle interaction
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onToggle }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.title}>{character.title}</Text>
      </View>
      {/* New: Replaced the old TouchableOpacity with a reusable GOTButton */}
      <GOTButton 
        onPress={() => onToggle(character.id)} // Calls the interaction handler with the character's ID
        title="Interact" // Button label
      />
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