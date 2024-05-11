import { StyleSheet, View } from 'react-native';

import { useGlobalStore } from '@/services';
// import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<Props> = ({ children }) => {
  const { theme } = useGlobalStore();
  const backgroundColor = theme.backgroundAccent;

  function itemMapper(item: React.ReactNode, index: number) {
    return (
      <View style={styles.divider} key={index}>
        {item}
      </View>
    );
  }

  const isArray = Array.isArray(children);

  return (
    children && (
      <View style={[styles.container, { backgroundColor }]}>
        {isArray && children.map(itemMapper)}
        {!isArray && children}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    padding: 12,
  },
  divider: {
    marginBottom: 12,
  },
});
