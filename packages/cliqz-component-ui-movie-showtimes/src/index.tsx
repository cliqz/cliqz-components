import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import ShowTimeComponent, { ShowTime } from './ShowTime';
import HoverComponent from './Hover';

interface Cinema {
  address: string;
  distance?: number;
  name: string;
  showtimes: ShowTime[];
  telephone: string;
  website: string;
}

interface ShowDate {
  cinema_list: Cinema[];
  date: string;
}

interface MovieData {
  city: string;
  showdates: ShowDate[];
  title: string;
}

interface MovieSnippet {
  extra: {
    data: MovieData;
    no_location: boolean;
  };
}

interface MovieProps {
  data: {
    snippet: MovieSnippet;
  };
  local: boolean;
}

interface MovieState {
  day: number;
  limit: boolean;
  locationContainerHovered: boolean;
  width: number;
}

const CINEMA_LIMIT = 2;

const styles = (width: number = 0, active: boolean = false) => {
  const isSmallScreen = width < 480;
  return StyleSheet.create({
    cinemaAddressContainer: {
      flexDirection: 'row',
    },
    cinemaAddressText: {
      color: '#757575',
      fontSize: 13.5,
    },
    cinemaContainer: {
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'rgba(0, 0, 0, 0.04)',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: 584,
      overflow: 'hidden',
      paddingBottom: 16,
      paddingTop: 16,
    },
    cinemaDistanceText: {
      color: 'rgba(21, 125, 54, 1)',
      fontSize: 13.5,
      paddingRight: 5,
    },
    cinemaHeaderContainer: {
      flex: 2,
      minWidth: 320,
    },
    cinemaNameText: {
      color: '#212121',
      fontSize: 16,
    },
    cityContainer: {
      alignItems: 'center',
      backgroundColor: '#EEEEEE', // TODO: ask alexei
      flexDirection: 'row',
    },
    cityIcon: {
      height: 15,
      marginRight: 5,
      width: 11,
    },
    cityLocationContainer: {
      height: 32,
      marginTop: 11,
      paddingLeft: 5,
      paddingRight: 5,
      width: isSmallScreen ? (width - 5) / 2 : 147.5,
    },
    cityText: {
      color: '#616161',
      fontSize: 13.5,
    },
    container: {
      width,
    },
    locationContainer: {
      alignItems: 'center',
      borderColor: active ? 'rgba(21, 125, 54, 1)' : 'rgba(21, 125, 54, 0.2)',
      borderWidth: 1,
      justifyContent: 'center',
      marginLeft: 5,
    },
    locationText: {
      color: 'rgba(21, 125, 54, 1)',
      fontSize: 13.5,
    },
    moreLessButton: {
      alignItems: isSmallScreen ? 'center' : 'flex-start',
      height: 51,
      paddingBottom: 16,
      paddingTop: 16,
    },
    moreLessButtonText: {
      color: '#757575',
      fontSize: 14,
      fontWeight: '500',
      textTransform: 'uppercase',
    },
    movieTitle: {
      color: '#212121',
      fontSize: 19.5,
      marginTop: 11,
    },
    movieTitleContainer: {
      height: 46,
      justifyContent: 'center',
    },
    showTimesContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      minWidth: 160,
    },
    tableHeadersContainer: {
      flexDirection: 'row',
      height: 40, // TODO: fix scrollview in react-native web library
      overflow: 'hidden',
    },
    title: {
      color: '#757575',
      fontSize: 19.5,
      fontWeight: '400',
    },
  });
};

export class MovieShowtimes extends React.PureComponent<
  MovieProps,
  MovieState
