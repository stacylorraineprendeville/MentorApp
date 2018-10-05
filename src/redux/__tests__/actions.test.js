import configureStore from 'redux-mock-store' //ES6 modules
import { setEnv, SET_ENV } from '../actions'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('Redux synchronous actions', () => {
  // Initialize mockstore with empty state
  const store = mockStore('development')
  beforeEach(() => {
    store.clearActions()
  })
  it('should set env', () => {
    // Dispatch the action
    store.dispatch(setEnv('production'))

    // Test if your store dispatched the expected actions
    expect(store.getActions()).toEqual([{ type: SET_ENV, env: 'production' }])

    expect(store.getActions()).toMatchSnapshot()
  })
})
