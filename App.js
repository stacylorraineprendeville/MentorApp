import React, { Component } from 'react'
import Login from './src/screens/Login'
import Secure from './src/screens/Secure'

type Props = {}

export default class App extends Component<Props> {
  state = {
    isLoggedIn: false,
    env: 'production'
  }

  render() {
    if (this.state.isLoggedIn)
      return (
        <Secure onLogoutPress={() => this.setState({ isLoggedIn: false })} />
      )
    else
      return (
        <Login
          env={this.state.env}
          onEnvChange={env => this.setState({ env })}
          onLoginPress={() => this.setState({ isLoggedIn: true })}
        />
      )
  }
}
