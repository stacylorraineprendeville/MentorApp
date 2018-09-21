export const GET_SESSION = 'user/LOAD'
export const GET_SESSION_SUCCESS = 'user/LOAD_SUCCESS'
export const GET_SESSION_FAIL = 'user/LOAD_FAIL'

export default function reducer(state = { session: {} }, action) {
  switch (action.type) {
    case GET_SESSION:
      return { ...state, loading: true }
    case GET_SESSION_SUCCESS:
      return { ...state, loading: false, session: action.payload.data }
    case GET_SESSION_FAIL:
      return {
        ...state,
        loading: false,
        session: {},
        error: 'Error while fetching session'
      }
    default:
      return state
  }
}

export function getSession(username, password) {
  return {
    type: GET_SESSION,
    payload: {
      request: {
        url: `/oauth/token?username=${username}&password=${password}&grant_type=password`,
        method: 'POST',
        headers: {
          Authorization: 'Basic YmFyQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ='
        }
      }
    }
  }
}
