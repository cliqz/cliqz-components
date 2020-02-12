import { storiesOf } from '@storybook/react';
import { Logo } from '@cliqz/component-ui-logo';
import getLogo from 'cliqz-logo-database';
import React from 'react';
import { ResultList } from '@cliqz/component-ui-selectable-results';
import { openLink, t, ImageRendererComponent, LogoComponent } from '@cliqz/component-types';
import { GenericResult, GenericResultStyle, } from '../src/index';
import { GENERIC_RESULT_WITH_HISTORY as result } from './fixtures';

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

const styles: Partial<GenericResultStyle> = {
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

storiesOf('Generic Result', module).add('with history', () => {
  return (
    <ResultList>
      {({ results }) =>
        <GenericResult
          result={result}
          LogoComponent={LogoComponent}
          ImageRendererComponent={ImageRendererComponent}
          t={t}
          onPress={openLink}
          styles={styles}
        />
      }
    </ResultList>
  );
});
