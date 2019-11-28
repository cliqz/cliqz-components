import { UniversalViewStyle } from '@cliqz/component-styles';
import React, { useMemo } from 'react';
import {
  ImageBackground,
  ImageStyle,
  Text,
  TextStyle,
  View,
} from 'react-native';

export interface NewsItemStyles {
  itemContainer: UniversalViewStyle;
  itemImageCaption: UniversalViewStyle;
  itemImageCaptionText: TextStyle;
  itemImage: ImageStyle;
  itemTitle: TextStyle;
}

export type Date2Text = (date: Date) => string;

interface NewsItemProps {
  title: string;
  thumbnail: string;
  styles: NewsItemStyles;
  publishedAt: number;
  date2text: Date2Text;
}

export const styles: NewsItemStyles = {
  itemContainer: {
    borderColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 5,
    width: 160,
  },
  itemImage: {
    borderRadius: 4,
    flexDirection: 'column',
    height: 100,
    width: 150,
  },
  itemImageCaption: {
    backgroundColor: 'black',
    bottom: 0,
    padding: 3,
    position: 'absolute',
  },
  itemImageCaptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
  },
  itemTitle: {
    color: '#003172',
    fontSize: 15.5,
  },
};

export const NewsItem = ({
  title,
  thumbnail,
  publishedAt,
  styles: classes,
  date2text,
}: NewsItemProps) => {
  const date = useMemo(() => date2text(new Date(publishedAt * 1000)), [
    date2text,
    publishedAt,
  ]);
  return (
    <View style={classes.itemContainer}>
      <ImageBackground source={{ uri: thumbnail }} style={classes.itemImage}>
        <View style={classes.itemImageCaption}>
          <Text style={classes.itemImageCaptionText}>{date}</Text>
        </View>
      </ImageBackground>
      <Text style={classes.itemTitle}>{title}</Text>
    </View>
  );
};
