export const isSwitchToTab = (result: any) => {
  const type = result.type || '';
  return result.provider === 'tabs' || type.indexOf('switchtab') >= 0;
};
