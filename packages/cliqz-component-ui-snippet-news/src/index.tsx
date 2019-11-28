import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 12,
  },
  image: {
    borderRadius: 4,
    flexDirection: 'column',
    height: 100,
    width: 150,
  },
  imageCaption: {
    backgroundColor: 'black',
    bottom: 0,
    padding: 3,
    position: 'absolute',
  },
  imageCaptionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
  },
  itemContainer: {
    borderColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 6,
    borderWidth: 0.5,
    padding: 5,
    width: 160,
  },
  title: {
    color: '#003172',
    fontSize: 15.5,
  },
});

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
}

const NewsItem = ({ item }: { item: NewsItem }) => {
  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={{ uri: item.extra.thumbnail }}
        style={styles.image}
      >
        <View style={styles.imageCaption}>
          <Text style={styles.imageCaptionText}>Vor 1 Stunde</Text>
        </View>
      </ImageBackground>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const Separator = () => {
  return <View style={{ padding: 2 }} />;
};

const extractKey = ({ url }: NewsItem) => {
  return url;
};

export const NewsSnippet = ({ data }: NewsProps) => (
  <View style={styles.container}>
    <FlatList
      data={data.links}
      renderItem={NewsItem}
      horizontal={true}
      ItemSeparatorComponent={Separator}
      keyExtractor={extractKey}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);
