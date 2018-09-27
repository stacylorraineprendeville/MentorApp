import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { createStackNavigator } from 'react-navigation'

import { rootReducer } from './src/redux/reducer'
import Login from './src/screens/Login'
import Surveys from './src/screens/Surveys'

const store = createStore(rootReducer, offline(offlineConfig))

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Surveys: { screen: Surveys }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
