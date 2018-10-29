import React from 'react'
import { shallow } from 'enzyme'
import { ActivityIndicator } from 'react-native'
import { NavWrapper } from '../NavWrapper'
import { LoginStack, AppStack } from '../Navigation'

const createTestProps = props => ({
  user: { token: '' },
  ...props
})

describe('Navigation Wrapper', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<NavWrapper {...props} />)
  })

  it('checks for store hydration on mount', () => {
    expect(wrapper).toHaveState({
      rehydrated: false
    })
    const spy = jest.spyOn(wrapper.instance(), 'checkHydration')
    wrapper.instance().componentDidMount()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('renders ActivityIndicator if store is not hydrated', () => {
    expect(wrapper.find(ActivityIndicator)).toHaveLength(1)
  })

  it('renders <LoginStack /> stack if no token is available', () => {
    wrapper.setState({ rehydrated: true })
    expect(wrapper.find(LoginStack)).toHaveLength(1)
  })

  it('renders <AppStack /> stack if there is a token in the store', () => {
    const props = createTestProps({ user: { token: '34423' }, ...props })
    const wrapper = shallow(<NavWrapper {...props} />)
    wrapper.setState({ rehydrated: true })
    expect(wrapper.find(AppStack)).toHaveLength(1)
  })
})
