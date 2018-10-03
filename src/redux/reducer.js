import { combineReducers } from 'redux'
import {
  SET_TOKEN_SUCCESS,
  SET_TOKEN_ERROR,
  SET_ENV,
  LOAD_SURVEYS,
  LOAD_FAMILIES,
  CREATE_DRAFT,
  ADD_PERSONAL_SURVEY_DATA,
  ADD_ECONOMIC_SURVEY_DATA,
  ADD_INDICATOR_SURVEY_DATA
} from './actions'

//Login

export const token = (state = { token: '', status: '' }, action) => {
  switch (action.type) {
    case SET_TOKEN_SUCCESS:
      return { token: action.token, status: 'success' }
    case SET_TOKEN_ERROR:
      return { token: '', status: 'error' }
    default:
      return state
  }
}

//Environment

export const env = (state = 'development', action) => {
  switch (action.type) {
    case SET_ENV:
      return action.env
    default:
      return state
  }
}

//Surveys

export const surveys = (state = [], action) => {
  switch (action.type) {
    case LOAD_SURVEYS:
      return action.payload ? action.payload : state
    default:
      return state
  }
}

//Families

export const families = (state = [], action) => {
  switch (action.type) {
    case LOAD_FAMILIES:
      return action.payload ? action.payload : state
    default:
      return state
  }
}

//Drafts

export const drafts = (state = [], action) => {
  switch (action.type) {
    case CREATE_DRAFT:
      return [...state, action.payload]
    case ADD_PERSONAL_SURVEY_DATA:
      return state.map(
        draft =>
          draft.draft_id === action.id
            ? {
                ...draft,
                personal_survey_data: {
                  ...draft.personal_survey_data,
                  ...action.payload
                }
              }
            : draft
      )
    case ADD_ECONOMIC_SURVEY_DATA:
      return state.map(
        draft =>
          draft.draft_id === action.id
            ? {
                ...draft,
                economic_survey_data: {
                  ...draft.economic_survey_data,
                  ...action.payload
                }
              }
            : draft
      )
    case ADD_INDICATOR_SURVEY_DATA:
      return state.map(
        draft =>
          draft.draft_id === action.id
            ? {
                ...draft,
                indicator_survey_data: {
                  ...draft.indicator_survey_data,
                  ...action.payload
                }
              }
            : draft
      )
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  env,
  surveys,
  families,
  token,
  drafts
})
