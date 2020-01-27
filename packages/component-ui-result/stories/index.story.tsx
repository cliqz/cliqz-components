import { storiesOf } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { ResultList, SelectableResult } from '../src/index';

const TitleResult = ({ title, children }: { title: string, children?: any }) => {
  return (
    <View>
       <SelectableResult>
        {({ isActive, index }) =>
          <View style={{ backgroundColor: isActive ? 'green' : 'transparent' }}>
            <Text>{index}: {title}</Text>
          </View>
        }
      </SelectableResult>
      {children}
    </View>
  );
};

let AllResults = [
  { title: 'hello' },
  { title: 'world' },
];

const ResultListStorybook = () => {
  let nextAction: CallableFunction | undefined
  let previousAction: CallableFunction | undefined;
  let clearAction: CallableFunction | undefined;
  const [results, setResults] = useState(AllResults);

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
    clearAction();
  });

  useEffect(() => {
    button('addResult', () => {

      AllResults = [
        AllResults[0],
        { title: `New result ${Math.random()}` },
        ...AllResults.slice(1)
      ]
      setResults(AllResults)
    })
  }, []);

  return (
    <View>
      <ResultList>
        {({ next, previous, clear, selectedResultIndex }) => {
          nextAction = next;
          previousAction = previous;
          clearAction = clear;
          return (
            <>
              <Text>Currently selected result index: {selectedResultIndex}</Text>
              {results.map(result =>
                <TitleResult key={result.title} title={result.title} />
              )}
            </>
          );
        }}
      </ResultList>
    </View>
  );
}

storiesOf('Result', module).add('Results', () => <ResultListStorybook />);
