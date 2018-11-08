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
  onChangeText: jest.fn(),
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
    it('renders FormValidationMessage', () => {
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
      expect(
        wrapper
          .find(FormValidationMessage)
          .render()
          .text()
      ).toBe('Some error msg')
    })

    it('calls onChangeText when text is changed', () => {
      console.log(wrapper.find(FormInput).props())
      wrapper
        .find(FormInput)
        .props()
        .onChangeText('Changed text')

      expect(wrapper.instance().props.onChangeText).toHaveBeenCalledTimes(1)
    })
  })
})
