import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    borderWidth: 0.5,
    marginLeft: 12,
    marginRight: 12,
    padding: 12,
  },
  image: {
    height: 100,
    width: 150,
  },
});

interface WikiItem {
  image: string;
  url: string;
}

interface WikiList {
  links: WikiItem[];
  type: string;
}
interface WikiProps {
  data: WikiList;
}

function renderItem({ item }: { item: WikiItem }) {
  return <Image source={{ uri: item.image }} style={styles.image} />;
}

function _renderSeparator() {
  return <View style={{ padding: 2 }} />;
}

function _keyExtractor({ url }: WikiItem) {
  return url;
}

export const WikiSnippet = ({ data }: WikiProps) => (
  <View style={styles.container}>
    <FlatList
      data={data.links}
      renderItem={renderItem}
      horizontal={true}
      ItemSeparatorComponent={_renderSeparator}
      keyExtractor={_keyExtractor}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);
