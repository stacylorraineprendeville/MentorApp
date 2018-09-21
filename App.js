import React, { Component } from 'react'
import Login from './src/screens/Login'
import Secure from './src/screens/Secure'
import { authEndpoint } from './config.json'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import reducer from './src/redux/reducer'

const client = axios.create({
  baseURL: authEndpoint['development'],
  responseType: 'json'
})

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)))

type Props = {}

export default class App extends Component<Props> {
  state = {
    isLoggedIn: false,
    env: 'development'
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.isLoggedIn ? (
          <Secure onLogoutPress={() => this.setState({ isLoggedIn: false })} />
        ) : (
          <Login
            env={this.state.env}
            onEnvChange={env => this.setState({ env })}
            onLoginPress={this.login}
          />
        )}
      </Provider>
    )
  }
}
