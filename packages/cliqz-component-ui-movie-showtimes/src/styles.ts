import { ViewStyle } from 'react-native';

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

  return baseStyles;
}

export function pickStyle<T, K extends keyof T>(fullStyles: Partial<T>, properties: K[]): Partial<T> {
  const pickedStyles: Partial<T> = {};
  properties.forEach((property) => {
    if (fullStyles[property]) {
      pickedStyles[property] = fullStyles[property];
    }
  });

  return pickedStyles;
}
