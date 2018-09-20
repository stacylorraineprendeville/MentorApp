import React, { Component } from 'react'
import Login from './src/screens/Login'
import Secure from './src/screens/Secure'
import { authEndpoint } from './config.json'

type Props = {}

export default class App extends Component<Props> {
  state = {
    isLoggedIn: false,
    token: '',
    env: 'development'
  }

  login = (username, password) => {
    fetch(
      `${
        authEndpoint[this.state.env]
      }?username=${username}&password=${password}&grant_type=password`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic YmFyQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ='
        }
      }
    )
      .then(data =>
        this.setState({ token: JSON.parse(data._bodyInit).access_token })
      )
      .catch(err => err)
  }

  render() {
    console.log(this.state.token)
    if (this.state.isLoggedIn)
      return (
        <Secure onLogoutPress={() => this.setState({ isLoggedIn: false })} />
      )
    else
      return (
        <Login
          env={this.state.env}
          onEnvChange={env => this.setState({ env })}
          onLoginPress={this.login}
        />
      )
  }
}
