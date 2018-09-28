import { combineReducers } from 'redux'

//surveys

export const LOAD_SURVEYS = 'LOAD_SURVEYS'
export const LOAD_SURVEYS_COMMIT = 'LOAD_SURVEYS_COMMIT'
export const LOAD_SURVEYS_ROLLBACK = 'LOAD_SURVEYS_ROLLBACK'

export const surveys = (state = [], action) => {
  switch (action.type) {
    case LOAD_SURVEYS:
      return action.payload
        ? state.slice(state.length).concat(action.payload)
        : state
    default:
      return state
  }
}

export const loadSurveys = (env, token) => ({
  type: LOAD_SURVEYS,
  env,
  token,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/surveys`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: { type: LOAD_SURVEYS, meta: { env, token } }
    }
  }
})

//Environment

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

export const rootReducer = combineReducers({ env, surveys })
