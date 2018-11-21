import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class SocioEconomicQuestion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>the SocioEconomicQuestion component</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
