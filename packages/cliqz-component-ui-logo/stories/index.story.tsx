import { storiesOf } from '@storybook/react';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { Logo } from '../src/index';

storiesOf('Logo', module).add('Cliqz', () => (
  <Logo
    logo={getLogo('https://cliqz.com')}
    size={20}
    borderRadius={2}
    logoSize={20}
  />
));

storiesOf('Logo', module).add('Google', () => (
  <Logo logo={getLogo('https://google.com')} size={50} />
));

storiesOf('Logo', module).add('No Icon round', () => (
  <Logo
    logo={getLogo('https://xyz.com')}
    size={50}
    fontSize={15}
    logoSize={10}
    borderRadius={25}
  />
));
