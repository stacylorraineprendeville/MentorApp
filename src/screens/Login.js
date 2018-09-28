import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker
} from 'react-native'
import { connect } from 'react-redux'
import { setEnv } from '../redux/reducer'

import { url } from '../config'

import { getItem, setItem } from '../utils'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  onEnvChange = env => {
    this.props.setEnv(env)
  }

  login = (username, password, env) =>
    fetch(
      `${env}/oauth/token?username=${username}&password=${password}&grant_type=password`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic YmFyQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ='
        }
      }
    )
      .then(data => data.json())
      .then(data => setItem('token', data.access_token))
      .catch(err => console.log(err))

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Login</Text>

        <TextInput
          placeholder="username"
          autoCapitalize="none"
          style={styles.input}
          onChangeText={username => this.setState({ username })}
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
            this.login(
              this.state.username,
              this.state.password,
              url[this.props.env]
            )
          }
          title="Login"
        />
        <Button
          title="Surveys"
          onPress={() => this.props.navigation.navigate('Surveys')}
        />
        <Picker selectedValue={this.props.env} onValueChange={this.onEnvChange}>
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

const mapStateToProps = ({ env }) => ({
  env
})

const mapDispatchToProps = {
  setEnv
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
