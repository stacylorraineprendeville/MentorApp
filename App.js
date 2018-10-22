import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { offline } from '@redux-offline/redux-offline'
import { rootReducer } from './src/redux/reducer'
import AppNavigator from './src/components/Navigation'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  offline(offlineConfig)
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
