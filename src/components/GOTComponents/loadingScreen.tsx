import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {nightTheme} from '../../constants/colors';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={nightTheme.primary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: nightTheme.accent,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: nightTheme.accent,
  },
});

export default LoadingScreen;