import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export enum Material {
  Fire = "Fire",
  ValyrianSteel = "ValyrianSteel",
  DragonGlass = "DragonGlass",
}

export enum SwordType {
  Greatsword = "Greatsword",
  Longsword = "Longsword",
  Shortsword = "Shortsword",
}

import { ImageSourcePropType } from 'react-native';

type LightbringerProps = {
  material: Material;
  swordType: SwordType;
  imageUrl: ImageSourcePropType;
};

const Lightbringer: React.FC<LightbringerProps> = ({ material, swordType, imageUrl }) => {

  // Determine overlay color based on material
  const getOverlayColor = () => {
    switch (material) {
      case Material.Fire:
        return 'rgba(255, 69, 0, 0.5)'; // Red for Fire
      case Material.ValyrianSteel:
        return 'rgba(192, 192, 192, 0.5)'; // Silver for Valyrian Steel
      case Material.DragonGlass:
        return 'rgba(0, 0, 255, 0.5)'; // Blue for Dragon Glass
      default:
        return 'rgba(0, 0, 0, 0.5)'; // Default overlay
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Sword Type and Material */}
      <Text style={styles.text}>Sword Type: {swordType}</Text>
      <Text style={styles.text}>Material: {material}</Text>

      {/* Render Sword Image with Color Overlay */}
      <View style={[styles.imageWrapper, { backgroundColor: getOverlayColor() }]}>
        <Image source={imageUrl} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'GOT',
    color: 'white',
    marginVertical: 5,
  },
  imageWrapper: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
  },
  icon: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
});

export default Lightbringer;
