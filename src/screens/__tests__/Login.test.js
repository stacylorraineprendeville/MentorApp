import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, TextInput, Button, Picker } from 'react-native'
import { Login } from '../Login'

const createTestProps = props => ({
  setEnv: jest.fn(),
  login: jest.fn(),
  env: 'development',
  navigation: {
    navigate: arg => arg
  },
  ...props
})

describe('Login', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<Login {...props} />)
  })
  describe('rendering', () => {
    it('renders <ScrollView />', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders minimal login UI: <TextInput /> and <Button />', () => {
      expect(wrapper.find(TextInput)).toHaveLength(2)
      expect(wrapper.find(Button)).toExist()
    })

    it('has proper initial state', () => {
      expect(wrapper).toHaveState({
        username: '',
        password: ''
      })
    })

    it('has proper default selectedValue for Picker', () => {
      expect(wrapper.find(Picker)).toHaveProp('selectedValue', 'development')
    })
  })
  describe('functionality', () => {
    it('can change env', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onEnvChange')
      wrapper.instance().onEnvChange('production')
      expect(spy).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.setEnv).toHaveBeenCalledTimes(1)
    })

    it('typing in credentials changes state', () => {
      wrapper
        .find('#username')
        .props()
        .onChangeText('Joe')

      wrapper
        .find('#password')
        .props()
        .onChangeText('Foo')

      expect(wrapper.state().username).toBe('Joe')
      expect(wrapper.state().password).toBe('Foo')
    })

    it('clicking login calls login action', () => {
      wrapper
        .find('#login-button')
        .props()
        .onPress()
      expect(wrapper.instance().props.login).toHaveBeenCalledTimes(1)
    })
  })
})
