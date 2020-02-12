import { merge, UniversalViewStyle } from '@cliqz/component-styles';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { openLink } from '@cliqz/component-types';
import {
  Date2Text,
  NewsItem,
  NewsItemStyles,
  styles as newsItemStyles,
} from './NewsItem';

interface NewsSnippetStyle extends NewsItemStyles {
  container: UniversalViewStyle;
  list: UniversalViewStyle;
  separator: UniversalViewStyle;
}

export const styles: NewsSnippetStyle = {
  ...newsItemStyles,
  container: {},
  list: {},
  separator: {
    padding: 6,
  },
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
  onPress: openLink;
  ListSeparator?: FunctionComponent;
  ListHeader?: FunctionComponent;
  ListFooter?: FunctionComponent;
}

const Separator = ({ style: style }: { style: UniversalViewStyle }) => {
  return <View style={style} />;
};

const extractKey = ({ url }: NewsItem) => {
  return url;
};

const renderItem = ({
  item,
  styles: itemStyles,
  date2text,
  onPress,
  type,
}: {
  item: NewsItem;
  styles: NewsItemStyles;
  date2text: Date2Text;
  onPress: openLink;
  type: string;
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
      type={type}
    />
  );
};

export const NewsSnippet = ({
  data,
  styles: stylesOverwrite,
  date2text,
  onPress,
  ListSeparator,
  ListHeader,
  ListFooter,
}: NewsProps) => {
  const classes: NewsSnippetStyle = useMemo(
    () => StyleSheet.create(merge(styles, stylesOverwrite)),
    [merge, stylesOverwrite],
  );
  const renderItemCall = useCallback(
    ({ item }) => renderItem({ item, styles: classes, date2text, onPress, type: data.type }),
    [renderItem, classes, onPress],
  );
  const separator = useCallback(() => Separator({ style: classes.separator }), [
    classes,
  ]);
  return (
    <View style={classes.container}>
      <FlatList
        data={data.links}
        renderItem={renderItemCall}
        horizontal={true}
        ListHeaderComponent={ListHeader || separator}
        ListFooterComponent={ListFooter || separator}
        ItemSeparatorComponent={ListSeparator || separator}
        keyExtractor={extractKey}
        style={classes.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
