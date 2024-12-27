import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { EmptyStatement } from 'typescript';

enum Material {
  Fire = "Fire",
  ValyrianSteel = "ValyrianSteel",
  DragonGlass = "DragonGlass",
}

enum SwordType {
  Greatsword = "Greatsword",
  Longsword = "Longsword",
  Shortsword = "Shortsword",
}

type LightbringerProps = {
  material: Material;
  swordType: SwordType;
};


export const Lightbringer: React.FC<EmptyStatement> = ({}) => {
 
  return (
    <View style={[styles.container]}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default Lightbringer;