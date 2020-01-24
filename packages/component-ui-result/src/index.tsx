import React, { FunctionComponent, ClassType } from 'react';
import { Image, Text, View } from 'react-native';

export interface ResultData {
  title: string;
  subResults?: ResultData[];
}

export interface ResultComponentProps {
  result: ResultData;
  selectedIndex: number;
  registerResult(): number;
}

export interface ResultComponent {
  next(): boolean;
  previous(): boolean;
}

interface ResultProps {
}

export class Result extends React.Component<ResultProps> {
  resultCount = -1

  state = {
    selectedResultIndex: -1,
  }

  resultsRefs: React.RefObject<ResultComponent>[] = []
  registerResult = (): number => {
    this.resultCount += 1
    return this.resultCount;
  }

  next() {
    if (this.state.selectedResultIndex >= this.resultCount) {
      this.setState({
        selectedResultIndex: 0,
      });
      return;
    }
    this.setState({
      selectedResultIndex: this.state.selectedResultIndex + 1,
    })
  }

  previous() {
    if (this.state.selectedResultIndex === 0) {
      this.setState({
        selectedResultIndex: this.resultCount,
      });
      return;
    }
    this.setState({
      selectedResultIndex: this.state.selectedResultIndex - 1,
    })
  }

  render() {
    return (
      <div>
        {typeof this.props.children === "function" ? this.props.children(this) : null}
      </div>
    );
  }
}