import { MainScreens } from '../../../types';
import { SettingsScreen } from '../../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
  const initialRouteName = MainScreens.Settings;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={MainScreens.Settings} component={SettingsScreen} />
    </Stack.Navigator>
  );
};
