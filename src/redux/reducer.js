import { combineReducers } from 'redux'

export const SET_ENV = 'SET_ENV'

export const setEnv = env => ({
  type: SET_ENV,
  env
})

export const rootReducer = combineReducers({ env })
