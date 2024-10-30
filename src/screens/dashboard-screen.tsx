import { StyleSheet, Text, View } from 'react-native';

import { MainScreensNavigationType } from '../types/navigation';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<MainScreensNavigationType>();

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
