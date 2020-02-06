export { UniversalViewStyle } from '@cliqz/component-types';

type UpdateSpec<T> = { [P in keyof T]?: T[P] & UpdateSpec<T[P]> };

export function merge<T>(base: T, partial: Partial<UpdateSpec<T>> = {}): T {
  const result: T = { ...base };

  for (const key of Object.keys(partial) as (Array<keyof T>)) {
    const value: T[keyof T] | undefined = partial[key];
    if (value !== undefined) {
      result[key] = { ...result[key], ...value };
    }
  }

  return result;
}
