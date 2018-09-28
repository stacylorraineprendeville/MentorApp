import { combineReducers } from 'redux'

//Surveys

export const LOAD_SURVEYS = 'LOAD_SURVEYS'
export const LOAD_SURVEYS_COMMIT = 'LOAD_SURVEYS_COMMIT'

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

//Families

export const LOAD_FAMILIES = 'LOAD_FAMILIES'
export const LOAD_FAMILIES_COMMIT = 'LOAD_FAMILIES_COMMIT'

export const families = (state = [], action) => {
  switch (action.type) {
    case LOAD_FAMILIES:
      return action.payload
        ? state.slice(state.length).concat(action.payload)
        : state
    default:
      return state
  }
}

export const loadFamilies = (env, token) => ({
  type: LOAD_FAMILIES,
  env,
  token,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/families`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: { type: LOAD_FAMILIES, meta: { env, token } }
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

export const rootReducer = combineReducers({ env, surveys, families })
