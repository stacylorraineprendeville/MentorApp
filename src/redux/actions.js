// Login

export const SET_TOKEN_SUCCESS = 'SET_TOKEN_SUCCESS'
export const SET_TOKEN_ERROR = 'SET_TOKEN_ERROR'

const setTokenSuccess = token => ({
  type: SET_TOKEN_SUCCESS,
  token
})

const setTokenError = () => ({
  type: SET_TOKEN_ERROR
})

export const login = (username, password, env) => dispatch => {
  fetch(
    `${env}/oauth/token?username=${username}&password=${password}&grant_type=password`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic YmFyQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ='
      }
    }
  )
    .then(data => {
      if (data.status !== 200) {
        throw new Error()
      } else return data.json()
    })
    .then(token => dispatch(setTokenSuccess(token.access_token)))
    .catch(() => dispatch(setTokenError()))
}

// Environment

export const SET_ENV = 'SET_ENV'

export const setEnv = env => ({
  type: SET_ENV,
  env
})

// Surveys

export const LOAD_SURVEYS = 'LOAD_SURVEYS'

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

// Families

export const LOAD_FAMILIES = 'LOAD_FAMILIES'

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

// Drafts

export const CREATE_DRAFT = 'CREATE_DRAFT'
export const ADD_PERSONAL_SURVEY_DATA = 'ADD_PERSONAL_SURVEY_DATA'
export const ADD_ECONOMIC_SURVEY_DATA = 'ADD_ECONOMIC_SURVEY_DATA'
export const ADD_INDICATOR_SURVEY_DATA = 'ADD_INDICATOR_SURVEY_DATA'

export const createDraft = payload => ({
  type: CREATE_DRAFT,
  payload
})

export const addPersonalSurveyData = (id, payload) => ({
  type: ADD_PERSONAL_SURVEY_DATA,
  id,
  payload
})

export const addEconomicSurveyData = (id, payload) => ({
  type: ADD_ECONOMIC_SURVEY_DATA,
  id,
  payload
})

export const addIndicatorSurveyData = (id, payload) => ({
  type: ADD_INDICATOR_SURVEY_DATA,
  id,
  payload
})
