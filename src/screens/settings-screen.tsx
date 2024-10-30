import { StyleSheet, Text, View } from 'react-native';

import { MainScreensNavigationType } from '../types';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<MainScreensNavigationType>();

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
