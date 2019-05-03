import { storiesOf } from '@storybook/react';
import React from 'react';
import { NewsSnippet } from '../src/index';

storiesOf('NewsSnippet', module)
  .add('with no text', () => <NewsSnippet />)
  .add('with text', () => <NewsSnippet text="xxx" />);
