import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import HoverComponent from './Hover';

const showTimesStyles = (active: boolean) => StyleSheet.create({
  showContainer: {
    backgroundColor: active ? '#311B92' : 'rgba(49, 27, 146, 0.05)',
    borderRadius: 4,
    cursor: 'pointer',
    height: 26,
    marginBottom: 7,
    marginRight: 15,
    marginTop: 7,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
  },
  showTimesExtraText: {
    color: active ? 'white' : '#311B92',
    fontSize: 9,
    lineHeight: 10,
  },
  showTimesSeparator: {
    backgroundColor: 'white',
    height: 26,
    marginLeft: 4,
    marginRight: 4,
    width: 1,
  },
  showTimesTime: {
    color: active ? 'white' : '#311B92',
    fontSize: 14,
    lineHeight: 20,
  },
});

interface ShowTimeProps {
  data: ShowTime;
}

export interface ShowTime {
  booking_link: string;
  is_3d: boolean;
  start_at: string;
  subtitle_language: string | null;
}

export default class ShowTimeComponent extends React.Component<
  ShowTimeProps,
  { isActive: boolean;}
> {

  public state = {
    isActive: false,
  }

  private onShowTimeFocus = () => {
    this.setState({ isActive: true });
  }

  private onShowTimeBlur = () => {
    this.setState({ isActive: false });
  }

  render() {
    const data = this.props.data;
    return (
      <HoverComponent onMouseEnter={this.onShowTimeFocus} onMouseLeave={this.onShowTimeBlur}>
        <View style={showTimesStyles(this.state.isActive).showContainer}>
          <Text style={showTimesStyles(this.state.isActive).showTimesTime}>
            {data.start_at.substr(11, 5)}
          </Text>
          {(data.is_3d || Boolean(data.subtitle_language)) && (
            <View style={showTimesStyles(this.state.isActive).showTimesSeparator} />
          )}
          <View>
            {data.is_3d && (
              <Text style={showTimesStyles(this.state.isActive).showTimesExtraText}>3D</Text>
            )}
            {Boolean(data.subtitle_language) && (
              <Text style={showTimesStyles(this.state.isActive).showTimesExtraText}>
                {data.subtitle_language}
              </Text>
            )}
          </View>
        </View>
      </HoverComponent>
    )
  }
}