import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface HoverProps {
  onMouseEnter(): any;
  onMouseLeave(): any;
  styles?: any; // TODO: validate this
}

export default class HoverComponent extends React.Component<
  HoverProps,
  {}
  > {
    render() {
    return (
      <div
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={this.props.styles}
      >{this.props.children}</div>
    )
  } 
}
