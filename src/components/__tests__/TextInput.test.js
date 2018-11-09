import React from 'react'
import { shallow } from 'enzyme'
import { View } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'

import TextInput from '../TextInput'

const createTestProps = props => ({
  ...props,
  onTextChange: jest.fn(),
  label: 'Some label',
  errormsg: 'Some error msg'
})

describe('TextInput Component', () => {
  let wrapper
  let props
  beforeEach(() => {
    props = createTestProps()
    wrapper = shallow(<TextInput {...props} />)
  })
  describe('rendering', () => {
    it('renders FormLabel', () => {
      expect(wrapper.find(FormLabel)).toHaveLength(1)
    })
    it('renders FormInput', () => {
      expect(wrapper.find(FormInput)).toHaveLength(1)
    })
    it('renders FormValidationMessage when there is an error', () => {
      wrapper.setState({ status: 'error' })
      expect(wrapper.find(FormValidationMessage)).toHaveLength(1)
    })
  })
  describe('functionality', () => {
    it('has the correct label', () => {
      expect(
        wrapper
          .find(FormLabel)
          .render()
          .text()
      ).toBe('Some label')
    })
    it('has the correct error msg', () => {
      wrapper.setState({ status: 'error' })
      expect(
        wrapper
          .find(FormValidationMessage)
          .render()
          .text()
      ).toBe('Some error msg')
    })

    it('calls onChangeText when text is changed', () => {
      const spy = jest.spyOn(wrapper.instance(), 'onChangeText')
      wrapper
        .find(FormInput)
        .props()
        .onChangeText('Changed text')

      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('has correct initial state', () => {
      expect(wrapper.instance().state).toEqual({ text: '', status: 'blur' })
    })

    it('changes text state when onChangeText is called', () => {
      wrapper
        .find(FormInput)
        .props()
        .onChangeText('Changed text')

      expect(wrapper.instance().state.text).toEqual('Changed text')
    })

    it('changes state to active when onFocus is called', () => {
      wrapper
        .find(FormInput)
        .props()
        .onFocus()

      expect(wrapper.instance().state.status).toEqual('active')
    })

    it('changes state to blur when onBlur is called', () => {
      wrapper.setState({ status: 'active' })
      wrapper
        .find(FormInput)
        .props()
        .onBlur()
      expect(wrapper.instance().state.status).toEqual('blur')
    })
  })
})
