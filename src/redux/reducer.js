import { combineReducers } from 'redux'
import {
  SET_TOKEN_SUCCESS,
  SET_TOKEN_ERROR,
  SET_ENV,
  LOAD_SURVEYS,
  LOAD_FAMILIES,
  CREATE_DRAFT,
  ADD_SURVEY_DATA,
  DELETE_DRAFT,
  LOAD_SNAPSHOTS,
  SUBMIT_DRAFT,
  SUBMIT_DRAFT_COMMIT,
  SUBMIT_DRAFT_ROLLBACK
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
      return [...state, { ...action.payload, status: 'In progress' }]
    case ADD_SURVEY_DATA:
      return state.map(
        draft =>
          draft.draft_id === action.id
            ? {
                ...draft,
                [action.category]: {
                  ...draft[action.category],
                  ...action.payload
                }
              }
            : draft
      )
    case SUBMIT_DRAFT:
      return state.map(
        draft =>
          draft.draft_id === action.id
            ? {
                ...draft,
                status: 'Pending'
              }
            : draft
      )
    case SUBMIT_DRAFT_COMMIT:
      return state.map(
        draft =>
          draft.draft_id === action.meta.id
            ? {
                ...draft,
                status: 'Success'
              }
            : draft
      )
    case SUBMIT_DRAFT_ROLLBACK:
      return state.map(
        draft =>
          draft.draft_id === action.meta.id
            ? {
                ...draft,
                status: 'Error'
              }
            : draft
      )
    case DELETE_DRAFT:
      return state.filter(draft => draft.draft_id !== action.id)
    default:
      return state
  }
}

// Snapshots

export const snapshots = (state = [], action) => {
  switch (action.type) {
    case LOAD_SNAPSHOTS:
      return action.payload ? action.payload : state
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  env,
  token,
  surveys,
  families,
  drafts,
  snapshots
})
