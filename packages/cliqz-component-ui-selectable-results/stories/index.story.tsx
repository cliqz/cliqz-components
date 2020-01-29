import { storiesOf } from '@storybook/react';
import React from 'react';
import getLogo from 'cliqz-logo-database';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { ResultList, SelectableResult } from '../src/index';
import { Logo } from '@cliqz/component-ui-logo';
import { Result, GenericSnippet, ImageRendererComponent, LogoComponent, openLink, t } from '@cliqz/component-ui-snippet-generic';
import { GENERIC_RESULT_WITH_HISTORY } from '../../cliqz-component-ui-snippet-generic/stories/fixtures';

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
  let nextAction: CallableFunction | undefined
  let previousAction: CallableFunction | undefined;
  let clearAction: CallableFunction | undefined;
  let updateResultsAction: CallableFunction | undefined;

  button('Keyboard: up', () => {
    if (!previousAction) { return }
    previousAction();
  });

  button('Keyboard: down', () => {
    if (!nextAction) { return }
    nextAction();
  });

  button('clear', () => {
    if (!clearAction) { return }
    AllResults = []
    clearAction();
  });

  button('addResult', () => {
    if (!updateResultsAction) { return }
    if (AllResults.length === 0) {
      AllResults = [GENERIC_RESULT_WITH_HISTORY]
    } else {
      AllResults = [
        AllResults[0],
        GENERIC_RESULT_WITH_HISTORY,
        ...AllResults.slice(1)
      ];
    }
    updateResultsAction(AllResults);
  });

  return (
    <View>
      <ResultList results={AllResults}>
        {({ next, previous, clear, selectedResultIndex, results, updateResults }) => {
          nextAction = next;
          previousAction = previous;
          clearAction = clear;
          updateResultsAction = updateResults;
          return (
            <>
              <Text>Currently selected result index: {selectedResultIndex}</Text>
              {results.map((result: any) =>
                <GenericSnippet
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
            </>
          );
        }}
      </ResultList>
    </View>
  );
}

storiesOf('Selectable Results', module).add('with Generic Snippet', () => <ResultListStorybook />);
