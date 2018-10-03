import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { offline } from '@redux-offline/redux-offline'
import { createStackNavigator } from 'react-navigation'
import { rootReducer } from './src/redux/reducer'
import Login from './src/screens/Login'
import Surveys from './src/screens/Surveys'
import Survey from './src/screens/Survey'
import Families from './src/screens/Families'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  offline(offlineConfig)
)

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Surveys: { screen: Surveys },
  Survey: { screen: Survey },
  Families: { screen: Families }
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
