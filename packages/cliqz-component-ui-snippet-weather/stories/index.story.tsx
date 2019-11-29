import { storiesOf } from '@storybook/react';
import React from 'react';
import { ImageRenderer, Weather } from '../src/index';
import weatherResult from './weather-result';

const ImageRenderer: ImageRenderer = ({ uri, height, width }) => {
  return <img src={uri} style={{ height, width }} />;
};

storiesOf('WeatherSnippet', module).add('default', () => (
  <Weather
    data={weatherResult}
    ImageRenderer={ImageRenderer}
    styles={{
      svgText: {
        activeColor: 'black',
        color: 'gray',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif',
      },
    }}
  />
));