> {
  public readonly state: MovieState = {
    day: 0,
    limit: true,
    locationContainerHovered: false,
    width: Dimensions.get('window').width,
  };

  public componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChanged);
  }

  public componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChanged);
  }

  private onLocationFocus = () => {
    this.setState({ locationContainerHovered: true });
  }

  private onLocationBlur = () => {
    this.setState({ locationContainerHovered: false });
  }

  public render() {
    const local = this.props.local;
    const { data } = this.props.data.snippet.extra;
    const { city, showdates, title } = data;
    const cinemaCount = showdates[this.state.day].cinema_list.length;
    const width = this.state.width;
    return (
      <View style={styles(width).container}>
        <Text style={styles().title}>Vorstellungen</Text>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[styles(width).cityLocationContainer, styles().cityContainer]}
          >
            <Image
              source={local ? require('./geo-icon-green.png') : require('./geo-icon.png')}
              style={styles().cityIcon}
            />
            <Text style={styles().cityText}>{city}</Text>
          </View>
          {!local && (
            <HoverComponent onMouseEnter={this.onLocationFocus} onMouseLeave={this.onLocationBlur}>
              <View
                style={[
                  styles(width).cityLocationContainer,
                  styles(0, this.state.locationContainerHovered).locationContainer
                ]}
              >
                <Text style={styles().locationText}>In meiner Nähe</Text>
              </View>
            </HoverComponent>
          )}
        </View>

        <View style={styles().movieTitleContainer}>
          <Text style={styles().movieTitle}>{title}</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles().tableHeadersContainer}
        >
          {showdates.map(({ date }, idx) => this.displayDate(date, idx))}
        </ScrollView>

        <View>
          {showdates[this.state.day].cinema_list
            .slice(0, this.state.limit ? CINEMA_LIMIT : 100)
            .map((cinema) => this.displayCinema(cinema))}
        </View>

        {cinemaCount > CINEMA_LIMIT && (
          <TouchableWithoutFeedback onPress={this.onMoreLessButtonPressed}>
            <View style={styles(width).moreLessButton}>
              <Text style={styles().moreLessButtonText}>
                {this.state.limit ? 'More' : 'Less'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }

  private onDimensionsChanged = ({ window }: any) => {
    this.setState({ width: window.width });
  };

  private onMoreLessButtonPressed = () => {
    this.setState(({ limit }) => ({
      limit: !limit,
    }));
  };

  private formatDistance = (meters: number) => {
    if (meters < 1000) { return `${Math.floor(meters)} m`; };
    return `${Math.floor(meters / 100) / 10} km`;
  }

  private displayCinema(cinema: Cinema) {
    const width = this.state.width;
    return (
      <View key={cinema.address} style={styles().cinemaContainer}>
        {/* link to cinema.website */}
        <View style={styles(width).cinemaHeaderContainer}>
          <Text style={styles().cinemaNameText} numberOfLines={1}>
            {cinema.name}
          </Text>
          <View style={styles().cinemaAddressContainer}>
            {this.props.local && cinema.distance && (
              <Text style={styles().cinemaDistanceText} numberOfLines={1}>
                {this.formatDistance(cinema.distance)}
              </Text>
            )}
            <Text style={styles().cinemaAddressText} numberOfLines={1}>
              {cinema.address}
            </Text>
          </View>
        </View>
        <View style={styles(width).showTimesContainer}>
          {cinema.showtimes.map((showtime: ShowTime) => (
            <ShowTimeComponent key={showtime.booking_link} data={showtime} />
          ))}
        </View>
      </View>
    );
  }

  private displayDate(date: string, idx: number) {
    const isActive = idx === this.state.day;
    const boxStyle: StyleProp<ViewStyle> = {
      alignItems: 'center',
      borderBottomWidth: isActive ? 2.5 : 0.5,
      borderColor: isActive ? '#2979FF' : 'rgba(0, 0, 0, 0.04)',
      justifyContent: 'flex-end',
      marginBottom: isActive ? 0 : 1,
      padding: 5,
      paddingBottom: isActive ? 5 : 6,
      width: 100,
    };
    const textStyle: StyleProp<TextStyle> = {
      color: isActive ? '#2979FF' : '#757575',
      fontSize: 11,
      fontWeight: '500',
      textTransform: 'uppercase',
    };
    return (
      <TouchableWithoutFeedback
        key={date}
        // tslint:disable-next-line: jsx-no-lambda
        onPress={() => this.setState({ day: idx })}
      >
        <View style={boxStyle}>
          <Text style={textStyle}>{date}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
