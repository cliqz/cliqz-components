import { ViewStyle } from 'react-native';

type WebStyles = {
  cursor?: 'pointer' | 'default';
};

export type CliqzViewStyle = ViewStyle & WebStyles;

type UpdateSpec<T> = {[P in keyof T]?: T[P] & UpdateSpec<T[P]>};

export function getStyle<T>(base: T, partial: Partial<UpdateSpec<T>> = {}): T {
  const result: T = {...base};

  for (const key of (Object.keys(partial) as (Array<keyof T>))) {
    const value: T[keyof T] | undefined = partial[key];
    if (value !== undefined) {
      result[key] = { ...result[key], ...value };
    }
  }

  return result;
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
