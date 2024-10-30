import { MainStackParamList, MainTabStacks } from '../../../types';

import { DashboardStack } from './dashboard-stack';
import { SendStack } from './send-stack';
import { SettingsStack } from './settings-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStackNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={(props) => <MyCustomTabbar {...props} />}
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Tab.Screen
        name={MainTabStacks.DashboardStack}
        component={DashboardStack}
        // options={getHeaderOptions()}
      />
      <Tab.Screen
        name={MainTabStacks.SendStack}
        component={SendStack}
        // options={getHeaderOptions()}
      />
      <Tab.Screen
        name={MainTabStacks.SettingsStack}
        component={SettingsStack}
        // options={getHeaderOptions()}
      />
    </Tab.Navigator>
  );
};
