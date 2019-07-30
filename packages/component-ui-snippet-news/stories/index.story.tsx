import { storiesOf } from '@storybook/react';
import React from 'react';
import { NewsSnippet } from '../src/index';
import { NewsResult } from './news-result';

storiesOf('NewsSnippet', module).add('bild.de', () => (
  <NewsSnippet data={NewsResult} />
));
