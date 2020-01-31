import { storiesOf } from '@storybook/react';
import React, { useRef, RefObject, useEffect, useCallback } from 'react';
import getLogo from 'cliqz-logo-database';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { ResultList, ResultListControls, useResults } from '../src/index';
import { Logo } from '@cliqz/component-ui-logo';
import { GenericResult, ImageRendererComponent, LogoComponent, openLink, t } from '@cliqz/component-ui-result-generic';
import { GENERIC_RESULT_WITH_HISTORY } from '../../cliqz-component-ui-result-generic/stories/fixtures';

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

  let [results, updateResults] = useResults(ref, [GENERIC_RESULT_WITH_HISTORY]);

  const addResult = useCallback(() => {
    if (results.length === 0) {
      updateResults([GENERIC_RESULT_WITH_HISTORY])
    } else {
      updateResults([
        ...results,
        GENERIC_RESULT_WITH_HISTORY,
      ])
    }
  }, [results]);
  const clearResults = useCallback(() => {
    updateResults([]);
  }, []);

  useEffect(() => {
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
  }, [results, ref.current]);

  return (
    <View>
      <View>
        <button onClick={addResult} style={{ width: 100, margin: 5}}>Add result</button>
        <button onClick={clearResults} style={{ width: 100, margin: 5 }}>clear</button>
      </View>
      <ResultList ref={ref}>
        {({ selectedResultIndex }) => <>
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

storiesOf('Selectable Results', module).add('with Generic Snippet', () => {
  return <ResultListStorybook />;
});
