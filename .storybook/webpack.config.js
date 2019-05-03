const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const {
  override,
  addWebpackAlias,
} = require('customize-cra');


const basePath = path.resolve(__dirname, '../', 'packages');
const packages = readdirSync(basePath).filter((name) =>
  lstatSync(path.join(basePath, name)).isDirectory(),
);

const newConfig = ({ config }) => {
  Object.assign(config.resolve.alias, {
    'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry',
    'react-native': 'react-native-web',
  });
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  });
  config.resolve.extensions.push('.ts', '.tsx');
  Object.assign(config.resolve.alias, {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@taxi/${name}`]: path.join(basePath, name, 'src'),
      }),
      {},
    ),
  });

  return config;
};
module.exports = newConfig;
