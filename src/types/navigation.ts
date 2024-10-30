import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// STACKS

export enum AppStacks {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
}

export enum MainTabStacks {
  DashboardStack = 'DashboardStack',
  SendStack = 'SendStack',
  SettingsStack = 'SettingsStack',
}

// Screens

export enum AuthScreens {
  Login = 'Login',
  Create = 'Create',
}

export enum MainScreens {
  Dashboard = 'Dashboard',
  Send = 'Send',
  Receive = 'Receive',
  Recipients = 'Recipients',
  Settings = 'Settings',
}

export type MainStackParamList = {
  [MainScreens.Dashboard]: undefined;
  [MainScreens.Send]: undefined;
  [MainScreens.Settings]: undefined;
  [MainScreens.Receive]: undefined;
  [MainScreens.Recipients]: undefined;
  [MainTabStacks.DashboardStack]: undefined;
  [MainTabStacks.SendStack]: undefined;
  [MainTabStacks.SettingsStack]: undefined;
};

export type MainScreensNavigationType =
  NativeStackNavigationProp<MainStackParamList>;

export type AuthStackParamList = {
  [AuthScreens.Login]: undefined;
  [AuthScreens.Create]: undefined;
};

export type AuthScreensNavigationType =
  NativeStackNavigationProp<AuthStackParamList>;
