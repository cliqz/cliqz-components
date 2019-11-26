import { storiesOf } from '@storybook/react';
import React from 'react';
import { Weather } from '../src/index';
import weatherResult from './weather-result';

storiesOf('WeatherSnippet', module).add('default', () => (
  <Weather
    data={weatherResult}
    styles={{
      svgText: {
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, sans-serif',
      },
    }}
  />
));
