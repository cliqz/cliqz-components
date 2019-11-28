export function pickStyle<T, K extends keyof T>(fullStyles: Partial<T>, properties: K[]): Partial<T> {
  const pickedStyles: Partial<T> = {};
  properties.forEach((property) => {
    if (fullStyles[property]) {
      pickedStyles[property] = fullStyles[property];
    }
  });

  return pickedStyles;
}
