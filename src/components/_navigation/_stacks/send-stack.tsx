import { MainScreens } from '../../../types';
import { SendScreen } from '../../../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const SendStack = () => {
  const initialRouteName = MainScreens.Send;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={MainScreens.Send} component={SendScreen} />
    </Stack.Navigator>
  );
};
