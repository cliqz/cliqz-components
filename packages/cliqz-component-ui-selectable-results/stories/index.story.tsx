import { storiesOf } from '@storybook/react';
import React from 'react';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { ResultList, SelectableResult } from '../src/index';

const TitleResult = ({ result, title, children }: { result: any, title: string, children?: any }) => {
  return (
    <View>
       <SelectableResult result={result}>
        {({ isActive, index }) =>
          <View style={{ backgroundColor: isActive ? 'green' : 'transparent' }}>
            <Text>{index}: {title}</Text>
          </View>
        }
      </SelectableResult>
      {(result.subResults || []).map((subResult: any) =>
        <TitleResult result={subResult} title={subResult.title as string} />)}
      {children}
    </View>
  );
};

let AllResults = [
  { title: '0', subResults: [{ title: '1' }] },
  { title: '5' },
];

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
    const newResult = { title: `2 ${Math.random()}`, subResults: [
      { title: `3 ${Math.random()}`},
      { title: `4 ${Math.random()}`},
    ]};
    if (AllResults.length === 0) {
      AllResults = [newResult]
    } else {
      AllResults = [
        AllResults[0],
        newResult,
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
                <TitleResult
                  result={result}
                  key={result.title}
                  title={result.title}
                />
              )}
            </>
          );
        }}
      </ResultList>
    </View>
  );
}

storiesOf('Result', module).add('Results', () => <ResultListStorybook />);
