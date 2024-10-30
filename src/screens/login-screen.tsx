import { StyleSheet, Text, View } from 'react-native';

import { AuthScreensNavigationType } from '../types';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreensNavigationType>();

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
