import React from 'react';
import {
  Image,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CliqzViewStyle, getStyle } from './styles';

import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

interface Coordinate {
  x: number;
  y: number;
  text: string;
}

interface Unit {
  angle?: number;
  label?: string;
  max?: number;
  min?: number;
  unit: string;
  value?: number;
  values?: number[];
}

interface Column {
  height: number;
  text?: string;
}

interface Hourly {
  precipitation: {
    label: string;
    unit: string;
    values: number[];
  };
  temperature: {
    label: string;
    metric: Unit;
    usc: Unit;
  };
  times: string[];
  wind: {
    angles: number[];
    label: string;
    metric: Unit;
    usc: Unit;
  };
}

interface Selection {
  label: string;
  metric: Unit;
  usc: Unit;
}

interface Day {
  date: string;
  description: string;
  humidity: Unit;
  icon: string;
  precipitation: Unit;
  temperature: Selection;
  uv: Unit;
  weekday: string;
  wind: Selection;
}

interface Forecast {
  day: Day;
  hourly: Hourly;
}

interface WeatherProps {
  data: {
    snippet: {
      extra: {
        api_returned_location: string;
        forecast_v2: {
          alt_unit: string;
          default_unit: string;
          hourly_forecast_url: string;
          units_label: string;
          forecast: Forecast[];
        };
      };
    };
  };

  styles?: Partial<WeatherStyle>;
  moreButtonText?: string;
  lessButtonText?: string;
}

interface WeatherState {
  currentDay: number;
  currentSelection: keyof Day;
  currentUnit: keyof Selection;
  showExtraInfo: boolean;
}

interface OtherInfo {
  precipitation: Unit;
  humidity: Unit;
  wind: Unit;
  uv: Unit;
}

interface Meta {
  height: number;
  max: number;
  min: number;
  width: number;
}

interface ChartData {
  svgTexts: Coordinate[];
  svgLine: string;
  svgArea: string;
}

const primalGrey = '#212121';
const secondaryGrey = '#757575';
const tertiaryGrey = '#9E9E9E';
const lightGrey = '#eee';
const white = '#fff';

interface WeatherStyle {
  activeText: TextStyle;
  container: CliqzViewStyle;
  chartWrapper: CliqzViewStyle;
  dayText: TextStyle;
  dayWrapper: CliqzViewStyle;
  dayWrapperActive: CliqzViewStyle;
  displayInlineWrapper: CliqzViewStyle;
  divider: CliqzViewStyle;
  grid: CliqzViewStyle;
  gridWrapper: CliqzViewStyle;
  gutterBottom: CliqzViewStyle;
  h1: TextStyle;
  h3: TextStyle;
  h5: TextStyle;
  overline: TextStyle;
  headerLeftColumn: CliqzViewStyle;
  moreLessButton: CliqzViewStyle;
  moreLessButtonText: TextStyle;
  moreLessButtonWrapper: CliqzViewStyle;
  noLeftBorder: CliqzViewStyle;
  rightSideInfo: CliqzViewStyle;
  selfCenter: CliqzViewStyle;
  svgText: TextStyle;
  svgWrapper: CliqzViewStyle;
  timelineText: TextStyle;
  timelineWrapper: CliqzViewStyle;
  unitSelectionButtonText: TextStyle;
  windColumn: CliqzViewStyle;
  windColumnContent: TextStyle;
  windText: TextStyle;
  windWrapper: CliqzViewStyle;
}

