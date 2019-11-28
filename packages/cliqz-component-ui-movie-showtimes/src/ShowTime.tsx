import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import React from 'react';
import {
  Text,
  TextStyle,
  View,
} from 'react-native';

import HoverComponent from './Hover';

export type ShowTimeStyle = {
  // View styles
  showContainer: UniversalViewStyle;
  showTimesSeparator: UniversalViewStyle;
  // Text styles
  showTimesExtraText: TextStyle;
  showTimesTime: TextStyle;
};

const _baseStyles = (active: boolean): ShowTimeStyle => ({
  showContainer: {
    backgroundColor: active ? '#311B92' : 'rgba(49, 27, 146, 0.05)',
    borderRadius: 4,
    cursor: 'pointer',
    height: 26,
    marginBottom: 4,
    marginRight: 15,
    marginTop: 4,
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
  styles?: Partial<ShowTimeStyle>;
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
    const styles = merge(_baseStyles(this.state.isActive), this.props.styles);
    return (
      <HoverComponent onMouseEnter={this.onShowTimeFocus} onMouseLeave={this.onShowTimeBlur}>
        <View style={styles.showContainer}>
          <Text style={styles.showTimesTime}>
            {data.start_at.substr(11, 5)}
          </Text>
          {(data.is_3d || Boolean(data.subtitle_language)) && (
            <View style={styles.showTimesSeparator} />
          )}
          <View>
            {data.is_3d && (
              <Text style={styles.showTimesExtraText}>3D</Text>
            )}
            {Boolean(data.subtitle_language) && (
              <Text style={styles.showTimesExtraText}>
                {data.subtitle_language}
              </Text>
            )}
          </View>
        </View>
      </HoverComponent>
    )
  }
}