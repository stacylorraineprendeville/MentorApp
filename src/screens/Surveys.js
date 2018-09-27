import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Surveys extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Surveys go here!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
