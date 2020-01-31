import { storiesOf } from '@storybook/react';
import { Logo } from '@cliqz/component-ui-logo';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { ResultList } from '@cliqz/component-ui-selectable-results';
import { GenericSnippet, SnippetStyles } from '../src/index';
import { ImageRendererComponent, t, LogoComponent, openLink } from '../src/types';
import { GENERIC_RESULT as result } from './fixtures';

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
const openLink: openLink = (url) => alert(url);

const styles: Partial<SnippetStyles> = {
  container: {
    backgroundColor: '#aaaaff',
  },
  url: {
    color: 'blue',
  },
  lockBreakColor: {
    color: 'red',
  },
};

storiesOf('Generic Snippet', module).add('default', () => {
  return (
    <ResultList>
      {({ results }) =>
        <GenericSnippet
          result={result}
          LogoComponent={LogoComponent}
          ImageRendererComponent={ImageRendererComponent}
          t={t}
          openLink={openLink}
          styles={styles}
          type="main"
        />
      }
    </ResultList>
  );
});
