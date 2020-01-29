import { storiesOf } from '@storybook/react';
import { Logo } from '@cliqz/component-ui-logo';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { View, Text } from 'react-native';
import { NewsSnippet } from '@cliqz/component-ui-snippet-news';
import { GenericSnippet, Result, GenericSnippetStyle } from '../src/index';
import { LogoComponent } from '../src/snippet-icon';
import { ImageRendererComponent, t, NewsComponent } from '../src/types';
import { openLink } from '../src/snippet';
import { NewsResult } from '../../cliqz-component-ui-snippet-news/stories/news-result';

const ImageRendererComponent: ImageRendererComponent = ({ }) => {
  return (
    <img src=""/>
  );
}

const LogoComponent: LogoComponent = ({ url, size }) => {
  return (
    <Logo
      logo={getLogo(url)}
      size={size}
      borderRadius={10}
      logoSize={size}
    />
  );
};

const t: t = (key: string) => key;
const date2text = (date: Date) => date.toString();
const openLink: openLink = (url) => alert(url);

const NewsComponent: NewsComponent = ({ news }) => {
  return (
    <NewsSnippet
      data={news}
      date2text={date2text}
      styles={{
        itemImageCaptionText: {
          color: '#555',
        },
        itemTitle: {
          color: 'black',
        },
      }}
      ListHeader={() => <div></div>}
      onPress={openLink}
    ></NewsSnippet>
  );
}

const result: Result = {
  title: "example",
  url: "https://example.com",
  description: "Lorem ipsum",
  friendlyUrl: "example.com",
  provider: "cliqz",
  type: "main",
  urls: [
    {
      title: "example",
      url: "https://example.com",
      description: "Lorem ipsum",
      friendlyUrl: "example.com",
      provider: "cliqz",
      type: "main",
      data: {},
    },
  ],
  data: {
    deepResults: [
      NewsResult,
    ],
  },
};

const styles: Partial<GenericSnippetStyle> = {
  container: {
    backgroundColor: '#ffdddd',
  },
  mainSnippetStyle: {
    url: {
      color: 'blue',
    },
    lockBreakColor: {
      color: 'red',
    },
  },
  urlsSnippetStyle: {
    url: {
      color: 'green'
    },
  },
};

storiesOf('Generic Snippet', module).add('default view', () => {
  return (
    <GenericSnippet
      result={result}
      LogoComponent={LogoComponent}
      ImageRendererComponent={ImageRendererComponent}
      NewsComponent={NewsComponent}
      t={t}
      openLink={openLink}
      styles={styles}
    />
  );
});
