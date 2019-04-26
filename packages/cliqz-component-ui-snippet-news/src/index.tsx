import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    padding: 50,
  },
  text: {
    color: 'black',
  },
});

export default ({ text = 'hello'}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);