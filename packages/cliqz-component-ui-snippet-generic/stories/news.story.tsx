import { storiesOf } from '@storybook/react';
import { Logo } from '@cliqz/component-ui-logo';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { ResultList } from '@cliqz/component-ui-selectable-results';
import { NewsSnippet } from '@cliqz/component-ui-snippet-news';
import { GenericSnippet, GenericSnippetStyle, ImageRendererComponent, t, NewsComponent, LogoComponent, openLink} from '../src/index';
import { GENERIC_RESULT_WITH_NEWS as result } from './fixtures';

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
      ListHeader={() => <div style={{ width: 34}}></div>}
      onPress={openLink}
    ></NewsSnippet>
  );
}

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

storiesOf('Generic Snippet', module).add('with news', () => {
  return (
    <ResultList results={[]}>
      {({ results }) =>
        <GenericSnippet
          result={result}
          LogoComponent={LogoComponent}
          ImageRendererComponent={ImageRendererComponent}
          NewsComponent={NewsComponent}
          t={t}
          openLink={openLink}
          styles={styles}
        />
      }
    </ResultList>
  );
});
