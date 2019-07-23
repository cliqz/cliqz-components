import React from 'react';
import {
  Dimensions,
  Image,
  ImageStyle,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ShowTimeComponent, { ShowTime, ShowTimeStyle } from './ShowTime';
import HoverComponent from './Hover';
import { CliqzViewStyle, getStyle, pickStyle } from './styles';

interface Cinema {
  address: string;
  distance?: number;
  name: string;
  showtimes: ShowTime[];
  telephone: string;
  website: string;
}

interface CinemaInfo {
  name: string;
  address: string;
  phonenumber: string;
}

interface Movie {
  showtimes: ShowTime[];
  title: string;
  website: string;
}

interface ShowDate {
  cinema_list?: Cinema[];
  movie_list?: Movie[];
  date: string;
}

interface MovieData {
  city: string;
  showdates: ShowDate[];
  title?: string;
  cinema?: CinemaInfo;
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
  styles?: Partial<MovieStyle> & Partial<ShowTimeStyle>;
}

interface MovieState {
  day: number;
  limit: boolean;
  locationContainerHovered: boolean;
}

const ROW_LIMIT = 2;

type MovieStyle = {
  // Image styles
  cityIcon: ImageStyle;
  // View styles
  buttonsContainer: CliqzViewStyle;
  cinemaAddressContainer: CliqzViewStyle;
  cinemaContainer: CliqzViewStyle;
  cinemaHeaderContainer: CliqzViewStyle;
  cityContainer: CliqzViewStyle;
  cityLocationContainer: CliqzViewStyle;
  container: CliqzViewStyle;
  divider: CliqzViewStyle;
  locationContainer: CliqzViewStyle;
  moreLessButton: CliqzViewStyle;
  movieTitleContainer: CliqzViewStyle;
  showTimesContainer: CliqzViewStyle;
  tableHeadersContainer: CliqzViewStyle;
  // Text styles
  cinemaAddressText: TextStyle;
  cinemaDistanceText: TextStyle;
  cinemaNameText: TextStyle;
  cityText: TextStyle;
  locationText: TextStyle;
  moreLessButtonText: TextStyle;
  movieTitle: TextStyle;
  title: TextStyle;
};

const _baseStyles: MovieStyle = {
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cinemaAddressContainer: {
    flexDirection: 'row',
  },
  cinemaAddressText: {
    color: '#757575',
    fontSize: 13.5,
  },
  cinemaContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 584,
    overflow: 'hidden',
    paddingBottom: 10,
    paddingTop: 10,
  },
  cinemaDistanceText: {
    color: 'rgba(21, 125, 54, 1)',
    fontSize: 13.5,
    paddingRight: 5,
  },
  cinemaHeaderContainer: {
    flexBasis: 240,
    flexGrow: 2,
    flexShrink: 1,
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
    marginLeft: 5,
    marginRight: 5,
    width: 11,
  },
  cityLocationContainer: {
    flexBasis: 0,
    flexGrow: 1,
    height: 32,
    marginTop: 11,
  },
  cityText: {
    color: '#616161',
    fontSize: 13.5,
  },
  container: {
    maxWidth: 584,
  },
  divider: {
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    borderBottomWidth: 1,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  locationContainer: {
    alignItems: 'center',
    borderWidth: 1,
    cursor: 'pointer',
    justifyContent: 'center',
    marginLeft: 5,
  },
  locationText: {
    color: 'rgba(21, 125, 54, 1)',
    fontSize: 13.5,
  },
  moreLessButton: {
    alignItems: 'center',
    height: 42,
    paddingBottom: 12,
    paddingTop: 12,
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
    justifyContent: 'center',
  },
  showTimesContainer: {
    alignItems: 'center',
    flexBasis: 240,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
};

const showTimeStyleProperties: (keyof ShowTimeStyle)[] = [
 'showContainer',
 'showTimesTime',
 'showTimesSeparator',
 'showTimesTime',
];

export class MovieShowtimes extends React.PureComponent<
  MovieProps,
  MovieState
> {
  public readonly state: MovieState = {
    day: 0,
    limit: true,
    locationContainerHovered: false,
  };

  private onLocationFocus = () => {
    this.setState({ locationContainerHovered: true });
  }

  private onLocationBlur = () => {
    this.setState({ locationContainerHovered: false });
  }

  public render() {
    const local = this.props.local;
    const { data } = this.props.data.snippet.extra;
    const { city, showdates } = data;
    const title = data.cinema ? data.cinema.name : data.title;
    const address = data.cinema ? data.cinema.address : '';
    const movieList = showdates[this.state.day].movie_list;
    const cinemaList = showdates[this.state.day].cinema_list;
    const rowCount = (movieList || cinemaList || []).length;

    const styles = getStyle(_baseStyles, this.props.styles);

    // Styles for ShowTimeComponent
    const showTimeStyles =
      pickStyle<MovieStyle & ShowTimeStyle, keyof ShowTimeStyle>(styles, showTimeStyleProperties);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vorstellungen</Text>
        <View style={styles.buttonsContainer}>
          <View
            style={[styles.cityLocationContainer, styles.cityContainer]}
          >
            <Image
              source={local ? require('./geo-icon-green.png') : require('./geo-icon.png')}
              style={styles.cityIcon}
            />
            <Text style={styles.cityText}>{city}</Text>
          </View>
          {!local && (
            <HoverComponent
              styles={{ flexGrow: 1, flexBasis: 0 }}
              onMouseEnter={this.onLocationFocus}
              onMouseLeave={this.onLocationBlur}>
              <View
                style={[
                  styles.cityLocationContainer,
                  styles.locationContainer,
                  { borderColor: this.state.locationContainerHovered ? 'rgba(21, 125, 54, 1)' : 'rgba(21, 125, 54, 0.2)' }
                ]}
              >
                <Text style={styles.locationText} numberOfLines={1}>In meiner Nähe</Text>                
              </View>
            </HoverComponent>
          )}
        </View>

        <View style={styles.movieTitleContainer}>
          <Text style={styles.movieTitle}>{title}</Text>
          <Text style={styles.cinemaAddressText} numberOfLines={2}>
            {address}
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tableHeadersContainer}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {showdates.map(({ date }, idx) => this.displayDate(date, idx))}
          <View style={styles.divider}></View>
        </ScrollView>

        {data.cinema &&
          <View>
            {(movieList || [])
              .slice(0, this.state.limit ? ROW_LIMIT : 100)
              .map((movie) => this.displayMovie(movie, styles, showTimeStyles))}
          </View>
        }
        {!data.cinema &&
          <View>
            {(cinemaList || [])
              .slice(0, this.state.limit ? ROW_LIMIT : 100)
              .map((cinema) => this.displayCinema(cinema, styles, showTimeStyles))}
          </View>
        }

        {rowCount > ROW_LIMIT && (
          <TouchableWithoutFeedback onPress={this.onMoreLessButtonPressed}>
            <View style={styles.moreLessButton}>
              <Text style={styles.moreLessButtonText}>
                {this.state.limit ? 'More' : 'Less'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }

  private onMoreLessButtonPressed = () => {
    this.setState(({ limit }) => ({
      limit: !limit,
    }));
  };

  private formatDistance = (meters: number) => {
    if (meters < 1000) { return `${Math.floor(meters)} m`; };
    return `${Math.floor(meters / 100) / 10} km`;
  }

  private displayMovie(movie: Movie, styles: MovieStyle, showTimeStyles: Partial<ShowTimeStyle>) {
    return (
      <View key={movie.title} style={styles.cinemaContainer}>
        <View style={styles.cinemaHeaderContainer}>
          <Text style={styles.cinemaNameText} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
        <View style={styles.showTimesContainer}>
          {movie.showtimes.map((showtime: ShowTime) => (
            <ShowTimeComponent key={showtime.booking_link} data={showtime} styles={showTimeStyles} />
          ))}
        </View>
      </View>
    );
  }

  private displayCinema(cinema: Cinema, styles: MovieStyle, showTimeStyles: Partial<ShowTimeStyle>) {
    return (
      <View key={cinema.address} style={styles.cinemaContainer}>
        {/* link to cinema.website */}
        <View style={styles.cinemaHeaderContainer}>
          <Text style={styles.cinemaNameText} numberOfLines={2}>
            {cinema.name}
          </Text>
          <View style={styles.cinemaAddressContainer}>
            {this.props.local && cinema.distance && (
              <Text style={styles.cinemaDistanceText} numberOfLines={1}>
                {this.formatDistance(cinema.distance)}
              </Text>
            )}
            <Text style={styles.cinemaAddressText} numberOfLines={2}>
              {cinema.address}
            </Text>
          </View>
        </View>
        <View style={styles.showTimesContainer}>
          {cinema.showtimes.map((showtime: ShowTime) => (
            <ShowTimeComponent key={showtime.booking_link} data={showtime} styles={showTimeStyles} />
          ))}
        </View>
      </View>
    );
  }

  private displayDate(date: string, idx: number) {
    const isActive = idx === this.state.day;
    const boxStyle: StyleProp<CliqzViewStyle> = {
      alignItems: 'center',
      borderBottomWidth: isActive ? 2 : 0,
      borderColor: isActive ? '#2979FF' : 'transparent',
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
