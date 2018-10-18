import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, TextInput, Text, TouchableOpacity } from 'react-native'
import { Login } from '../Login'

const createTestProps = props => ({
  setEnv: jest.fn(),
  login: jest.fn(() => new Promise(resolve => resolve(true))),
  env: 'production',
  token: { status: '' },
  navigation: {
    navigate: arg => arg
  },
  ...props
})

describe('Login View', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<Login {...props} />)
  })

  describe('rendering', () => {
    it('renders <ScrollView />', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })

    it('renders minimal login UI: <TextInput /> and <TouchableOpacity />', () => {
      expect(wrapper.find(TextInput)).toHaveLength(2)
      expect(wrapper.find(Text)).toHaveLength(5)
      expect(wrapper.find(TouchableOpacity)).toExist()
    })

    it('has proper initial state', () => {
      expect(wrapper).toHaveState({
        username: '',
        password: '',
        error: null
      })
    })
    it('renders error message when token status is error', async () => {
      props = { ...props, token: { status: 'error' } }
      wrapper = shallow(<Login {...props} />)
      await wrapper.instance().onLogin()
      expect(wrapper.find(Text)).toHaveLength(6)
      expect(wrapper.find('#error-message')).toExist()
    })
  })
  describe('functionality', () => {
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

    it('sets the env to demo when username is demo', () => {
      wrapper
        .find('#username')
        .props()
        .onChangeText('demo')
      expect(wrapper.instance().props.setEnv).toHaveBeenCalledTimes(1)
      expect(wrapper.instance().props.setEnv).toHaveBeenCalledWith('demo')
    })

    it('clicking login calls login action', () => {
      wrapper
        .find('#login-button')
        .props()
        .onPress()
      expect(wrapper.instance().props.login).toHaveBeenCalledTimes(1)
    })

    it('changes error state to true when token status is error', async () => {
      props = { ...props, token: { status: 'error' } }
      wrapper = shallow(<Login {...props} />)
      await wrapper.instance().onLogin()
      expect(wrapper.instance().state.error).toBe(true)
    })

    it('changes error state to false when token status is success', async () => {
      props = { ...props, token: { status: 'success' } }
      wrapper = shallow(<Login {...props} />)
      await wrapper.instance().onLogin()
      expect(wrapper.instance().state.error).toBe(false)
    })
  })
})
