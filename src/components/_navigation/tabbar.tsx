import { Text, TouchableOpacity, View } from 'react-native';

import { MainTabStacks } from '../../types';

interface Props {
  state: any;
  descriptors: any;
  navigation: any;
}

const availableRoutes = [
  MainTabStacks.DashboardStack,
  MainTabStacks.SendStack,
  MainTabStacks.SettingsStack,
];

export const Tabbar: React.FC<Props> = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 60 }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;

        const isVisible = availableRoutes.includes(route.name);

        if (!isVisible) {
          return null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <CustomIcon/> */}
            <Text>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
