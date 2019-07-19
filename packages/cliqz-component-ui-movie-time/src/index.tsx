import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TimeInfo {
  expression: string;
  time: string;
  tz_info: string;
}

interface TimeZone {
  cities: string[];
  time_info: TimeInfo
}

interface MainTime {
  expression: string;
  location: string;
  mapped_location: string;
  time: string;
  tz_info: string;
}

interface TimeProps {
  data: {
    snippet: {
      extra: {
        time_data: {
          cities_by_tz: null | TimeZone[];
          main: MainTime;
        }
      }
    }
  };
}

const styles = StyleSheet.create({
  cityText: {
    color: '#424242',
    fontSize: 13.5,
    fontWeight: '400',
  },
  container: {
    maxWidth: 584,
  },
  mainInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  timeLocationContainer: {
    flexBasis: 320,
    flexGrow: 2,
    flexShrink: 1,
    marginRight: 10,
  },
  timestampContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 50,
  },
  timestampText: {
    color: '#9E9E9E',
    fontSize: 11,
    fontWeight: '400',
  },
  timeText: {
    color: '#212121',
    fontSize: 29,
    fontWeight: '400',
  },
  timeZone: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 54,
    width: 120,
  },
  timeZoneCity: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '400',
  },
  timeZoneTime: {
    color: '#212121',
    fontSize: 14,
    fontWeight: '400',
  },
  timeZoneTZ: {
    color: '#9E9E9E',
    fontSize: 11,
    fontWeight: '400',
  },
  timeZonesContainer: {
    borderColor: 'rgba(0, 0, 0, 0.04)',
    borderTopWidth: 1,
    height: 90,
  },
})

export class Time extends React.PureComponent <
  TimeProps
>{

  private displayCity(timeZone: TimeZone) {
    return (
      <View key={timeZone.time_info.tz_info} style={styles.timeZone}>
        <Text style={styles.timeZoneTime}>{timeZone.time_info.time}</Text>
        <Text style={styles.timeZoneCity}>{timeZone.cities[0]}</Text>
        <Text style={styles.timeZoneTZ}>{timeZone.time_info.tz_info}</Text>
      </View>
    );
  }
  public render() {
    const { main, cities_by_tz} = this.props.data.snippet.extra.time_data;
    return (
      <View style={styles.container}>
        <View style={styles.mainInfoContainer}>
          <View style={styles.timeLocationContainer}>
            <Text style={styles.timeText} numberOfLines={1}>{main.time}</Text>
            <Text style={styles.cityText} numberOfLines={2}>{main.mapped_location}</Text>
          </View>
          <View style={styles.timestampContainer}>
              <Text style={styles.timestampText}>{main.expression}</Text>
              <Text style={styles.timestampText}>{main.tz_info.split(' ')[0]}</Text>
            <Text style={styles.timestampText}>{`${main.tz_info.split(' ')[1]} ${main.tz_info.split(' ')[2]}`}</Text>
          </View>
        </View>

        {cities_by_tz && (
          <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.timeZonesContainer}
          >
            {cities_by_tz.map(timeZone => this.displayCity(timeZone))}
          </ScrollView>
        )}
      </View>
  )}
}
       