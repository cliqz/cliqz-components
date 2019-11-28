import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Date2Text,
  NewsItem,
  NewsItemStyles,
  OnPress,
  styles as newsItemStyles,
} from './NewsItem';

interface NewsSnippetStyle extends NewsItemStyles {
  container: UniversalViewStyle;
}

export const styles: NewsSnippetStyle = {
  container: {},
  ...newsItemStyles,
};

interface NewsItem {
  extra: {
    creation_timestamp: number;
    domain?: string;
    thumbnail: string;
    breaking?: boolean;
    description?: string;
    media?: string;
    murl?: string;
  };
  title: string;
  url: string;
}

export interface NewsDeepResult {
  links: NewsItem[];
  type: 'news' | 'top-news';
}

interface NewsProps {
  data: NewsDeepResult;
  styles?: Partial<NewsSnippetStyle>;
  date2text: Date2Text;
  onPress: OnPress;
}

const Separator = () => {
  return <View style={{ padding: 2 }} />;
};

const extractKey = ({ url }: NewsItem) => {
  return url;
};

const renderItem = ({
  item,
  styles: itemStyles,
  date2text,
  onPress,
}: {
  item: NewsItem;
  styles: NewsItemStyles;
  date2text: Date2Text;
  onPress: OnPress;
}) => {
  return (
    <NewsItem
      title={item.title}
      thumbnail={item.extra.thumbnail}
      styles={itemStyles}
      publishedAt={item.extra.creation_timestamp}
      date2text={date2text}
      url={item.url}
      onPress={onPress}
    />
  );
};

export const NewsSnippet = ({
  data,
  styles: stylesOverwrite,
  date2text,
  onPress,
}: NewsProps) => {
  const classes: NewsSnippetStyle = useMemo(
    () => StyleSheet.create(merge(styles, stylesOverwrite)),
    [merge, stylesOverwrite],
  );
  const renderItemCall = useCallback(
    ({ item }) => renderItem({ item, styles: classes, date2text, onPress }),
    [renderItem, classes, onPress],
  );
  return (
    <View style={classes.container}>
      <FlatList
        data={data.links}
        renderItem={renderItemCall}
        horizontal={true}
        ItemSeparatorComponent={Separator}
        keyExtractor={extractKey}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
