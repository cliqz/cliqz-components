import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    padding: 50,
  },
  text: {
    color: 'black',
  },
});

export const NewsSnippet = ({ text = 'hello' }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);
