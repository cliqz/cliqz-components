import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface ShowTime {
  booking_link: string;
  is_3d: boolean;
  start_at: string;
  subtitle_language: string | null;
}

interface Cinema {
  address: string;
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
  width: number;
  limit: boolean;
}

const CINEMA_LIMIT = 2;

const styles = (width: number = 0) => {
  const isSmallScreen = width < 470;
  const margin = isSmallScreen ? 10 : 32;
  return StyleSheet.create({
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
      maxWidth: 648,
      overflow: 'hidden',
      paddingBottom: 16,
      paddingTop: 16,
    },
    cinemaHeaderContainer: {
      flex: 2,
      marginRight: isSmallScreen ? 0 : 4,
      minWidth: isSmallScreen ? 300 : 268,
    },
    cinemaNameText: {
      color: '#212121',
      fontSize: 16,
    },
    cityContainer: {
      backgroundColor: '#EEEEEE', // TODO: ask alexei
    },
    cityLocationContainer: {
      height: 28,
      justifyContent: 'center',
      marginTop: 6,
      paddingLeft: 5,
      paddingRight: 5,
      width: 147.5,
    },
    cityText: {
      color: '#616161',
      fontSize: 13.5,
    },
    container: {
      marginLeft: margin,
      marginRight: margin,
      paddingTop: 25,
      width: width - 2 * margin,
    },
    locationContainer: {
      alignItems: 'center',
      borderColor: '#2F7D32', // TODO: ask alexei
      borderWidth: 1,
      marginLeft: 5,
    },
    locationText: {
      color: '#2F7D32',
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
      marginTop: 16,
    },
    movieTitleContainer: {
      height: 64,
      justifyContent: 'center',
    },
    showContainer: {
      alignItems: 'center',
      backgroundColor: '#f4f3fa', // TODO: ask Alexei
      borderRadius: 4,
      flexDirection: 'row',
      height: 26,
      marginBottom: 5,
      marginRight: 10,
      marginTop: 5,
      padding: 4,
    },
    showTimesContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      minWidth: isSmallScreen ? 150 : 134,
    },
    showTimesExtraText: {
      color: '#311B92',
      fontSize: 9,
      lineHeight: 10,
    },
    showTimesSeparator: {
      backgroundColor: 'white',
      height: 26,
      marginLeft: 4,
      marginRight: 4,
      width: 0.5,
    },
    showTimesTime: {
      color: '#311B92',
      fontSize: 14,
      lineHeight: 20,
    },
    tableHeadersContainer: {
      flexDirection: 'row',
      height: 32,
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
    width: Dimensions.get('window').width,
  };

  public componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChanged);
  }

  public componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChanged);
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
            style={[styles().cityLocationContainer, styles().cityContainer]}
          >
            <Text style={styles().cityText}>{city}</Text>
          </View>
          {!local && (
            <View
              style={[
                styles().cityLocationContainer,
                styles().locationContainer,
              ]}
            >
              <Text style={styles().locationText}>in meiner nähe</Text>
            </View>
          )}
        </View>
        <View style={styles().movieTitleContainer}>
          <Text style={styles().movieTitle}>{title}</Text>
        </View>
        <View style={styles().tableHeadersContainer}>
          {showdates.map(({ date }, idx) => this.displayDate(date, idx))}
        </View>
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

  private displayCinema(cinema: Cinema) {
    const width = this.state.width;
    return (
      <View key={cinema.address} style={styles().cinemaContainer}>
        {/* link to cinema.website */}
        <View style={styles(width).cinemaHeaderContainer}>
          <Text style={styles().cinemaNameText} numberOfLines={1}>
            {cinema.name}
          </Text>
          <Text style={styles().cinemaAddressText} numberOfLines={1}>
            {cinema.address}
          </Text>
        </View>
        <View style={styles(width).showTimesContainer}>
          {cinema.showtimes.map((showtime: ShowTime) => (
            <View key={showtime.booking_link} style={styles().showContainer}>
              <Text style={styles().showTimesTime}>
                {showtime.start_at.substr(11, 5)}
              </Text>
              {(showtime.is_3d || Boolean(showtime.subtitle_language)) && (
                <View style={styles().showTimesSeparator} />
              )}
              <View>
                {showtime.is_3d && (
                  <Text style={styles().showTimesExtraText}>3D</Text>
                )}
                {Boolean(showtime.subtitle_language) && (
                  <Text style={styles().showTimesExtraText}>
                    {showtime.subtitle_language}
                  </Text>
                )}
              </View>
            </View>
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
