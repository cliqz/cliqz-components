import { UniversalViewStyle } from '@cliqz/component-styles';
import React, { useMemo } from 'react';
import { TextStyle, View } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

export interface Coordinate {
  x: number;
  y: number;
  text: string;
}

interface ChartData {
  svgTexts: Coordinate[];
  svgLine: string;
  svgArea: string;
}

export interface GradientStyle {
  startColor: string;
  stopColor: string;
}

export interface StrokeStyle {
  color: string;
  width: string;
}

export interface SVGTextStyle extends TextStyle {
  activeColor: string;
}

export interface SVGChartStyles {
  svgGradient: GradientStyle;
  svgStroke: StrokeStyle;
  svgText: SVGTextStyle;
  svgWrapper: UniversalViewStyle;
}

export const styles: SVGChartStyles = {
  svgGradient: {
    startColor: 'red',
    stopColor: 'blue',
  },
  svgStroke: {
    color: 'black',
    width: '3',
  },
  svgText: {
    activeColor: '#000',
    color: 'blue',
    fontSize: 16,
  },
  svgWrapper: {
    height: 100,
  },
};

interface SVGChartProps {
  data: ChartData;
  styles: SVGChartStyles;
}

export default function SVGChart({ data, styles: classes }: SVGChartProps) {
  const gradId = useMemo(() => String(Math.floor(Math.random() * 100000)), []);
  return (
    <View style={classes.svgWrapper}>
      <Svg width="100%" height="100%" viewBox="-12 -33 584 90">
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={classes.svgGradient.stopColor} />
            <Stop offset="1" stopColor={classes.svgGradient.startColor} />
          </LinearGradient>
        </Defs>
        <Path d={data.svgArea || ''} fill={`url(#${gradId})`} />
        <Path
          d={data.svgLine || ''}
          fill="none"
          stroke={classes.svgStroke.color}
          strokeWidth={classes.svgStroke.width}
        />
        {(data.svgTexts || []).map((item: Coordinate, idx: number) => (
          <SvgText
            key={`${item.text}-${idx}`}
            x={item.x}
            y={item.y}
            fill={
              idx === 0 ? classes.svgText.activeColor : classes.svgText.color
            }
            fontSize={classes.svgText.fontSize}
            fontFamily={classes.svgText.fontFamily}
          >
            {item.text}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
