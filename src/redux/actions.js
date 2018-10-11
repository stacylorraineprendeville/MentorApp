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

export const login = (username, password, env) => dispatch =>
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
      commit: { type: LOAD_SURVEYS }
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
      commit: { type: LOAD_FAMILIES }
    }
  }
})

// Drafts

export const CREATE_DRAFT = 'CREATE_DRAFT'
export const DELETE_DRAFT = 'DELETE_DRAFT'
export const ADD_SURVEY_DATA = 'ADD_SURVEY_DATA'
export const SUBMIT_DRAFT = 'SUBMIT_DRAFT'
export const SUBMIT_DRAFT_COMMIT = 'SUBMIT_DRAFT_COMMIT'
export const SUBMIT_DRAFT_ROLLBACK = 'SUBMIT_DRAFT_ROLLBACK'

export const createDraft = payload => ({
  type: CREATE_DRAFT,
  payload
})

export const deleteDraft = id => ({
  type: DELETE_DRAFT,
  id
})

export const addSurveyData = (id, category, payload) => ({
  type: ADD_SURVEY_DATA,
  category,
  id,
  payload
})

export const submitDraft = (env, token, id, payload) => ({
  type: SUBMIT_DRAFT,
  env,
  token,
  payload,
  id,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/snapshots`,
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: {
        type: SUBMIT_DRAFT_COMMIT,
        meta: {
          id
        }
      },
      rollback: {
        type: SUBMIT_DRAFT_ROLLBACK,
        meta: {
          id
        }
      }
    }
  }
})

// Snapshots
export const LOAD_SNAPSHOTS = 'LOAD_SNAPSHOTS'

export const loadSnapshots = (env, token) => ({
  type: LOAD_SNAPSHOTS,
  env,
  token,
  meta: {
    offline: {
      effect: {
        url: `${env}/api/v1/snapshots`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      },
      commit: { type: LOAD_SNAPSHOTS, meta: { env, token } }
    }
  }
})
