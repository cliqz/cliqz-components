import { storiesOf } from '@storybook/react';
import React from 'react';
import { NewsSnippet } from '../src/index';
import { NewsResult } from './news-result';

const date2text = (date: Date) => date.toString();
const onPress = (url: string) => alert(url);

storiesOf('NewsSnippet', module).add('bild.de', () => (
  <NewsSnippet
    data={NewsResult}
    date2text={date2text}
    styles={{
      itemTitle: {
        color: 'black',
      },
    }}
    onPress={onPress}
  />
));
