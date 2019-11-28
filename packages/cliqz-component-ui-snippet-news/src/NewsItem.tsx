import { UniversalViewStyle } from '@cliqz/component-styles';
import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export interface NewsItemStyles {
  itemContainer: UniversalViewStyle;
  itemImageCaptionText: TextStyle;
  itemImage: ImageStyle;
  itemTitle: TextStyle;
}

export type Date2Text = (date: Date) => string;
export type OnPress = (url: string) => void;

interface NewsItemProps {
  title: string;
  thumbnail: string;
  styles: NewsItemStyles;
  publishedAt: number;
  date2text: Date2Text;
  onPress: OnPress;
  url: string;
}

export const styles: NewsItemStyles = {
  itemContainer: {
    marginLeft: 8,
    width: 192,
  },
  itemImage: {
    flexDirection: 'column',
    height: 100,
    marginBottom: 8,
    width: 192,
  },
  itemImageCaptionText: {
    color: '#9e9e9e',
    fontSize: 10,
  },
  itemTitle: {
    marginBottom: 5,
  },
};

export const NewsItem = ({
  title,
  thumbnail,
  publishedAt,
  styles: classes,
  date2text,
  onPress,
  url,
}: NewsItemProps) => {
  const date = useMemo(() => date2text(new Date(publishedAt * 1000)), [
    date2text,
    publishedAt,
  ]);
  const onPressCall = useCallback(() => onPress(url), [onPress]);
  return (
    <TouchableWithoutFeedback onPress={onPressCall}>
      <View style={classes.itemContainer}>
        <Image source={{ uri: thumbnail }} style={classes.itemImage} />
        <Text style={classes.itemTitle}>{title}</Text>
        <Text style={classes.itemImageCaptionText}>{date}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
