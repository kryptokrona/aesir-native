import { AuthNavigator, MainNavigator } from './_stacks';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { MainScreens, Stacks } from '@/config';
import React, { useEffect } from 'react';
import {
  useAppStoreState,
  useGlobalStore,
  usePreferencesStore,
  useUserStore
} from '@/services';

import { Linking } from 'react-native';
import { RootStackParamList } from '@/types';
import { SplashScreen } from '@/screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      [Stacks.MainStack]: {
        screens: {
          [MainScreens.AddGroupScreen]: ':name/:roomKey',
        },
      },
    },
  },
  prefixes: ['xkr://'],
};

export const RootNavigator = () => {
  const hydrated = useAppStoreState((state) => state._hasHydrated);
  const authenticated = useGlobalStore((state) => state.authenticated);
  const user = useUserStore((state) => state.user);
  const authMethod = usePreferencesStore(
    (state) => state.preferences?.authMethod,
  );
  useEffect(() => {
    const handleDeepLink = (e: { url: string }) => {
      // console.log('Linking', e.url); // TODO
    };

    Linking.addEventListener('url', handleDeepLink);
  }, []);

  if (!hydrated.preferences || !hydrated.user || !hydrated.theme) {
    return (
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  }

  let initialRouteName = Stacks.AuthStack;
  if (
    authenticated &&
    authMethod &&
    user?.address &&
    user.address.length >= 64
  ) {
    initialRouteName = Stacks.MainStack;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={Stacks.AuthStack}
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Stacks.MainStack}
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
