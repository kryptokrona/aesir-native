import { DashboardScreen } from '../../../screens';
import { MainScreens } from '../../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const DashboardStack = () => {
  const initialRouteName = MainScreens.Dashboard;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={MainScreens.Dashboard} component={DashboardScreen} />
    </Stack.Navigator>
  );
};
