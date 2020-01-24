import { storiesOf } from '@storybook/react';
import React from 'react';
import { View, Text } from 'react-native';
import { button } from "@storybook/addon-knobs";
import { Result, ResultData, ResultComponentProps, ResultComponent } from '../src/index';


class GenericResult extends React.Component<ResultComponentProps> implements ResultComponent {
  state = {
    isActive: false,
  }

  next(): boolean {
    if (!this.state.isActive) {
      this.setState({
        isActive: true,
      });
      return true;
    }
    this.setState({
      isActive: false,
    });
    return false;
  }

  previous(): boolean {
    return this.next();
  }

  render() {
    return (
      <View style={{ backgroundColor: this.state.isActive ? 'green' : 'transparent' }}>
        <Text>
          {this.props.result.title}
        </Text>
      </View>
    )
  }
}

const mapResultToComponent = (result: ResultData, ref: React.RefObject<any>) =>
  (result.subResults && result.subResults.length > 0)
    ? <Result
      results={result.subResults}
      ref={ref}
      key={result.title}
      mapResultToComponent={mapResultToComponent}
    />
    : <GenericResult
      result={result}
      ref={ref}
      key={result.title}
    />;



const resultRef: React.RefObject<Result> = React.createRef();

button('Keyboard: up', () => {
  const ref = resultRef.current;
  if (ref) {
    if (!ref.previous()) {
      ref.previous();
    }
  }
});

button('Keyboard: down', () => {
  const ref = resultRef.current;
  if (ref) {
    if (!ref.next()) {
      ref.next();
    }
  }
});

storiesOf('Result', module).add('Results', () => {
  return (
    <div>
      <Result
        ref={resultRef}
        results={[
          {
            title: "hello"
          }, {
            title: "world",
            subResults: [
              {
                title: "one"
              },
              {
                title: "two"
              },
              {
                title: "end",
                subResults: [
                  { title: "alpha" },
                  { title: "omega" },
                ]
              }
            ],
          }, {
            title: "today"
          }
        ]}
        mapResultToComponent={mapResultToComponent}
      />
    </div>
  )
});
