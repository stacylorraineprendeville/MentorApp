import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { offline } from '@redux-offline/redux-offline'
import { rootReducer } from './reducer'

let rehydrated = false

export const getHydrationState = () => rehydrated

export default createStore(
  rootReducer,
  applyMiddleware(thunk),
  offline({
    ...offlineConfig,
    persistCallback: () => {
      rehydrated = true
    }
  })
)
