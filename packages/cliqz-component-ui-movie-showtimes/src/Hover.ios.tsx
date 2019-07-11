import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface HoverProps {
  children?: any;
}
export default class HoverComponent extends React.Component<
  HoverProps,
  {}
  > {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View>{this.props.children}</View>
    )
  }
}