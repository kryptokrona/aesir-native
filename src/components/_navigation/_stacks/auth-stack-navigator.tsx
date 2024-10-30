import { AuthScreens, AuthStackParamList } from '../../../types';
import { CreateScreen, LoginScreen } from '../../../screens';

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name={AuthScreens.CustomSplash}
        component={SplashScreen}
        options={() => ({
          header: () => null,
        })}
      /> */}

      <Stack.Screen
        name={AuthScreens.Login}
        component={LoginScreen}
        options={() => ({
          header: () => null,
        })}
      />

      <Stack.Screen
        name={AuthScreens.Create}
        component={CreateScreen}
        options={() => ({
          header: () => null,
        })}
      />
    </Stack.Navigator>
  );
};
