import { combineReducers } from 'redux'

export const SET_ENV = 'SET_ENV'

export const env = (state = 'development', action) => {
  switch (action.type) {
    case SET_ENV:
      return action.env
    default:
      return state
  }
}

export const setEnv = env => ({
  type: SET_ENV,
  env
})

export const rootReducer = combineReducers({ env })
