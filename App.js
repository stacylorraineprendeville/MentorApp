import React, { Component } from 'react'
import Login from './src/screens/Login'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import axios from 'axios'
import { multiClientMiddleware } from 'redux-axios-middleware'

import { login, env } from './src/redux/reducer'

const clients = multiClientMiddleware({
  development: {
    client: axios.create({
      baseURL: 'http://localhost:8080',
      responseType: 'json'
    })
  },
  testing: {
    client: axios.create({
      baseURL: 'https://testing.backend.povertystoplight.org',
      responseType: 'json'
    })
  },
  demo: {
    client: axios.create({
      baseURL: 'https://demo.backend.povertystoplight.org',
      responseType: 'json'
    })
  },
  production: {
    client: axios.create({
      baseURL: 'https://platform.backend.povertystoplight.org',
      responseType: 'json'
    })
  }
})

const store = createStore(
  combineReducers({ login, env }),
  applyMiddleware(clients)
)

type Props = {}

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}
