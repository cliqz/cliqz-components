import { storiesOf } from '@storybook/react';
import { Logo } from '@cliqz/component-ui-logo';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { GenericSnippet, Result, GenericSnippetStyle } from '../src/index';
import { LogoComponent } from '../src/snippet-icon';
import { ImageRendererComponent, t } from '../src/types';
import { openLink } from '../src/snippet';

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
    },
  ],
};

const t: t = (key: string) => key;

const openLink: openLink = (url) => alert(url);

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
      t={t}
      openLink={openLink}
      styles={styles}
    />
  );
});
