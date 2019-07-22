import { StyleSheet, ViewStyle } from 'react-native';

type WebStyles = {
  cursor?: 'pointer' | 'default';
};

export type CliqzViewStyle = ViewStyle & WebStyles;

export function getStyle<T>(baseStyles: T, styleOverwrites: Partial<T> | undefined): T {
  if (styleOverwrites) {
    for (const key of Object.keys(styleOverwrites)) {
      // @ts-ignore
      baseStyles[key] = { ...baseStyles[key], ...styleOverwrites[key] };
    }
  }

  return StyleSheet.create(baseStyles);
}
