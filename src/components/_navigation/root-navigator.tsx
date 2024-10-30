import { AppStacks, AuthScreens } from '../../types';
import { AuthStackNavigator, MainStackNavigator } from './_stacks';
import { BackHandler, StyleSheet, View } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useStorageStore, useUserStore } from '../../stores';

import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const navigationRef = useNavigationContainerRef();
  const [isReady, setIsReady] = useState(false);
  const hasHydrated = useStorageStore((state) => state._hasHydrated);

  const authenticated = useUserStore((state) => state.authenticated);

  useEffect(() => {
    // Prevent app closing when navigation history is empty.
    const backAction = () => {
      if (isReady && !navigationRef.canGoBack()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isReady, navigationRef]);

  if (!hasHydrated.user) {
    return (
      <NavigationContainer>
        <View>{/* Some custom splash screen before app is ready */}</View>
      </NavigationContainer>
    );
  }

  // let initialRouteName: any = AuthScreens.Login;
  let initialRouteName: any = AppStacks.MainStack;

  if (authenticated) {
    initialRouteName = AppStacks.MainStack;
  }

  return (
    <NavigationContainer ref={navigationRef} onReady={() => setIsReady(true)}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name={AppStacks.AuthStack}
            component={AuthStackNavigator}
          />
          <Stack.Screen
            name={AppStacks.MainStack}
            component={MainStackNavigator}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
});
