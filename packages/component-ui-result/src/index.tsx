import React, { FunctionComponent, ClassType } from 'react';
import { Image, Text, View } from 'react-native';

export interface ResultData {
  title: string;
  subResults?: ResultData[];
}

export interface ResultComponentProps {
  result: ResultData;
}

export interface ResultComponent {
  next(): boolean;
  previous(): boolean;
}

interface ResultProps {
  results: ResultData[];
  mapResultToComponent(result: ResultData, ref: React.RefObject<any>): any;
}

export class Result extends React.Component<ResultProps> {

  state = {
    selectedResultIndex: -1,
  }

  resultsRefs: React.RefObject<ResultComponent>[] = []

  onSelected(url: string) {

  }

  next(): boolean {
    const selectedResultIndex = this.state.selectedResultIndex === this.resultsRefs.length ? -1 : this.state.selectedResultIndex;
    for (let i = selectedResultIndex; i < this.resultsRefs.length; i += 1) {
      const result = this.resultsRefs[i];
      if (!result || !result.current) {
        continue;
      }
      if (result.current.next()) {
        if (i !== selectedResultIndex) {
          this.setState({
            selectedResultIndex: i,
          });
        }
        return true;
      }
    }
    this.setState({
      selectedResultIndex: -1,
    });
    return false;
  }

  previous() {
    const selectedResultIndex = this.state.selectedResultIndex === -1 ? this.resultsRefs.length - 1: this.state.selectedResultIndex;
    for (let i = selectedResultIndex; i >= 0; i -= 1) {
      const result = this.resultsRefs[i];
      if (!result || !result.current) {
        continue;
      }
      if (result.current.previous()) {
        if (i !== selectedResultIndex) {
          this.setState({
            selectedResultIndex: i,
          });
        }
        return true;
      }
    }
    this.setState({
      selectedResultIndex: this.resultsRefs.length,
    });
    return false;
  }

  render() {
    this.resultsRefs = this.props.results.map(() => React.createRef());
    const childComponents = this.props.results.map(
      (result, index) => this.props.mapResultToComponent(result, this.resultsRefs[index])
    );

    return (
      <div>
        {childComponents}
      </div>
    );
  }
}