import { storiesOf } from '@storybook/react';
import React from 'react';
import getLogo from '../src/logo';

storiesOf('Logo Database', module).add('mozilla.org', () => (
  <div>
    <pre>{JSON.stringify(getLogo('https://cliqz.com/'), null, 2)}</pre>
    <pre>{JSON.stringify(getLogo('https://abcnews.go.com/'), null, 2)}</pre>
    <pre>{JSON.stringify(getLogo('https://notebookcheck.net/'), null, 2)}</pre>
  </div>
));
