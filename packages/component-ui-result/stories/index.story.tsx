import { storiesOf } from '@storybook/react';
import React from 'react';
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

storiesOf('Result', module).add('Results', () => {
  let nextAction: CallableFunction | undefined
  let previousAction: CallableFunction | undefined;

  button('Keyboard: up', () => {
    if (!previousAction) { return }
    previousAction();
  });

  button('Keyboard: down', () => {
    if (!nextAction) { return }
    nextAction();
  });

  return (
    <View>
      <ResultList>
        {({ next, previous, selectedResultIndex }) => {
          nextAction = next;
          previousAction = previous;
          return (
            <>
              <Text>Currently selected result index: {selectedResultIndex}</Text>
              <TitleResult title="Hello">
                <TitleResult title="sub 1" />
                <TitleResult title="sub 2" />
              </TitleResult>
              <TitleResult title="World" />
            </>
          );
        }}
      </ResultList>
    </View>
  );
});
