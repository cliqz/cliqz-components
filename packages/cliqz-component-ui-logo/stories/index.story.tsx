import { storiesOf } from '@storybook/react';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { Logo } from '../src/index';

const stories = storiesOf('UI Logo', module);

stories.add('in database', () => (
  <div>
    <Logo
      logo={getLogo('https://cliqz.com')}
      size={20}
      borderRadius={2}
      logoSize={20}
    />
    <Logo logo={getLogo('https://google.com')} size={50} />
    <Logo logo={getLogo('https://abcnews.go.com')} size={50} />
    <Logo logo={getLogo('https://duckduckgo.com')} size={50} borderRadius={10} />
    <Logo logo={getLogo('https://notebookcheck.net')} size={50} />
  </div>
));

stories.add('not in database', () => (
  <Logo
    logo={getLogo('https://xyz.com')}
    size={50}
    fontSize={15}
    logoSize={10}
    borderRadius={25}
  />
));
