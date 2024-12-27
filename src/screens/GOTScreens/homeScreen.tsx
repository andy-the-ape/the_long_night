import React from 'react';
import { View, StyleSheet } from 'react-native';
import GOTHeader from '../../components/GOTComponents/GOTHeader';
import GOTButton from '../../components/GOTComponents/GOTButton';
import { useNavigation } from '@react-navigation/native';
import { nightTheme } from '../../constants/colors';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <GOTHeader/>
      <View style={styles.body}>
        <GOTButton
          title="The Forge"
          onPress={() => navigation.navigate('ForgeScreen')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <GOTButton
          title="To Winterfell"
          onPress={() => navigation.navigate('WinterfellScreen')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <GOTButton
          title="To Battle"
          onPress={() => navigation.navigate('BattleScreen')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: nightTheme.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: nightTheme.highlight,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'GOT',
    fontSize: 18,
  },
});

export default HomeScreen;
