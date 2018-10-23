import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import SplashScreen from 'react-native-splash-screen'
import { offline } from '@redux-offline/redux-offline'
import { rootReducer } from './src/redux/reducer'
import AppNavigator from './src/components/Navigation'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  offline(offlineConfig)
)

export default class App extends Component {
  componentDidMount() {
    AsyncStorage.setItem('userVisitedDashboard', 'false')
    SplashScreen.hide()
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
