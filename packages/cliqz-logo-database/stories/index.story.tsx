import { storiesOf } from '@storybook/react';
import React from 'react';
import getLogo from '../src/logo';

storiesOf('logo database', module).add('mozilla.org', () => (
  <pre>{JSON.stringify(getLogo('https://cliqz.com/'), null, 2)}</pre>
));
