# Cliqz Components

A cross platform components library for React, targetting react-native and react-native-web.

## Start development

Install dependencies with `npm ci`

Start development server (storybook) `npm run storybook`

## Project structure

All componentes are independant node modules and are kept under `packages` folder. Managing those components is orchestrated with [lerna](https://github.com/lerna/lerna)


## Test on mobile

There is an example Expo project to test the react-native integration.
Go to `examples/expo`, install depnencies with `npm ci` and start  development server with `npm start`.

But to get it running you need to first build all the packages with `npm run build`