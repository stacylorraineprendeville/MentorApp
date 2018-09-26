export const GET_SESSION = "GET_SESSION";
export const GET_SESSION_SUCCESS = "GET_SESSION_SUCCESS";
export const GET_SESSION_FAIL = "GET_SESSION_FAIL";
export const SET_ENV = "SET_ENV";

export const login = (state = { session: {} }, action) => {
  switch (action.type) {
    case GET_SESSION:
      return { ...state, loading: true };
    case GET_SESSION_SUCCESS:
      return { ...state, loading: false, session: action.payload.data };
    case GET_SESSION_FAIL:
      return {
        ...state,
        loading: false,
        session: {},
        error: "Error while fetching session"
      };
    default:
      return state;
  }
};

export const env = (state = "development", action) => {
  switch (action.type) {
    case SET_ENV:
      return action.env;
    default:
      return state;
  }
};

export const setEnv = env => ({
  type: SET_ENV,
  env
});

export function getSession(username, password, env) {
  return {
    type: GET_SESSION,
    payload: {
      client: env,
      request: {
        url: `/oauth/token?username=${username}&password=${password}&grant_type=password`,
        method: "POST",
        headers: {
          Authorization: "Basic YmFyQ2xpZW50SWRQYXNzd29yZDpzZWNyZXQ="
        }
      }
    }
  };
}
