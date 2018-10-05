import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, TextInput, Button, Picker } from 'react-native'
import { Login } from '../Login'

const createTestProps = props => ({
  setEnv: jest.fn(),
  login: jest.fn(),
  env: 'development',
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
    it('user can change env', () => {
      wrapper.instance().onEnvChange('production')
      expect(wrapper.instance().props.setEnv).toHaveBeenCalledTimes(1)
    })
  })
})
