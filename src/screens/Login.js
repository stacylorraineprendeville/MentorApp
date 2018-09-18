import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Picker
} from 'react-native'

export default class Login extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} />
        <Button onPress={this.props.onLoginPress} title="Submit" />
        <Picker
          selectedValue={this.props.env}
          onValueChange={itemValue => this.props.onEnvChange(itemValue)}
        >
          <Picker.Item label="Production" value="production" />
          <Picker.Item label="Demo" value="demo" />
          <Picker.Item label="Testing" value="js" />
        </Picker>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    margin: 30,
    fontSize: 30,
    textAlign: 'center',
    padding: 5
  },
  input: { fontSize: 20, textAlign: 'center' }
})
