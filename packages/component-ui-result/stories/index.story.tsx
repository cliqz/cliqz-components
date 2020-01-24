import { storiesOf } from '@storybook/react';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { Result, ResultData, ResultComponentProps, ResultComponent } from '../src/index';

const SimpleResult = ({ result, registerResult, selectedIndex }: { result: any, registerResult: any, selectedIndex: any }) => {
  const index = useMemo(registerResult, []);
  return (
    <View style={{ backgroundColor: selectedIndex === index ? 'green' : 'transparent' }}>
      <Text>
        {'simple: ' + result.title + ' ' + index + ' ' + selectedIndex}
      </Text>
    </View>
  )
}

class GenericResult extends React.Component<ResultComponentProps> {
  state = {
    isActive: false,
  }
  index1: number
  index2: number

  constructor(props: ResultComponentProps) {
    super(props);
    this.index1 = props.registerResult();
    this.index2 = props.registerResult();
  }

  render() {
    return (
      <>
        <View style={{ backgroundColor: this.props.selectedIndex === this.index1 ? 'green' : 'transparent' }}>
          <Text>
            {'1: ' + this.props.result.title + ' ' + this.index1 + ' ' + this.props.selectedIndex}
          </Text>
        </View>
        <View style={{ backgroundColor: this.props.selectedIndex === this.index2 ? 'green' : 'transparent' }}>
          <Text>
            {'2: ' + this.props.result.title + ' ' + this.index2 + ' ' + this.props.selectedIndex}
          </Text>
        </View>
        <SimpleResult result={{ title: 'test' }} registerResult={this.props.registerResult} selectedIndex={this.props.selectedIndex} />
      </>
    )
  }
}

const mapResultToComponent = (result: ResultData, selectableResultManager: any) =>
  (result.subResults && result.subResults.length > 0)
    ? <Result
      key={result.title}
    >
      {result.subResults.map(mapResultToComponent)}
    </Result>
    : <GenericResult
      selectedIndex={selectableResultManager.state.selectedResultIndex}
      result={result}
      key={result.title}
      registerResult={selectableResultManager.registerResult}
    />;

const resultRef: React.RefObject<Result> = React.createRef();

button('Keyboard: up', () => {
  const ref = resultRef.current;
  if (ref) {
    ref.previous();
  }
});

button('Keyboard: down', () => {
  const ref = resultRef.current;
  if (ref) {
    ref.next();
  }
});

const results = [
  {
    title: "hello"
  },
  {
    title: "world"
  },
  {
    title: "today"
  }
];

storiesOf('Result', module).add('Results', () => {
  return (
    <div>
      <Result
        ref={resultRef}
      >
        {(selectableResultManager: any) =>
          results.map(r => mapResultToComponent(r, selectableResultManager))
        }
      </Result>
    </div>
  )
});
