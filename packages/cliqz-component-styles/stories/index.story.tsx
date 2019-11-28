import { storiesOf } from '@storybook/react';
import React from 'react';

const mergeExample = `
  const base = {
    container: {
      margin: 2,
    },
    text: {
      color: 'black',
    },
  };

  const customization = {
    container: {
      margin: 5,
    },
  };

  merge(base, customization);
  // {
  //   container: {
  //     margin: 5,
  //   },
  //   text: {
  //     color: 'black',
  //   },
  // };
`;

storiesOf('Styles', module).add('merge', () => (
  <div>
    <h1>merge</h1>
    <pre>{mergeExample}</pre>
  </div>
));
