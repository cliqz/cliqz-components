import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NewsSnippet } from '@cliqz/cliqz-component-ui-snippet-news';
import { NewsResult } from '@cliqz/cliqz-component-ui-snippet-news/stories/news-result';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NewsSnippet data={NewsResult} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
