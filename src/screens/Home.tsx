import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export const Home = () => {
  return(
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal'
  },
  navigation: {
    flex: 2,
    backgroundColor: 'orange'
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  footer: {
    flex: 1,
    backgroundColor: 'cyan'
  }
})