import { storiesOf } from '@storybook/react';
import React from 'react';
import { Logo } from '../src/index';
import getLogo from '../../cliqz-logo-database/src/index';

storiesOf('Logo', module).add('Cliqz', () => (
  <Logo
    logo={getLogo('https://cliqz.com')}
  />
));

storiesOf('Logo', module).add('Google', () => (
  <Logo
    logo={getLogo('https://google.com')}
  />
));
