import { storiesOf } from '@storybook/react';
import React from 'react';
import { WikiSnippet } from '../src/index';
import { WikiResult } from './wiki-result';

storiesOf('WikiSnippet', module).add('Deutschland', () => (
  <WikiSnippet data={WikiResult} />
));
