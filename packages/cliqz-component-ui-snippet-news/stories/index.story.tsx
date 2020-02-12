import { storiesOf } from '@storybook/react';
import React from 'react';
import { NewsSnippet } from '../src/index';
import { NewsResult } from './news-result';

const date2text = (date: Date) => date.toString();
const onPress = ({ url }: { url: string }) => alert(url);
const ListHeader = () => <div style={{ width: 50 }} />;
storiesOf('NewsSnippet', module).add('bild.de', () => (
  <div
    style={{
      backgroundColor: '#ddd',
      width: 500,
    }}
  >
    <NewsSnippet
      data={NewsResult}
      date2text={date2text}
      styles={{
        itemImageCaptionText: {
          color: '#555',
        },
        itemTitle: {
          color: 'black',
        },
      }}
      ListHeader={ListHeader}
      onPress={onPress}
    />
  </div>
));