const baseStyles: WeatherStyle = {
  activeText: {
    color: primalGrey,
  },
  chartWrapper: {
    position: 'relative',
  },
  container: {
    maxWidth: 584,
  },
  dayText: {
    fontSize: 16,
  },
  dayWrapper: {
    alignSelf: 'center',
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
    width: '20%',
  },
  dayWrapperActive: {
    borderColor: tertiaryGrey,
    borderWidth: 1,
  },
  displayInlineWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  divider: {
    backgroundColor: white,
    height: 32,
    justifyContent: 'flex-end',
  },
  grid: {
    borderLeftColor: lightGrey,
    borderLeftWidth: 1,
    height: '100%',
    width: '12.5%',
  },
  gridWrapper: {
    height: '100%',
    paddingBottom: 20,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
  gutterBottom: {
    paddingBottom: 4,
  },
  h1: {
    color: primalGrey,
    fontSize: 40,
  },
  h3: {
    color: secondaryGrey,
    fontSize: 16,
  },
  h5: {
    color: tertiaryGrey,
    fontSize: 11,
    lineHeight: 15,
  },
  headerLeftColumn: {
    flexGrow: 1,
  },
  moreLessButton: {
    alignSelf: 'center',
    height: 65,
    paddingBottom: 24,
    paddingTop: 24,
    width: 100,
  },
  moreLessButtonText: {
    color: secondaryGrey,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  moreLessButtonWrapper: {},
  noLeftBorder: {
    borderLeftWidth: 0,
  },
  overline: {
    color: secondaryGrey,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  rightSideInfo: {
    paddingTop: 9,
  },
  selfCenter: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  svgText: {},
  svgWrapper: {
    height: 100,
  },
  timelineText: {
    color: tertiaryGrey,
    fontSize: 11,
  },
  timelineWrapper: {
    justifyContent: 'space-around',
    marginTop: 32,
    width: '100%',
  },
  unitSelectionButtonText: {
    backgroundColor: lightGrey,
    borderRadius: 3,
    color: primalGrey,
    fontSize: 13.5,
    fontWeight: 'bold',
    marginLeft: 4,
    marginTop: 9.5,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 1,
  },
  windColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '12.5%',
  },
  windColumnContent: {
    alignItems: 'center',
    flexGrow: 1,
  },
  windText: {
    color: tertiaryGrey,
  },
  windWrapper: {
    height: 100,
    marginTop: 20,
    width: '100%',
  },
};

const getCoordinates = (values: number[], labels: number[], meta: Meta) => {
  const { min, max, width, height } = meta;

  const yRatio = (max - min) / height;
  const xRatio = width / values.length;
  const results = values.map((value, i) => ({
    label: labels[i],
    x: xRatio * i - xRatio / 2,
    y: height - (value - min) / yRatio,
  }));
  const fakeResult = {
    label: 0,
    x: width,
    y: height / 2,
  };
  results.push(fakeResult);

  return results;
};

const getChartData = (
  values: number[],
  labels: number[],
  min: number,
  max: number,
  unit: string,
) => {
  const width = 584;
  const height = 80 - 20;

  const meta = {
    height,
    max,
    min,
    width,
  };
  const svgData = getCoordinates(values, labels, meta);
  const svgTexts: Coordinate[] = [];
  let svgLine = '';
  svgData.forEach((coordinate, idx) => {
    if (idx % 3 === 1) {
      svgTexts.push({
        text: `${coordinate.label}${unit}`,
        x: coordinate.x + 2,
        y: coordinate.y - 15,
      });
    }

    const command = idx === 0 ? 'M' : 'L';
    svgLine = `${svgLine} ${command} ${coordinate.x},${coordinate.y}`;
  });
  const svgArea = `${svgLine} L${svgData[svgData.length - 1].x},${height} L${svgData[0].x},${height} z`;

  return {
    svgArea,
    svgLine,
    svgTexts,
  };
};

export class Weather extends React.PureComponent<WeatherProps, WeatherState> {
  public readonly state: WeatherState = {
    currentDay: 0,
    currentSelection: 'temperature',
    currentUnit: this._data.default_unit as keyof Selection,
    showExtraInfo: false,
  };

  public render() {
    const { precipitation, humidity, wind, uv } = this.otherInfo;
    const activeDay = this.days[this.state.currentDay];
    const styles = getStyle(baseStyles, this.props.styles);
    const onDayPressed = (idx: number) => () => this.onDayPressed(idx);

    return (
      <View style={styles.container}>
        <View style={styles.displayInlineWrapper}>
          <View style={styles.headerLeftColumn}>
            <View style={styles.displayInlineWrapper}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: activeDay.icon }}
              />
              <Text style={styles.h1}>
                {(activeDay.temperature as Unit).value}
              </Text>
              <TouchableWithoutFeedback
                onPress={this.onUnitSelectionButtonPressed}
              >
                <View>
                  <Text style={styles.unitSelectionButtonText}>
                    {this.temperatureUnit}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.h3}>{this.location}</Text>
          </View>
          <View style={styles.rightSideInfo}>
            <Text style={styles.h5}>
              {precipitation.label}: {precipitation.value}
              {precipitation.unit},
            </Text>
            <Text style={styles.h5}>
              {humidity.label}: {humidity.value}
              {humidity.unit},
            </Text>
            <Text style={styles.h5}>
              {wind.label}: {wind.value}
              {wind.unit},
            </Text>
            <Text style={styles.h5}>
              {uv.label}: {uv.value}
              {uv.unit}
            </Text>
          </View>
        </View>

        {/* TIME ARRAY */}
        <View style={[styles.displayInlineWrapper, styles.timelineWrapper]}>
          {this.timeArr.map((item: string) => (
            <Text key={item} style={styles.timelineText}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.chartWrapper}>
          {/* TEMPERATURE */}
          {this.displaySvgChart(
            styles,
            this.temperature,
            'grad1',
            'rgba(255, 204, 0, 0.2)',
            '#fc0',
          )}
          {/* PRECIPITATION */}
          {this.state.showExtraInfo && (
            <View>
              <View style={styles.divider}>
                <Text style={[styles.gutterBottom, styles.overline]}>
                  {precipitation.label}
                </Text>
              </View>
              {this.displaySvgChart(
                styles,
                this.precipitation,
                'grad2',
                'rgba(110, 208, 246, 0.2)',
                '#61C3EA',
              )}
              {/* WIND */}
              <View style={styles.divider}>
                <Text style={[styles.gutterBottom, styles.overline]}>
                  {wind.label} ({this.windUnit})
                </Text>
              </View>
              <View style={[styles.displayInlineWrapper, styles.windWrapper]}>
                {this.wind.map((item, idx: number) => (
                  <View key={`${item.value}-${idx}`} style={styles.windColumn}>
                    <View style={styles.windColumnContent}>
                      <Text
                        style={
                          idx === 0
                            ? [
                                styles.gutterBottom,
                                styles.windText,
                                styles.activeText,
                              ]
                            : [styles.gutterBottom, styles.windText]
                        }
                      >
                        {item.value}
                      </Text>
                      <Image
                        source={require('./wind-arrow.png')}
                        style={{
                          height: item.size,
                          transform: [{ rotate: `${item.angle}deg` }],
                          width: item.size,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>

              {/* TIME ARRAY */}
              <View
                style={[
                  styles.displayInlineWrapper,
                  styles.timelineWrapper,
                  { marginTop: 10 },
                ]}
              >
                {this.timeArr.map((item: string) => (
                  <Text key={item} style={styles.timelineText}>
                    {item}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {/* GRID */}
          <View style={[styles.displayInlineWrapper, styles.gridWrapper]}>
            {[...Array(8)].map((item, idx) => (
              <View
                key={`grid-${idx}`}
                style={
                  idx === 0 ? [styles.grid, styles.noLeftBorder] : styles.grid
                }
              />
            ))}
          </View>
        </View>

        <View style={styles.moreLessButtonWrapper}>
          <TouchableWithoutFeedback onPress={this.onMoreLessButtonPressed}>
            <View style={styles.moreLessButton}>
              <Text style={styles.moreLessButtonText}>
                {this.state.showExtraInfo
                  ? this.props.lessButtonText || 'Less'
                  : this.props.moreButtonText || 'More'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.displayInlineWrapper}>
          {this.days.map((day, idx) => (
            <TouchableWithoutFeedback
              key={day.weekday}
              onPress={onDayPressed(idx)}
            >
              <View
                style={
                  day.isActive
                    ? [styles.dayWrapper, styles.dayWrapperActive]
                    : styles.dayWrapper
                }
              >
                <Text style={[styles.selfCenter, styles.dayText]}>
                  {day.weekday}
                </Text>
                <Image
                  style={{
                    alignSelf: 'center',
                    height: 40,
                    justifyContent: 'center',
                    width: 40,
                  }}
                  source={{ uri: day.icon }}
                />
                <View
                  style={[
                    styles.selfCenter,
                    styles.displayInlineWrapper,
                    { marginTop: 4 },
                  ]}
                >
                  <Text style={styles.dayText}>
                    {(day.temperature as Unit).max}&deg;
                  </Text>
                  <Text style={[styles.dayText, { opacity: 0.4 }]}>
                    {' '}
                    {(day.temperature as Unit).min}&deg;
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }

  private get _extra() {
    return this.props.data.snippet.extra || {};
  }

  private get location() {
    return this._extra.api_returned_location;
  }

  private get _data() {
    return this._extra.forecast_v2 || {};
  }

  private get _forecast() {
    return this._data.forecast || [];
  }

  private get days() {
    return this._forecast
      .map(({ day }, idx) => ({
        description: day.description.slice(0, 32),
        icon: day.icon,
        isActive: this.state.currentDay === idx,
        tempIsThreeDigits:
          (day.temperature[this.state.currentUnit] as Unit).value || 0 > 99,
        temperature: day.temperature[this.state.currentUnit],
        weekday: day.weekday.slice(0, 3),
      }))
      .slice(0, 5); // LIMIT to 5 days
  }

  private get _hourly() {
    return (this._forecast[this.state.currentDay] || {}).hourly || {};
  }

  private get timeArr() {
    return (this._hourly.times || [])
      .filter((item: string, idx: number) => idx % 3 === 1)
      .map((item) =>
        item.endsWith('am') || item.endsWith('pm')
          ? item.replace(':00', '')
          : item,
      );
  }

  private get _minMaxTemp() {
    const flattenValues = this._forecast.reduce(
      (acc, curr) => {
        const values: number[] =
          (curr.hourly.temperature[
            this._data.default_unit as keyof Selection
          ] as Unit).values || [];
        return acc.concat(values);
      },
      [] as number[],
    );
    const min = Math.floor(Math.min(...flattenValues) * 0.95);
    const max = Math.ceil(Math.max(...flattenValues) * 1.05);

    return { min, max };
  }

  private get _minMaxPrec() {
    const flattenValues = this._forecast.reduce(
      (acc, curr) => {
        const values: number[] =
          (curr.hourly.precipitation as Unit).values || [];
        return acc.concat(values);
      },
      [] as number[],
    );
    const min = Math.floor(Math.min(...flattenValues) * 0.95);
    const max = Math.ceil(Math.max(...flattenValues) * 1.05);

    return { min, max };
  }

  private get temperatureUnit() {
    return (this._forecast[this.state.currentDay].day.temperature[
      this.state.currentUnit
    ] as Unit).unit;
  }

  private get temperature() {
    const temperature = this._hourly.temperature || {};
    const values = (temperature[
      this._data.default_unit as keyof Selection
    ] as Unit).values;
    if (!values) {
      return {
        svgArea: '',
        svgLine: '',
        svgTexts: [],
      };
    }
    const labels = (temperature[this.state.currentUnit] as Unit).values || [];
    return getChartData(
      values,
      labels,
      this._minMaxTemp.min,
      this._minMaxTemp.max,
      '\u00b0',
    );
  }

  private get precipitation() {
    const precipitation = this._hourly.precipitation || {};
    const values = (precipitation as Unit).values;
    if (!values) {
      return {
        svgArea: '',
        svgLine: '',
        svgTexts: [],
      };
    }
    return getChartData(
      values,
      values,
      this._minMaxPrec.min,
      this._minMaxPrec.max,
      '%',
    );
  }

  private get windUnit() {
    const wind = this._hourly.wind || {};
    const windUnit = (wind[this.state.currentUnit] as Unit).unit;
    return windUnit;
  }

  private get wind() {
    const wind = this._hourly.wind || {};
    const values = (wind[this._data.default_unit as keyof Selection] as Unit)
      .values;
    if (!values) {
      return [];
    }
    const windAngles = wind.angles.map((angle) => angle - 90);
    const windLabels = (wind[this.state.currentUnit] as Unit).values || [];

    const filtered = [];
    for (let i = 0; i < values.length; i += 1) {
      if (i % 3 === 1) {
        const size = Math.min(Math.ceil((0.3 * values[i] + 10) / 4) * 4, 40);
        filtered.push({
          angle: windAngles[i],
          size,
          value: windLabels[i],
        });
      }
    }
    return filtered;
  }

  private get otherInfo(): OtherInfo {
    const currentDay = (this._forecast[this.state.currentDay] || {}).day;

    return {
      humidity: currentDay.humidity,
      precipitation: currentDay.precipitation,
      uv: currentDay.uv,
      wind: {
        label: currentDay.wind.label,
        unit: (currentDay.wind[this.state.currentUnit] as Unit).unit,
        value: (currentDay.wind[this.state.currentUnit] as Unit).value,
      },
    };
  }

  private onDayPressed(idx: number) {
    this.setState({ currentDay: idx });
  }

  private onMoreLessButtonPressed = () => {
    this.setState(({ showExtraInfo }) => ({
      showExtraInfo: !showExtraInfo,
    }));
  };

  private onUnitSelectionButtonPressed = () => {
    this.setState(({ currentUnit }) => ({
      currentUnit: [this._data.default_unit, this._data.alt_unit].filter(
        (x) => x !== currentUnit,
      )[0] as keyof Selection,
    }));
  };

  private displaySvgChart(
    styles: WeatherStyle,
    data: ChartData,
    gradId: string,
    stopColor: string,
    strokeColor: string,
  ) {
    return (
      <View style={styles.svgWrapper}>
        <Svg width="100%" height="100%" viewBox="-12 -33 584 90">
          <Defs>
            <LinearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0" stopColor={stopColor} />
              <Stop offset="1" stopColor="rgb(255,255,255)" />
            </LinearGradient>
          </Defs>
          <Path d={data.svgArea || ''} fill={`url(#${gradId})`} />
          <Path
            d={data.svgLine || ''}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
          />
          {(data.svgTexts || []).map((item: Coordinate, idx: number) => (
            <SvgText
              key={`${item.text}-${idx}`}
              x={item.x}
              y={item.y}
              fill={idx === 0 ? '#000' : tertiaryGrey}
              fontSize={16}
              fontFamily={styles.svgText.fontFamily}
            >
              {item.text}
            </SvgText>
          ))}
        </Svg>
      </View>
    );
  }
}
