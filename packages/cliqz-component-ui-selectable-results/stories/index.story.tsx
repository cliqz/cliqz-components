import { storiesOf } from '@storybook/react';
import React, { useRef, RefObject, useEffect } from 'react';
import getLogo from 'cliqz-logo-database';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { ResultList, ResultListControls } from '../src/index';
import { Logo } from '@cliqz/component-ui-logo';
import { Result, GenericResult, ImageRendererComponent, LogoComponent, openLink, t } from '@cliqz/component-ui-result-generic';
import { GENERIC_RESULT_WITH_HISTORY } from '../../cliqz-component-ui-result-generic/stories/fixtures';

let AllResults: Result[] = [
  GENERIC_RESULT_WITH_HISTORY,
];

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

const ResultListStorybook = () => {
  let ref: RefObject<ResultListControls> = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.updateResults(AllResults);
    }
  }, []);

  button('Keyboard: up', () => {
    if (ref.current) {
      ref.current.previous();
    }
  });

  button('Keyboard: down', () => {
    if (ref.current) {
      ref.current.next();
    }
  });

  button('clear', () => {
    AllResults = []
    if (ref.current) {
      ref.current.clear();
    }
  });

  button('addResult', () => {
    if (AllResults.length === 0) {
      AllResults = [GENERIC_RESULT_WITH_HISTORY]
    } else {
      AllResults = [
        AllResults[0],
        GENERIC_RESULT_WITH_HISTORY,
        ...AllResults.slice(1)
      ];
    }
    if (ref.current) {
      ref.current.updateResults(AllResults);
    }
  });

  return (
    <View>
      <ResultList ref={ref}>
        {({ selectedResultIndex, results }) => <>
          <Text>Currently selected result index: {selectedResultIndex}</Text>
          {results.map((result: any) =>
            <GenericResult
              result={result}
              key={result.title}
              ImageRendererComponent={ImageRendererComponent}
              LogoComponent={LogoComponent}
              openLink={openLink}
              isUrlsSelecable={false}
              styles={{
                mainSnippetStyle: {
                  containerSelected: {
                    backgroundColor: 'red'
                  }
                }
              }}
              t={t}
            />
          )}
        </>}
      </ResultList>
    </View>
  );
}

storiesOf('Selectable Results', module).add('with Generic Snippet', () => <ResultListStorybook />);
