import React from 'react'
import { shallow } from 'enzyme'
import { ScrollView, Text } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { AddAchievement } from '../lifemap/AddAchievement'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import Counter from '../../components/Counter'

const createTestProps = props => ({
  navigation: {
    navigate: jest.fn(),
    getParam: jest.fn(() => 'income')
  },
  ...props
})

describe('AddAchievement View', () => {
  let wrapper
  beforeEach(() => {
    const props = createTestProps()
    wrapper = shallow(<AddAchievement {...props} />)
  })
  describe('rendering', () => {
    it('renders ScrollView', () => {
      expect(wrapper.find(ScrollView)).toHaveLength(1)
    })
    it('renders Icon', () => {
      expect(wrapper.find(Icon)).toHaveLength(1)
    })
    it('renders Text', () => {
      expect(wrapper.find(Text)).toHaveLength(1)
    })
    it('renders Button', () => {
      expect(wrapper.find(Button)).toHaveLength(1)
    })
  })

  describe('functionality', () => {
    it('has correct initial state', () => {
      expect(wrapper.instance().state).toEqual({
        reason: '',
        roadmap: ''
      })
    })

    it('records reason to state', () => {
      wrapper
        .find(TextInput)
        .first()
        .props()
        .onChangeText('Some reason')
      expect(wrapper.instance().state.reason).toEqual('Some reason')
    })
    it('records roadmap to state', () => {
      wrapper
        .find(TextInput)
        .last()
        .props()
        .onChangeText('Some roadmap')
      expect(wrapper.instance().state.roadmap).toEqual('Some roadmap')
    })
  })
})
