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
  state = {
    username: '',
    password: ''
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          placeholder="username"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={username =>
            this.setState({ username: username.toLowerCase() })
          }
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="password"
          style={styles.input}
          onChangeText={password => this.setState({ password })}
        />
        <Button
          onPress={() =>
            this.props.onLoginPress(this.state.username, this.state.password)
          }
          title="Submit"
        />
        <Picker
          selectedValue={this.props.env}
          onValueChange={itemValue => this.props.onEnvChange(itemValue)}
        >
          <Picker.Item label="Production" value="production" />
          <Picker.Item label="Demo" value="demo" />
          <Picker.Item label="Testing" value="testing" />
          <Picker.Item label="Development" value="development" selectedValue />
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
