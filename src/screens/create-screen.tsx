import { StyleSheet, Text, View } from 'react-native';

import { AuthScreensNavigationType } from '../types';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const CreateScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreensNavigationType>();

  return (
    <View>
      <Text>Create acc</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
